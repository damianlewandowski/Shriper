using System.ComponentModel.DataAnnotations;

namespace ShriperApi.Models;

public class Ingredient : BaseModel
{
  public int Id { get; set; }

  [Required(ErrorMessage = "Name is required.")]
  public string Name { get; set; } = "";

  [Required(ErrorMessage = "Ingredient amount is required.")]
  public string Amount { get; set; } = "";
}