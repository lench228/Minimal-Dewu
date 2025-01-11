using Infrastructure.EfCore;
using Infrastructure.Extensions;
using Services.Abstractions;
using Services.Helpers.ApiResponseBuilder;
using Services.Models.Cart;

namespace Services.Services;

internal class CartService(AppDbContext dbContext, IUserIdAccessor userIdAccessor) : ICartService
{
    public async Task<JsonApiResponse> AddProductAsync(AddProductToCartRequestDto request)
    {
        var userId = userIdAccessor.GetCurrentUserId();
        var user = await dbContext.Users.GetByIdAsync(userId, true);
        
        user!.Cart.Add(request.ToEntity());
        await dbContext.SaveChangesAsync();

        return ApiResponseFactory.Json(o => o.Success());
    }

    public async Task<JsonApiResponse<List<CartProductResponseDto>>> GetCartProductsAsync()
    {
        var userId = userIdAccessor.GetCurrentUserId();
        var user = await dbContext.Users.GetByIdAsync(userId, true);

        var response = user!.Cart.Select(p => new CartProductResponseDto(p)).ToList();
        
        return ApiResponseFactory.Json<List<CartProductResponseDto>>(o => o
            .Success()
            .Model(response));
    }
}