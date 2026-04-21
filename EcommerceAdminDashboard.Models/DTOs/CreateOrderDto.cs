namespace EcommerceAdminDashboard.Models.DTOs;

public class CreateOrderDto
{
    public string CustomerName { get; set; } = string.Empty;
    public string CustomerEmail { get; set; } = string.Empty;
    public string ShippingAddress { get; set; } = string.Empty;
    public List<CreateOrderItemDto> OrderItems { get; set; } = new();
}

public class CreateOrderItemDto
{
    public Guid VariantId { get; set; }
    public int Quantity { get; set; }
    public decimal PriceAtPurchase { get; set; }
}

public class UpdateOrderStatusDto
{
    public Guid OrderId { get; set; }
    public string NewStatus { get; set; } = string.Empty;
}