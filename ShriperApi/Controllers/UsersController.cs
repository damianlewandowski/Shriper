using Microsoft.AspNetCore.Mvc;
using ShriperApi.Data;

namespace ShriperApi.controllers;

[Route("api/[controller]")]
[ApiController]
public class UsersController(PostgresDbContext context) : ControllerBase
{
  private readonly PostgresDbContext _context = context;

  [HttpGet]
  public ActionResult<IEnumerable<UserDto>> GetUsers()
  {
    return _context.Users.Select(user => new UserDto
    {
      Id = user.Id,
      Email = user.Email,
      ProfilePictureUrl = user.ProfilePictureUrl,
      CreatedAt = user.CreatedAt,
      UpdatedAt = user.UpdatedAt,
    }).ToList();
  }

  [HttpGet("{id}")]
  public ActionResult<UserDto> GetUser(int id)
  {
    var user = _context.Users.Find(id);

    if (user == null)
    {
      return NotFound();
    }

    var userDto = new UserDto
    {
      Id = user.Id,
      Email = user.Email,
      ProfilePictureUrl = user.ProfilePictureUrl,
      CreatedAt = user.CreatedAt,
      UpdatedAt = user.UpdatedAt,
    };

    return userDto;
  }
}
