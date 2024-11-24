using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Services.Abstractions;
using Services.Abstractions.Internal;
using Services.Services;
using Services.Services.Internal;

namespace Services.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
    {
        services.AddTransient<IProxyUtils, DbProxyUtils>();
        services.AddTransient<IDewuService, DewuService>();
        services.AddTransient<IPlaywrightUtilsFactory, PlaywrightUtilsFactory>();
        return services;
    }
}