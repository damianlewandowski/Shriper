using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShriperApi.Data;
using ShriperApi.Dtos;
using ShriperApi.Models;

namespace ShriperApi.controllers;

[Route("api/[controller]")]
[ApiController]
public class RecipesController(PostgresDbContext context) : ControllerBase
{
  private readonly PostgresDbContext _context = context;

  [HttpGet]
  [Authorize]
  public ActionResult<IEnumerable<Recipe>> GetRecipes()
  {
    return _context.Recipes.ToList();
  }

  [HttpGet("{id}")]
  public ActionResult<Recipe> GetRecipe(int id)
  {
    var recipe = _context.Recipes.Find(id);

    if (recipe == null)
    {
      return NotFound();
    }

    return recipe;
  }

  [HttpPost]
  public ActionResult<Recipe> CreateRecipe(CreateRecipeDto createRecipeDto)
  {
    if (createRecipeDto == null)
    {
      return BadRequest("Recipe object is null");
    }

    var recipe = new Recipe
    {
      Title = createRecipeDto.Title,
      Ingredients = createRecipeDto.Ingredients,
      Instructions = createRecipeDto.Instructions
    };

    _context.Recipes.Add(recipe);
    _context.SaveChanges();

    return CreatedAtAction(nameof(GetRecipe), new { id = recipe.Id }, recipe);
  }
}
