using System.Threading.Channels;
using Domain.Abstractions;
using Infrastructure.EfCore;
using Infrastructure.Extensions;
using Microsoft.Extensions.Logging;
using Microsoft.Playwright;
using Services.Abstractions;
using Services.Abstractions.Internal;
using Services.Helpers.ApiResponseBuilder;
using Services.Models.Captcha;
using Services.Models.Products;
using Services.Models.Products.Internal;

namespace Services.Services;

internal class DewuService(
    AppDbContext db,
    IProxyUtils proxyUtils,
    IPlaywrightUtilsFactory playwrightUtilsFactory,
    ILogger<DewuService> logger,
    Channel<CaptchaRequest> channel) : IDewuService
{
    public async Task<IApiResponse> GetProductInfoByUrlAsync(string url)
    {
        var gv = await db.GetGlobalVarsAsync(true);
        using var playwrightUtils = await playwrightUtilsFactory.CreateAsync();

        ProductModel? productModel = null;
        if (!gv.MainHostCaptchaBlocked)
        {
            logger.LogInformation("Trying to get product info without proxy: {Url}", url);
            productModel = await TryGetProductModel(playwrightUtils, url);
            if (productModel?.Code != 200)
            {
                // TODO: temp
                // gv.MainHostCaptchaBlocked = true;
                // await db.SaveChangesAsync();
                // await channel.Writer.WriteAsync(new CaptchaRequest(url));
            }
        }
        
        if (productModel?.Code != 200)
        {
            var proxies = await proxyUtils.GetEnabledProxiesAsync();
            if (proxies.Count == 0)
                return ApiResponseFactory.Json<ProductResponseDto>(o => o.Error(500, "Couldn't get product info"));
            
            foreach (var proxy in proxies)
            {
                logger.LogInformation("Trying to get product info with proxy: {Url}, {Proxy}", url, proxy.Url);
                productModel = await TryGetProductModel(playwrightUtils, url, proxy);
                if (productModel?.Code == 200)
                    break;
                // TODO: temp
                // await proxyUtils.DisableProxy(proxy);
                // await channel.Writer.WriteAsync(new CaptchaRequest(url, proxy));
            }
        }

        if (productModel?.Code == 200)
            return ApiResponseFactory.Json<ProductResponseDto>(o =>
                o.Success().Model(new ProductResponseDto(productModel)));
        
        logger.LogError("Couldn't get product info by url: {Url}", url);
        return ApiResponseFactory.Json<ProductResponseDto>(o =>
            o.Error(500, "Couldn't get product info"));
    }

    private async Task<ProductModel?> TryGetProductModel(
        IPlaywrightUtils playwrightUtils,
        string url,
        IProxy? proxy = null)
    {
        try
        {
            return await playwrightUtils.GetProductInfoByUrlAsync(url, proxy);
        }
        catch (PlaywrightException e)
        {
            logger.LogInformation("Got exception trying to get product info by playwright: {Exception}", e);
        }

        return null;
    }
}