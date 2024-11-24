using Services.Models.Products;

namespace Services.Abstractions;

public interface IDewuService
{
    Task<ProductResponseDto?> GetProductInfoByUrlAsync(string url);
}