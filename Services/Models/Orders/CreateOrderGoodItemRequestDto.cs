using System.ComponentModel.DataAnnotations;

namespace Services.Models.Orders;

public class CreateOrderGoodItemRequestDto
{
    [Range(1, int.MaxValue)]
    public int Count { get; set; } = 1;
    public CreateOrderGoodRequestDto Good { get; set; } = null!;
}