using System.Diagnostics;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShriperApi.Data;
using ShriperApi.Models;

namespace ShriperApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(PostgresDbContext context) : ControllerBase
{
  private readonly PostgresDbContext _context = context;

  [HttpGet("google-login")]
  public IActionResult GoogleLogin()
  {
    var authenticationProperties = new AuthenticationProperties
    {
      RedirectUri = Url.Action("GoogleCallback", "Auth", null, Request.Scheme)
    };

    return Challenge(authenticationProperties, GoogleDefaults.AuthenticationScheme);
  }

  [HttpGet("google-callback")]
  public async Task<IActionResult> GoogleCallback()
  {
    var authenticationResult = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);

    if (!authenticationResult.Succeeded)
    {
      return BadRequest("Google authentication failed");
    }

    var claimsPrincipal = authenticationResult.Principal;

    var googleId = claimsPrincipal.FindFirstValue(ClaimTypes.NameIdentifier);
    var email = claimsPrincipal.FindFirstValue(ClaimTypes.Email);
    var profilePictureUrl = claimsPrincipal.FindFirstValue("urn:google:picture");

    if (string.IsNullOrEmpty(googleId) || string.IsNullOrEmpty(email))
    {
      return BadRequest("Couldn't retrieve essential user information.");
    }

    var existingUser = await _context.Users.SingleOrDefaultAsync(user => user.GoogleId == googleId);
    if (existingUser == null)
    {
      var newUser = new User
      {
        GoogleId = googleId,
        Email = email,
        ProfilePictureUrl = profilePictureUrl
      };

      _context.Users.Add(newUser);
      await _context.SaveChangesAsync();
    }

    return Redirect("http://localhost:3000");
  }

  [Authorize]
  [HttpGet("me")]
  public async Task<ActionResult<UserDto>> GetMe()
  {
    var googleIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);

    var currentUser = await _context.Users.SingleOrDefaultAsync(user => user.GoogleId == googleIdClaim);

    if (currentUser == null)
    {
      return NotFound("User not found.");
    }

    var userDto = new UserDto
    {
      Id = currentUser.Id,
      Email = currentUser.Email,
      ProfilePictureUrl = currentUser.ProfilePictureUrl,
      CreatedAt = currentUser.CreatedAt,
      UpdatedAt = currentUser.UpdatedAt,
    };

    return userDto;
  }

  [HttpPost("logout")]
  public async Task<IActionResult> Logout()
  {
    await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
    return Ok("Logged out");
  }
}