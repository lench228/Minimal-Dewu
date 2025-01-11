namespace Services.Models.Orders;

public class CreateOrderPersonalDataRequestDto
{
    public string Phone { get; set; } = null!;
    public string FullName { get; set; } = null!;
}