using Services.Abstractions.Internal;

namespace Services.Services.Internal;

internal class PlaywrightUtilsFactory : IPlaywrightUtilsFactory
{
    public async Task<IPlaywrightUtils> CreateAsync()
    {
        return await PlaywrightUtils.CreateAsync();
    }
}