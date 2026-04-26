namespace EcommerceAdminDashboard.Models.Domain;

public class OrderItem
{
    public Guid OrderItemId { get; set; }
    public Guid OrderId { get; set; }
    public Guid? VariantId { get; set; }
    public long? ShopifyVariantId { get; set; }
    public string ProductTitle { get; set; } = string.Empty;
    public string Sku { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public decimal PriceAtPurchase { get; set; }

    public Order? Order { get; set; }
    public Variant? Variant { get; set; }
}