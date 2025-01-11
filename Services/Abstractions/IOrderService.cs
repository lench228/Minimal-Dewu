using Services.Helpers.ApiResponseBuilder;
using Services.Models.Orders;

namespace Services.Abstractions;

public interface IOrderService
{
    public Task<JsonApiResponse> CreateOrderAsync(CreateOrderRequestDto request);
    public Task<JsonApiResponse<OrdersResponseDto>> GetOrdersAsync();
}