using System.ComponentModel.DataAnnotations;
using ShriperApi.Models;

namespace ShriperApi.Dtos;

public class CreateRecipeDto
{
  [Required]
  [StringLength(ModelConstants.RecipeTitleMaxLength, ErrorMessage = "Title cannot exceed 200 characters.")]
  public string Title { get; set; } = "";

  [Required]
  [MinLength(ModelConstants.RecipeMinAmountOfIngredients, ErrorMessage = "Ingredients list must countain at least 1 ingredient.")]
  public List<Ingredient> Ingredients { get; set; } = [];


  [Required]
  [StringLength(ModelConstants.RecipeInstructionsMaxLength, ErrorMessage = "Instructions cannot exceed 200 characters.")]
  public string Instructions { get; set; } = "";

  [StringLength(ModelConstants.RecipeVitalInstructionsMaxLength, ErrorMessage = "VitalInstructions cannot exceed 200 characters.")]
  public string VitalInstructions { get; set; } = "";
}