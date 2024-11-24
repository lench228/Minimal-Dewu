using System.Text.Json;
using Domain.Abstractions;
using Microsoft.Playwright;
using Services.Abstractions.Internal;
using Services.Extensions.Internal;
using Services.Models.Products.Internal;

namespace Services.Services.Internal;

internal class PlaywrightUtils : IPlaywrightUtils
{
    private const string DetailsRequestUrl = "**/detailV3";
    private static readonly JsonSerializerOptions JsonSerializerOptions = new()
    {
        PropertyNameCaseInsensitive = true
    };
    
    private readonly IPlaywright _playwright;

    private PlaywrightUtils(IPlaywright playwright)
    {
        _playwright = playwright;
    }

    public static async Task<PlaywrightUtils> CreateAsync()
    {
        var playwright = await Playwright.CreateAsync();
        return new PlaywrightUtils(playwright);
    }
    
    public async Task<ProductModel> GetProductInfoByUrlAsync(string url, IProxy? proxy = null)
    {
        await using var browser = await _playwright.Chromium.LaunchAsync(new BrowserTypeLaunchOptions
        {
            Headless = false,
            SlowMo = 500
        });

        var p = proxy is not null
            ? new Proxy
            {
                Server = proxy.Url,
                Username = proxy.Username,
                Password = proxy.Password
            }
            : null;
        var json = await GetDetailsResponseJsonAsync(browser, url, p);

        return JsonSerializer.Deserialize<ProductModel>(json, JsonSerializerOptions)!;
    }
    
    private static async Task<string> GetDetailsResponseJsonAsync(IBrowser browser, string url, Proxy? proxy = null)
    {
        IPage? page = null;
        try
        {
            page = await browser.NewPageAsync(new BrowserNewPageOptions
            {
                Proxy = proxy
            });
            var detailsResponse = await page.WaitForNetworkResponseAsync(DetailsRequestUrl,
                p => p.GotoAsync(url),
                o => o.Timeout = 5000);
            if (detailsResponse is null)
                throw new PlaywrightException("Couldn't get details response");
            var jsonString = (await detailsResponse.JsonAsync()).ToString();
            if (jsonString is null)
                throw new PlaywrightException("Response body is not parsable or empty");
            return jsonString;
        }
        finally
        {
            if (page is not null)
                await page.CloseAsync();
        }
    }

    public void Dispose()
    {
        _playwright.Dispose();
    }
}