namespace EcommerceAdminDashboard.Models.DTOs;

public class StripePaymentDto
{
    public string PaymentIntentId { get; set; } = string.Empty;
    public long Amount { get; set; }
    public string Currency { get; set; } = "usd";
    public string Status { get; set; } = string.Empty;
    public string CustomerId { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}

public class StripeChargeDto
{
    public string Id { get; set; } = string.Empty;
    public long Amount { get; set; }
    public string Currency { get; set; } = string.Empty;
    public bool Paid { get; set; }
    public string Status { get; set; } = string.Empty;
}