namespace EcommerceAdminDashboard.Models.Domain;

public class VariantAttributeValue
{
    public Guid VariantAttributeValueId { get; set; }
    public Guid VariantId { get; set; }
    public Guid AttributeValueId { get; set; }

    public Variant? Variant { get; set; }
    public ProductAttributeValue? ProductAttributeValue { get; set; }
}