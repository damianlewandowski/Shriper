using Microsoft.EntityFrameworkCore;
using ShriperApi.Models;

namespace ShriperApi.Data;

public class PostgresDbContext(DbContextOptions<PostgresDbContext> options) : DbContext(options)
{
  public DbSet<Recipe> Recipes { get; set; }
}