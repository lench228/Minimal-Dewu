using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Abstractions;
using Services.Models.Orders;
using Services.Models.Shared;

namespace Web.Controllers;

[ApiController]
[Route("api/orders")]
[Authorize]
public class OrderController(IOrderService orderService) : ControllerBase
{
    [HttpPost]
    [ProducesResponseType<JsonResponseDto>(StatusCodes.Status200OK)]
    public async Task<IActionResult> CreateOrder(CreateOrderRequestDto request) =>
        (await orderService.CreateOrderAsync(request)).ToActionResult();
    
    [HttpGet]
    [ProducesResponseType<JsonResponseDto<OrdersResponseDto>>(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetOrders() =>
        (await orderService.GetOrdersAsync()).ToActionResult();
}