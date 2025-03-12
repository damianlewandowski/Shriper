namespace ShriperApi.Dtos;

public class CreateRecipeDto
{
  public required string Title { get; set; }
  public required string Ingredients { get; set; }
  public required string Instructions { get; set; }
}