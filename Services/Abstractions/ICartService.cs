using Services.Helpers.ApiResponseBuilder;
using Services.Models.Cart;

namespace Services.Abstractions;

public interface ICartService
{
    public Task<JsonApiResponse> AddProductAsync(AddProductToCartRequestDto request);
    public Task<JsonApiResponse<List<CartProductResponseDto>>> GetCartProductsAsync();
}