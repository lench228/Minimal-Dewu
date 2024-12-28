using Domain.Abstractions;

namespace Services.Abstractions.Internal;

internal interface IProxyUtils
{
    Task<IProxy> GetProxyAsync();
    Task<IList<IProxy>> GetEnabledProxiesAsync();
    Task DisableProxy(IProxy proxy);
    Task EnableProxy(IProxy proxy);
}