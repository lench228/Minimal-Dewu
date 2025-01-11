namespace Services.Models.Orders;

public class CreateOrderGoodItemPropertyRequestDto
{
    public string Name { get; set; } = null!;
    public string Value { get; set; } = null!;
}