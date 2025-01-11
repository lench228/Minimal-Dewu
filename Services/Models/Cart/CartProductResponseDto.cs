using Domain.Entities;

namespace Services.Models.Cart;

public class CartProductResponseDto
{
    public CartProductResponseDto(Product product)
    {
        Title = product.Title;
        Price = product.Price;
        ImageUrl = product.ImageUrl;
        Quantity = product.Quantity;
        Properties = product.Properties.Select(p => new CartProductPropertyItemResponseDto(p)).ToList();
    }
    
    public string Title { get; set; }
    public int Price { get; set; }
    public string? ImageUrl { get; set; }
    public int Quantity { get; set; }
    public List<CartProductPropertyItemResponseDto> Properties { get; set; }
}