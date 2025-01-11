using System.ComponentModel.DataAnnotations;
using Domain.Entities;

namespace Services.Models.Cart;

public class AddProductToCartRequestDto
{
    public string Title { get; set; } = null!;
    public int Price { get; set; }
    [Url]
    public string ImageUrl { get; set; } = null!;
    [Range(1, int.MaxValue)]
    public int Quantity { get; set; }
    public List<AddProductToCartProductPropertyItemRequestDto> Properties { get; set; } = [];

    public Product ToEntity() =>
        new()
        {
            Title = Title,
            Price = Price,
            ImageUrl = ImageUrl,
            Quantity = Quantity,
            Properties = Properties.Select(p => p.ToEntity()).ToList()
        };
}