using Domain.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.EfCore;

public class AppDbContext(DbContextOptions<AppDbContext> options) : IdentityDbContext<User, Role, Guid>(options)
{
    public DbSet<Proxy> Proxies { get; set; }
    public DbSet<GlobalVars> GlobalVars { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<User>()
            .HasMany(u => u.Roles)
            .WithMany(r => r.Users);

        builder.Entity<GlobalVars>()
            .Property(g => g.Id)
            .HasDefaultValue(1);
        
        builder.Entity<GlobalVars>()
            .ToTable(g => g.HasCheckConstraint("CK_GlobalVars_Id", "\"Id\" = 1"));
    }
}