using System.Numerics;
using Microsoft.Playwright;

namespace Services.Extensions.Internal;

static class PlaywrightExtensions
{
    public static async Task<IResponse?> WaitForNetworkResponseAsync(this IPage page,
        Func<IRequest, bool> requestPredicate, 
        Func<IPage, Task> pageAction, 
        Action<PageWaitForRequestOptions>? optionsBuilder = null)
    {
        var o = new PageWaitForRequestOptions();
        optionsBuilder?.Invoke(o);
        var waitForRequestTask = page.WaitForRequestAsync(requestPredicate, o);
        await pageAction.Invoke(page);
        return await (await waitForRequestTask).ResponseAsync();
    }

    public static async Task UndetectableDragToAsync(this ILocator fromLocator, ILocator toLocator, CancellationToken token = default)
    {
        var page = fromLocator.Page;

        var fromBb = await fromLocator.BoundingBoxAsync();
        var toBb = await toLocator.BoundingBoxAsync();

        const float approx = 5;
        var fromVec = new Vector2(fromBb!.X + fromBb.Width / 2, fromBb.Y + fromBb.Height / 2).Approximate(approx);
        var toVec = new Vector2(toBb!.X + toBb.Width / 2, toBb.Y + toBb.Height / 2).Approximate(approx);

        var dirVec = new Vector2(toVec.X - fromVec.X, toVec.Y - fromVec.Y);
        var maxLength = dirVec.Length();
        var norm = Vector2.Normalize(dirVec);

        const int step = 50;
        var delay = TimeSpan.FromMilliseconds(100);

        await page.Mouse.MoveAsync(fromVec.X, fromVec.Y);
        await Task.Delay(delay, token);
        await page.Mouse.DownAsync();
        
        var stepVec = Vector2.Multiply(norm, step);
        var nextPt = Vector2.Add(fromVec, stepVec).Approximate(approx);
        while (Vector2.Subtract(nextPt, fromVec).Length() < maxLength)
        {
            token.ThrowIfCancellationRequested();
            await Task.Delay(delay, token);
            await page.Mouse.MoveAsync(nextPt.X, nextPt.Y);
            nextPt = Vector2.Add(nextPt, stepVec).Approximate(approx);
        }
        
        await Task.Delay(delay, token); 
        await page.Mouse.MoveAsync(toVec.X, toVec.Y);
        await page.Mouse.UpAsync();
    }
}