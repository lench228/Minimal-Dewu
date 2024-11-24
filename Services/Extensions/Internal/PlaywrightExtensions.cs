using Microsoft.Playwright;

namespace Services.Extensions.Internal;

static class PlaywrightExtensions
{
    public static async Task<IResponse?> WaitForNetworkResponseAsync(this IPage page,
        string requestUrl, 
        Func<IPage, Task> pageAction, 
        Action<PageWaitForRequestOptions>? optionsBuilder = null)
    {
        var o = new PageWaitForRequestOptions();
        optionsBuilder?.Invoke(o);
        var waitForRequestTask = page.WaitForRequestAsync(requestUrl, o);
        await pageAction.Invoke(page);
        return await (await waitForRequestTask).ResponseAsync();
    }
}