using System.ComponentModel.DataAnnotations;
using ShriperApi.Models;

namespace ShriperApi.Dtos;

public class CreateIngredientDto
{
  [Required]
  public string Name { get; set; } = "";

  [Required]
  public string Amount { get; set; } = "";
}