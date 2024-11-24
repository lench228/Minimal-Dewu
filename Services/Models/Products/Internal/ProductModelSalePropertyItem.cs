namespace Services.Models.Products.Internal;

internal class ProductModelSalePropertyItem
{
    public long PropertyValueId { get; set; }
    public string Name { get; set; } = null!;
    public string Value { get; set; } = null!;
}