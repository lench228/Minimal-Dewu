using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Abstractions;
using Services.Models.Cart;
using Services.Models.Shared;

namespace Web.Controllers;

[ApiController]
[Route("cart")]
[Authorize]
public class CartController(ICartService cartService) : ControllerBase
{
    [HttpPut]
    [ProducesResponseType<JsonResponseDto>(StatusCodes.Status200OK)]
    public async Task<IActionResult> AddProductToCart(AddProductToCartRequestDto request) =>
        (await cartService.AddProductAsync(request)).ToActionResult();
    
    [HttpGet]
    [ProducesResponseType<JsonResponseDto<List<CartProductResponseDto>>>(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetCartProducts() =>
        (await cartService.GetCartProductsAsync()).ToActionResult();
}