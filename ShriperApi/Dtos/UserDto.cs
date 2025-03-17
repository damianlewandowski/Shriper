using System.ComponentModel.DataAnnotations;
using ShriperApi.Models;

public class UserDto : BaseModel
{
  [Required]
  public int Id { get; set; }

  [Required]
  public string Email { get; set; } = "";

  public string? ProfilePictureUrl { get; set; } = "";
}