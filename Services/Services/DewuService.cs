using Domain.Abstractions;
using Microsoft.Extensions.Logging;
using Microsoft.Playwright;
using Services.Abstractions;
using Services.Abstractions.Internal;
using Services.Helpers.ResponseBuilder;
using Services.Models.Products;
using Services.Models.Products.Internal;

namespace Services.Services;

internal class DewuService(
    IProxyUtils proxyUtils,
    IPlaywrightUtilsFactory playwrightUtilsFactory,
    ILogger<DewuService> logger) : IDewuService
{
    public async Task<IApiResponse> GetProductInfoByUrlAsync(string url)
    {
        using var playwrightUtils = await playwrightUtilsFactory.CreateAsync();
        logger.LogInformation("Trying to get product info without proxy: {Url}", url);
        var productModel = await TryGetProductModel(playwrightUtils, url);
        if (productModel?.Code != 200)
        {
            // TODO: тут нужно будет отправлять запрос на восстановление основы в Channel + ставить в глобал хранилище, что основа в бане
            var proxies = await proxyUtils.GetAvailableProxiesAsync();
            if (proxies.Count == 0)
                return ResponseBuilder.Json<ProductResponseDto>(o => o.Error(500, "Couldn't get product info"));
            
            foreach (var proxy in proxies)
            {
                logger.LogInformation("Trying to get product info with proxy: {Url}, {Proxy}", url, proxy.Url);
                productModel = await TryGetProductModel(playwrightUtils, url, proxy);
                if (productModel?.Code == 200)
                    break;
                await proxyUtils.DisableProxy(proxy);
                // TODO: тут нужно будет отправлять запрос на восстановление прокси в Channel
            }
        }

        if (productModel?.Code == 200)
            return ResponseBuilder.Json<ProductResponseDto>(o => o.Success()
                .Model(new ProductResponseDto(productModel)));
        
        logger.LogError("Couldn't get product info by url: {Url}", url);
        return ResponseBuilder.Json<ProductResponseDto>(o => o.Error(500, "Couldn't get product info"));
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