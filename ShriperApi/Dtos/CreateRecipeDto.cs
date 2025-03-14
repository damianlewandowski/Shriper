using System.ComponentModel.DataAnnotations;
using ShriperApi.Models;

namespace ShriperApi.Dtos;

public class CreateRecipeDto
{
  [Required(ErrorMessage = "Title is required.")]
  [StringLength(ModelConstants.RecipeTitleMaxLength, ErrorMessage = "Title cannot exceed 200 characters.")]
  public required string Title { get; set; }

  [MinLength(ModelConstants.RecipeMinAmountOfIngredients, ErrorMessage = "Ingredients list must countain at least 1 ingredient.")]
  public required List<Ingredient> Ingredients { get; set; }


  [Required]
  [StringLength(ModelConstants.RecipeInstructionsMaxLength, ErrorMessage = "Instructions cannot exceed 200 characters.")]
  public required string Instructions { get; set; }

  [StringLength(ModelConstants.RecipeVitalInstructionsMaxLength, ErrorMessage = "VitalInstructions cannot exceed 200 characters.")]
  public string VitalInstructions { get; set; } = "";

}