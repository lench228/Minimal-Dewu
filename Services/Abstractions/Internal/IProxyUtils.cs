using Domain.Abstractions;

namespace Services.Abstractions.Internal;

internal interface IProxyUtils
{
    Task<IList<IProxy>> GetAvailableProxiesAsync();
    Task DisableProxy(IProxy proxy);
    Task EnableProxy(IProxy proxy);
}