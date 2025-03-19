using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShriperApi.Data;
using ShriperApi.Dtos;
using ShriperApi.Models;

namespace ShriperApi.controllers;

public class CreateIngredientDtoValidationError
{
  public List<string> Name { get; set; } = [];
  public List<string> Amount { get; set; } = [];
}

public class CreateRecipeValidationErrorResponse
{
  public List<string> Title { get; set; } = [];
  public List<CreateIngredientDtoValidationError> Ingredients { get; set; } = [];
  public List<string> Instructions { get; set; } = [];
  public List<string> VitalInstructions { get; set; } = [];
}

[Route("api/[controller]")]
[ApiController]
public class RecipesController(PostgresDbContext context) : ControllerBase
{
  private readonly PostgresDbContext _context = context;

  [HttpGet]
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
  [Authorize]
  [ProducesResponseType(typeof(CreateRecipeValidationErrorResponse), StatusCodes.Status400BadRequest)]
  public ActionResult<Recipe> CreateRecipe([FromBody] CreateRecipeDto createRecipeDto)
  {
    if (createRecipeDto == null)
    {
      return BadRequest("Recipe object is null");
    }

    var recipe = new Recipe
    {
      Title = createRecipeDto.Title,
      Ingredients = createRecipeDto.Ingredients.Select(ingredientDto => new Ingredient
      {
        Name = ingredientDto.Name,
        Amount = ingredientDto.Amount
      }
      ).ToList(),
      Instructions = createRecipeDto.Instructions
    };

    _context.Recipes.Add(recipe);
    _context.SaveChanges();

    return CreatedAtAction(nameof(GetRecipe), new { id = recipe.Id }, recipe);
  }
}
