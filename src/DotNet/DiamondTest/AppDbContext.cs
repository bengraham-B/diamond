using Microsoft.EntityFrameworkCore;
using Class;

namespace DiamondTest;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options){}
    public DbSet<Class.DiamondTransaction> DiamondTransactions { get; set; }
}