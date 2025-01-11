namespace Services.Models.Orders;

public class OrderResponseAddressDto
{
    public string City { get; set; } = null!;
    public string Street { get; set; } = null!;
    public string Building { get; set; } = null!;
    public string Apartment { get; set; } = null!;
}