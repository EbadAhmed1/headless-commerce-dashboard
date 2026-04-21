namespace EcommerceAdminDashboard.Models.Domain;

public class ProductAttribute
{
    public Guid AttributeId { get; set; }
    public Guid ProductId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;

    public Product? Product { get; set; }
    public ICollection<ProductAttributeValue> AttributeValues { get; set; } = new List<ProductAttributeValue>();
}