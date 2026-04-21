namespace EcommerceAdminDashboard.Models.Domain;

public class ProductAttributeValue
{
    public Guid AttributeValueId { get; set; }
    public Guid AttributeId { get; set; }
    public string Value { get; set; } = string.Empty;

    public ProductAttribute? Attribute { get; set; }
    public ICollection<VariantAttributeValue> VariantAttributeValues { get; set; } = new List<VariantAttributeValue>();
}