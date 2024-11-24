using Services.Helpers.ResponseBuilder;

namespace Services.Abstractions;

public interface IDewuService
{
    Task<IApiResponse> GetProductInfoByUrlAsync(string url);
}