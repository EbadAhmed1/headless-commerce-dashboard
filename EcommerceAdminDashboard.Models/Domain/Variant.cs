namespace EcommerceAdminDashboard.Models.Domain;

public class Variant
{
    public Guid VariantId { get; set; }
    public Guid ProductId { get; set; }
    public string SKU { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string? ShopifyVariantId { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public Product? Product { get; set; }
    public ICollection<VariantAttributeValue> VariantAttributeValues { get; set; } = new List<VariantAttributeValue>();
    public ICollection<Inventory> Inventory { get; set; } = new List<Inventory>();
    public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
}