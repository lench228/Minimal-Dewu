namespace Services.Models.Products.Internal;

internal class ProductModelData
{
    public ProductModelDetail Detail { get; set; } = null!;
    public ProductModelItem Item { get; set; } = null!;
    public List<ProductModelSkuItem> Skus { get; set; } = null!;
    public ProductModelSaleProperties SaleProperties { get; set; } = null!;
}