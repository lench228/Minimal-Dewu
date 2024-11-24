using Domain.Abstractions;
using Domain.Entities;
using Infrastructure.EfCore;
using Microsoft.EntityFrameworkCore;
using Services.Abstractions.Internal;

namespace Services.Services.Internal;

internal class DbProxyUtils(AppDbContext db) : IProxyUtils
{
    private async Task<IList<Proxy>> GetAvailableDbProxiesAsync()
    {
        return await db.Proxies
            .AsNoTracking()
            .Where(p => p.IsAvailable)
            .ToListAsync();
    }

    private async Task DisableDbProxy(Proxy proxy)
    {
        db.Attach(proxy);
        proxy.IsAvailable = false;
        await db.SaveChangesAsync();
    }
    
    private async Task EnableDbProxy(Proxy proxy)
    {
        db.Attach(proxy);
        proxy.IsAvailable = false;
        await db.SaveChangesAsync();
    }

    public async Task<IList<IProxy>> GetAvailableProxiesAsync()
    {
        var dbProxies = await GetAvailableDbProxiesAsync();
        return (IList<IProxy>)dbProxies;
    }

    public Task DisableProxy(IProxy proxy)
    {
        var dbProxy = (Proxy)proxy;
        return DisableDbProxy(dbProxy);
    }

    public Task EnableProxy(IProxy proxy)
    {
        var dbProxy = (Proxy)proxy;
        return EnableDbProxy(dbProxy);
    }
}



