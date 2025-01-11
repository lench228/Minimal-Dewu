namespace Services.Models.Orders;

public class OrderResponseGoodItemDto
{
    public int Count { get; set; }
    public OrderResponseGoodDto Good { get; set; } = null!;
}