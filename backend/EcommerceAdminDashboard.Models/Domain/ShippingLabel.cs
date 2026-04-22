namespace EcommerceAdminDashboard.Models.Domain;

public class ShippingLabel
{
    public Guid ShippingLabelId { get; set; }
    public Guid OrderId { get; set; }
    public string TrackingNumber { get; set; } = string.Empty;
    public string Carrier { get; set; } = string.Empty;
    public string LabelUrl { get; set; } = string.Empty;
    public DateTime? EstimatedDelivery { get; set; }
    public DateTime CreatedAt { get; set; }

    public Order? Order { get; set; }
}