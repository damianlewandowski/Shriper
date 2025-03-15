using System.ComponentModel.DataAnnotations;

namespace ShriperApi.Models;

public class Ingredient : BaseModel
{
  [Required]
  public int Id { get; set; }

  [Required]
  public string Name { get; set; } = "";

  [Required]
  public string Amount { get; set; } = "";
}