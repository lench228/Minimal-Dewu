namespace Services.Models.Orders;

public class CreateOrderGoodRequestDto
{
    public string Title { get; set; } = null!;
    public int Price { get; set; }
    public string? ImageUrl { get; set; }
    public List<CreateOrderGoodItemPropertyRequestDto> Properties { get; set; } = [];
}