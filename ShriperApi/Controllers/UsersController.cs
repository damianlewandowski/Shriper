using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShriperApi.Data;
using ShriperApi.Dtos;
using ShriperApi.Models;

namespace ShriperApi.controllers;

[Route("api/[controller]")]
[ApiController]
public class UsersController(PostgresDbContext context) : ControllerBase
{
  private readonly PostgresDbContext _context = context;

  [HttpGet]
  public ActionResult<IEnumerable<User>> GetUsers()
  {
    return _context.Users.ToList();
  }

  [HttpGet("{id}")]
  public ActionResult<User> GetUser(int id)
  {
    var recipe = _context.Users.Find(id);

    if (recipe == null)
    {
      return NotFound();
    }

    return recipe;
  }
}
