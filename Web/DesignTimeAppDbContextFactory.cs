using Infrastructure.EfCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Web;

public class DesignTimeAppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
{
    public AppDbContext CreateDbContext(string[] args)
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseNpgsql("Server=localhost;Port=5432;Database=dewudb;UserId=postgres;Password=nf1020151450934;Pooling=true;Timeout=300;CommandTimeout=300;")
            .Options;

        return new AppDbContext(options);
    }
}