using Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.EfCore;

public class AppDbContext : IdentityDbContext<User, Role, Guid>
{
    public DbSet<Proxy> Proxies { get; set; } = null!;
    
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<User>()
            .HasMany(u => u.Roles)
            .WithMany(r => r.Users);
    }
}