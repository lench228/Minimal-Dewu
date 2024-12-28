using Domain.Abstractions;
using Services.Models.Products.Internal;

namespace Services.Abstractions.Internal;

internal interface IPlaywrightUtils : IDisposable
{
    Task<ProductModel> GetProductInfoByUrlAsync(string url, IProxy? proxy = null);
    Task SolveCaptchaAsync(string url, IProxy? proxy);
}