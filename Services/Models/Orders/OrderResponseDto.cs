namespace Services.Models.Orders;

public class OrderResponseDto
{
    public int Id { get; set; }
    public DateTimeOffset Created { get; set; }
    public DateTimeOffset Due { get; set; }
    public OrderResponseAddressDto Address { get; set; } = null!;
    public OrderResponsePersonalDataDto UserData { get; set; } = null!;
    public int Total { get; set; }
    public List<OrderResponseGoodItemDto> Goods { get; set; } = null!;
}