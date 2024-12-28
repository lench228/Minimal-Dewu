using Microsoft.Extensions.Logging;
using Services.Abstractions.Internal;

namespace Services.Services.Internal;

internal class PlaywrightUtilsFactory(IOpenAiUtils openAiUtils, ILogger<PlaywrightUtils> logger) : IPlaywrightUtilsFactory
{
    public async Task<IPlaywrightUtils> CreateAsync()
    {
        return await PlaywrightUtils.CreateAsync(openAiUtils, logger);
    }
}