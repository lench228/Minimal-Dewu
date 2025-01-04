using Services.Models.Products.Internal;

namespace Services.Models.Products;

public class ProductResponseDto
{
    public string Title { get; set; }
    public int Price { get; set; }
    public string ImageUrl { get; set; }
    public List<ProductPropertyItemResponseDto> Properties { get; set; }

    internal ProductResponseDto(ProductModel model)
    {
        Title = model.Data!.Detail.Title;
        Price = (int)(model.Data.Item.Price / 100);
        ImageUrl = model.Data.Detail.LogoUrl;
        var propIds = model.Data.Skus
            .First(sku => sku.SkuId == model.Data.Detail.DefaultSkuId).Properties
            .Select(p => p.PropertyValueId)
            .ToHashSet();
        var props = model.Data.SaleProperties.List.Where(p => propIds.Contains(p.PropertyValueId));
        Properties = props.Select(p => new ProductPropertyItemResponseDto
        {
            Name = p.Name,
            Value = p.Value
        }).ToList();
    }
}