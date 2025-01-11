using Domain.Entities;

namespace Services.Models.Cart;

public class AddProductToCartProductPropertyItemRequestDto
{
    public string Name { get; set; } = null!;
    public string Value { get; set; } = null!;

    public ProductProperty ToEntity() =>
        new()
        {
            Name = Name,
            Value = Value
        };
}