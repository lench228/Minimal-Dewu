﻿using System.Threading.Channels;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Services.Abstractions;
using Services.Abstractions.Internal;
using Services.Models.Captcha;
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
        services.AddTransient<IOpenAiUtils, OpenAiUtils>();
        services.AddHostedService<CaptchaRequestsConsumer>();
        services.AddSingleton(Channel.CreateUnbounded<CaptchaRequest>());
        services.AddHttpClient();
        return services;
    }
}