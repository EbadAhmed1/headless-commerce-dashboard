namespace EcommerceAdminDashboard.Models.DTOs;

public class ShopifyProductDto
{
    public long Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string BodyHtml { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public List<ShopifyVariantDto> Variants { get; set; } = new();
}

public class ShopifyVariantDto
{
    public long Id { get; set; }
    public long ProductId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Sku { get; set; } = string.Empty;
    public string Price { get; set; } = "0";
    public int InventoryQuantity { get; set; }

    public decimal PriceDecimal => decimal.TryParse(Price, out var p) ? p : 0m;
}