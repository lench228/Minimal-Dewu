using System.Threading.Channels;
using Infrastructure.EfCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Services.Abstractions.Internal;
using Services.Models.Captcha;

namespace Services.Services.Internal;

public class CaptchaRequestsConsumer(Channel<CaptchaRequest> channel, 
    IServiceScopeFactory scopeFactory,
    ILogger<CaptchaRequestsConsumer> logger) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        await using var scope = scopeFactory.CreateAsyncScope();
        var playwrightUtilsFactory = scope.ServiceProvider.GetRequiredService<IPlaywrightUtilsFactory>();
        var playwrightUtils = await playwrightUtilsFactory.CreateAsync();
        var proxyUtils = scope.ServiceProvider.GetRequiredService<IProxyUtils>();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        while (!channel.Reader.Completion.IsCompleted)
        {
            var request = await channel.Reader.ReadAsync(stoppingToken);
            logger.LogInformation("Handling captcha request for proxy: {Proxy}", request.Proxy?.Url);
            await playwrightUtils.SolveCaptchaAsync(request.Url, request.Proxy);
        }
    }
}