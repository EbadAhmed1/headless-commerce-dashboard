namespace EcommerceAdminDashboard.Models.Domain;

public class Product
{
    public Guid ProductId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal BasePrice { get; set; }
    public string? ShopifyProductId { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public ICollection<ProductAttribute> ProductAttributes { get; set; } = new List<ProductAttribute>();
    public ICollection<Variant> Variants { get; set; } = new List<Variant>();
}