namespace EcommerceAdminDashboard.Models.DTOs;

public class ShopifyOrderDto
{
    public long Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public string FinancialStatus { get; set; } = string.Empty;
    public string FulfillmentStatus { get; set; } = string.Empty;
    public decimal TotalPrice { get; set; }
    public ShopifyCustomerDto? Customer { get; set; }
    public List<ShopifyLineItemDto> LineItems { get; set; } = new();
    public ShopifyAddressDto? ShippingAddress { get; set; }
}

public class ShopifyCustomerDto
{
    public long Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
}

public class ShopifyLineItemDto
{
    public long Id { get; set; }
    public long VariantId { get; set; }
    public string Title { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public decimal Price { get; set; }
    public string Sku { get; set; } = string.Empty;
}

public class ShopifyAddressDto
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Address1 { get; set; } = string.Empty;
    public string Address2 { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string Province { get; set; } = string.Empty;
    public string Zip { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
}