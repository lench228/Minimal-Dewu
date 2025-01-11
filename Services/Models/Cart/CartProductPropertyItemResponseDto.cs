using Domain.Entities;

namespace Services.Models.Cart;

public class CartProductPropertyItemResponseDto
{
    public CartProductPropertyItemResponseDto(ProductProperty property)
    {
        Name = property.Name;
        Value = property.Value;
    }
    
    public string Name { get; set; }
    public string Value { get; set; }
}