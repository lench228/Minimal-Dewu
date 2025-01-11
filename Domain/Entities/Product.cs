namespace Domain.Entities;

public class Product
{
    public string Title { get; set; } = null!;
    public int Price { get; set; }
    public string? ImageUrl { get; set; }
    public int Quantity { get; set; }
    public List<ProductProperty> Properties { get; set; } = [];
}