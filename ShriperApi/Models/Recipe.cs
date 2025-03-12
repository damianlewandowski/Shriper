namespace ShriperApi.Models;

public class Recipe
{
  public int Id { get; set; }
  public required string Title { get; set; }
  public required string Ingredients { get; set; } //Consider a List<string> but that requires advanced EF Core configuration.
  public required string Instructions { get; set; }
}