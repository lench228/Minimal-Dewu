using Services.Helpers.ApiResponseBuilder;

namespace Services.Abstractions;

public interface IDewuService
{
    Task<IApiResponse> GetProductInfoByUrlAsync(string url);
}