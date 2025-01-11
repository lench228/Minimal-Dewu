namespace Domain.Entities;

public class Good
{
    public string Title { get; set; } = null!;
    public int Price { get; set; }
    public string? ImageUrl { get; set; }
    public int Quantity { get; set; }
    public List<GoodProperty> Properties { get; set; } = [];
}