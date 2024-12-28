using Domain.Abstractions;
using Domain.Entities;
using Infrastructure.EfCore;
using Microsoft.EntityFrameworkCore;
using Services.Abstractions.Internal;
using Services.Extensions.Internal;

namespace Services.Services.Internal;

internal class DbProxyUtils(AppDbContext db) : IProxyUtils
{
    private async Task<IList<Proxy>> GetAvailableDbProxiesAsync()
    {
        return await db.Proxies
            .AsNoTracking()
            .Where(p => !p.CaptchaBlocked)
            .ToListAsync();
    }

    private async Task DisableDbProxy(Proxy proxy)
    {
        db.Attach(proxy);
        proxy.CaptchaBlocked = true;
        await db.SaveChangesAsync();
    }
    
    private async Task EnableDbProxy(Proxy proxy)
    {
        db.Attach(proxy);
        proxy.CaptchaBlocked = false;
        await db.SaveChangesAsync();
    }

    public async Task<IProxy> GetProxyAsync()
    {
        var proxy = await db.Proxies.FirstOrDefaultAsync();
        if (proxy is null)
            throw new ProxyException("No proxy available");
        return proxy;
    }

    public async Task<IList<IProxy>> GetEnabledProxiesAsync()
    {
        var dbProxies = await GetAvailableDbProxiesAsync();
        return dbProxies.Cast<IProxy>().ToList();
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



