namespace Services.Models.Orders;

public class CreateOrderRequestDto
{
    public CreateOrderPersonalDataRequestDto UserData { get; set; } = null!;
    public CreateOrderAddressRequestDto Address { get; set; } = null!;
    public List<CreateOrderGoodItemRequestDto> Goods { get; set; } = null!;
}