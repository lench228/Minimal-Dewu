namespace Services.Models.Orders;

public class OrderResponseGoodDto
{
    public string Title { get; set; } = null!;
    public int Price { get; set; }
    public string? ImageUrl { get; set; }
    public List<OrderResponseGoodPropertyDto> Properties { get; set; } = null!;
}