using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;
public class DataContext : DbContext
{
    public DbSet<Hero> Heros { get; set; }
    public DbSet<Enemy> Enemies { get; set; }
    public DbSet<GameHistory> GameHistory { get; set; }
    public DataContext(DbContextOptions options) : base(options)
    {
    }
}
