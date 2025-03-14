using Microsoft.EntityFrameworkCore;
using ShriperApi.Models;

namespace ShriperApi.Data;

public class PostgresDbContext(DbContextOptions<PostgresDbContext> options) : DbContext(options)
{
  public DbSet<Recipe> Recipes { get; set; }
  public DbSet<Ingredient> Ingredients { get; set; }
  public DbSet<User> Users { get; set; }

  public override int SaveChanges()
  {
    SetTimestamps();
    return base.SaveChanges();
  }

  public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
  {
    SetTimestamps();
    return await base.SaveChangesAsync(cancellationToken);
  }

  private void SetTimestamps()
  {
    var entries = ChangeTracker
      .Entries()
      .Where(e => e.Entity is BaseModel && (e.State == EntityState.Added || e.State == EntityState.Modified));

    foreach (var entityEntry in entries)
    {
      if (entityEntry.State == EntityState.Added)
      {
        ((BaseModel)entityEntry.Entity).CreatedAt = DateTime.UtcNow;
      }
      else if (entityEntry.State == EntityState.Modified)
      {
        ((BaseModel)entityEntry.Entity).UpdatedAt = DateTime.UtcNow;
      }
    }
  }
}