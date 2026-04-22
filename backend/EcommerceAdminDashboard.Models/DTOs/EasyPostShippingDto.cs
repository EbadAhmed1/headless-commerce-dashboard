namespace EcommerceAdminDashboard.Models.DTOs;

public class EasyPostShippingDto
{
    public string Id { get; set; } = string.Empty;
    public string TrackingNumber { get; set; } = string.Empty;
    public string Carrier { get; set; } = string.Empty;
    public string LabelUrl { get; set; } = string.Empty;
    public DateTime? EstimatedDeliveryDate { get; set; }
    public decimal Rate { get; set; }
}

public class EasyPostAddressDto
{
    public string Name { get; set; } = string.Empty;
    public string Street1 { get; set; } = string.Empty;
    public string Street2 { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string State { get; set; } = string.Empty;
    public string Zip { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
}

public class EasyPostParcelDto
{
    public decimal Length { get; set; }
    public decimal Width { get; set; }
    public decimal Height { get; set; }
    public decimal Weight { get; set; }
}