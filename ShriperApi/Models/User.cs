using System.ComponentModel.DataAnnotations;

namespace ShriperApi.Models;

public class User : BaseModel
{
  public int Id { get; set; }

  [Required]
  public string GoogleId { get; set; } = "";

  [Required]
  public string Email { get; set; } = "";

  public string? ProfilePictureUrl { get; set; } = "";
}