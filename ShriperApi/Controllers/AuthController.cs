using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Mvc;

namespace ShriperApi.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
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

    return Redirect("http://localhost:3001"); // Or RedirectToAction("SecureEndpoint", "YourController");
  }

  [HttpGet("logout")]
  public async Task<IActionResult> Logout()
  {
    await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
    return Ok("Logged out"); // Or RedirectToAction("Index", "Home");
  }
}