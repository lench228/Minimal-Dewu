using System.Text.Json;
using Domain.Abstractions;
using Microsoft.Extensions.Logging;
using Microsoft.Playwright;
using Services.Abstractions.Internal;
using Services.Exceptions;
using Services.Extensions.Internal;
using Services.Models.Products.Internal;

namespace Services.Services.Internal;

internal class PlaywrightUtils : IPlaywrightUtils
{
    private const string DetailsRequestEnding = "product/detailV3";
    private static readonly JsonSerializerOptions JsonSerializerOptions = new()
    {
        PropertyNameCaseInsensitive = true
    };
    private const int CaptchaRetriesAvailable = 3;
    
    private readonly IPlaywright _playwright;
    private readonly IOpenAiUtils _openAiUtils;
    private readonly ILogger<PlaywrightUtils> _logger;

    private PlaywrightUtils(IPlaywright playwright, IOpenAiUtils openAiUtils, ILogger<PlaywrightUtils> logger)
    {
        _playwright = playwright;
        _openAiUtils = openAiUtils;
        _logger = logger;
    }

    public static async Task<PlaywrightUtils> CreateAsync(IOpenAiUtils openAiUtils, ILogger<PlaywrightUtils> logger)
    {
        var playwright = await Playwright.CreateAsync();
        return new PlaywrightUtils(playwright, openAiUtils, logger);
    }
    
    public async Task<ProductModel> GetProductInfoByUrlAsync(string url, IProxy? proxy = null)
    {
        await using var browser = await _playwright.Chromium.LaunchAsync(new ()
        {
            Headless = true
        });
        
        var p = proxy is not null
            ? new Proxy
            {
                Server = proxy.Url,
                Username = proxy.Username,
                Password = proxy.Password
            }
            : null;
        
        var page = await browser.NewPageAsync(new BrowserNewPageOptions
        {
            Proxy = p
        });
        
        var json = await GetDetailsResponseJsonAsync(page, pg => pg.GotoAsync(url, new PageGotoOptions
        {
            Timeout = 120000
        }));

        return JsonSerializer.Deserialize<ProductModel>(json, JsonSerializerOptions)!;
    }

    public async Task SolveCaptchaAsync(string url, IProxy? proxy)
    {
        await using var browser = await _playwright.Chromium.LaunchAsync(new ()
        {
            Headless = true
        });

        var p = proxy is not null
            ? new Proxy
            {
                Server = proxy.Url,
                Username = proxy.Username,
                Password = proxy.Password
            }
            : null;

        var page = await browser.NewPageAsync(new BrowserNewPageOptions
        {
            Proxy = p
        });

        try
        {
            var response = await GetDetailsResponseJsonAsync(page, pg => pg.GotoAsync(url, new PageGotoOptions
            {
                Timeout = 120000
            }));
            _logger.LogInformation("Got response before trying to solve captcha: {response}", response);
            return;
        }
        catch (PlaywrightException _)
        {
            _logger.LogInformation("Couldn't get response before while trying to solve captcha, starting to solve...");
        }
        

        for (var i = 0; i < CaptchaRetriesAvailable; i++)
        {
            try
            {
                await GetDetailsResponseJsonAsync(page, async pg =>
                {
                    var tokenWord = await page.Locator("#t5TokenImg").ScreenshotAsync();

                    var captchaImages = await page.Locator("#moveBg").ScreenshotAsync();

                    int correctImageNum;
                    try
                    {
                        correctImageNum = await _openAiUtils.SolveCaptchaAsync(tokenWord, captchaImages);
                    }
                    catch (OpenAiException e)
                    {
                        _logger.LogError(e, "Couldn't solve captcha for url: {Url}", url);
                        throw;
                    }

                    var fromLoc = pg.Locator($".moveImg:nth-of-type({correctImageNum})");
                    var toLoc = page.Locator("#blank");

                    var cts = new CancellationTokenSource(TimeSpan.FromSeconds(60));
                    await fromLoc.UndetectableDragToAsync(toLoc, cts.Token);
                });

                _logger.LogInformation("Resolved captcha for proxy: {Proxy}", proxy?.Url ?? "No proxy");
                return;
            }
            catch (PlaywrightException _)
            {
                _logger.LogInformation("Couldn't solve captcha on attempt {i}, trying again...", i + 1);
            }
            finally
            {
                await Task.Delay(1);
            }
        }
        throw new PlaywrightException("Couldn't solve captcha");
    }

    private static async Task<string> GetDetailsResponseJsonAsync(IPage page, Func<IPage, Task> pageAction)
    {
        IResponse? detailsResponse;
        try
        {
            detailsResponse = await page.WaitForNetworkResponseAsync(r => r.Url.EndsWith(DetailsRequestEnding) && r.Method == "POST", 
                pageAction,
                o => o.Timeout = 40000);
        }
        catch (TimeoutException)
        {
            throw new PlaywrightException("Details response timed out, maybe it's worth it to increase the timeout");
        }
        
        if (detailsResponse is null)
            throw new PlaywrightException("Couldn't get details response");
        if (detailsResponse.Status != 200)
            throw new PlaywrightException("Details response status is not 200");
        var jsonString = (await detailsResponse.JsonAsync()).ToString();
        if (jsonString is null)
            throw new PlaywrightException("Response body is not parsable or empty");
        return jsonString;
    }

    public void Dispose()
    {
        _playwright.Dispose();
    }
}