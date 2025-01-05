namespace Services.Models.Products.Internal;

internal class ProductModelSkuItem
{
    public long SkuId { get; set; }
    public List<ProductModelPropertyItem> Properties { get; set; } = null!;
}