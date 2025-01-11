namespace Services.Models.Orders;

public class OrdersResponseDto
{
    public List<OrderResponseDto> Current { get; set; } = null!;
    public List<OrderResponseDto> Ended { get; set; } = null!;
    public List<OrderResponseDto> Canceled { get; set; } = null!;
}