using System.Text.Json;
using System.Text.Json.Serialization;

namespace EcommerceAdminDashboard.Models.DTOs;

public class ShopifyOrderDto
{
    [JsonPropertyName("id")]
    public long Id { get; set; }
    [JsonPropertyName("order_number")]
    public long OrderNumber { get; set; }
    [JsonPropertyName("email")]
    public string Email { get; set; } = string.Empty;
    [JsonPropertyName("created_at")]
    public DateTime? CreatedAt { get; set; }
    [JsonPropertyName("updated_at")]
    public DateTime? UpdatedAt { get; set; }
    [JsonPropertyName("closed_at")]
    public DateTime? ClosedAt { get; set; }
    [JsonPropertyName("cancelled_at")]
    public DateTime? CancelledAt { get; set; }
    [JsonPropertyName("financial_status")]
    public string? FinancialStatus { get; set; }
    [JsonPropertyName("fulfillment_status")]
    public string? FulfillmentStatus { get; set; }
    [JsonPropertyName("total_price")]
    public string? TotalPrice { get; set; }
    [JsonPropertyName("subtotal_price")]
    public string? SubtotalPrice { get; set; }
    [JsonPropertyName("total_tax")]
    public string? TotalTax { get; set; }
    [JsonPropertyName("total_shipping_price_set")]
    public JsonElement? TotalShippingPrice { get; set; }
    [JsonPropertyName("currency")]
    public string Currency { get; set; } = string.Empty;
    [JsonPropertyName("customer")]
    public ShopifyCustomerDto? Customer { get; set; }
    [JsonPropertyName("line_items")]
    public List<ShopifyLineItemDto> LineItems { get; set; } = new();
    [JsonPropertyName("shipping_address")]
    public ShopifyAddressDto? ShippingAddress { get; set; }
}

public class ShopifyCustomerDto
{
    [JsonPropertyName("id")]
    public long Id { get; set; }
    [JsonPropertyName("first_name")]
    public string FirstName { get; set; } = string.Empty;
    [JsonPropertyName("last_name")]
    public string LastName { get; set; } = string.Empty;
    [JsonPropertyName("email")]
    public string Email { get; set; } = string.Empty;
}

public class ShopifyLineItemDto
{
    [JsonPropertyName("id")]
    public long Id { get; set; }
    [JsonPropertyName("product_id")]
    public long? ProductId { get; set; }
    [JsonPropertyName("variant_id")]
    public long? VariantId { get; set; }
    [JsonPropertyName("title")]
    public string Title { get; set; } = string.Empty;
    [JsonPropertyName("quantity")]
    public int Quantity { get; set; }
    [JsonPropertyName("price")]
    public string? Price { get; set; }
    [JsonPropertyName("sku")]
    public string Sku { get; set; } = string.Empty;

    public decimal PriceDecimal => decimal.TryParse(Price, out var p) ? p : 0m;
}

public class ShopifyAddressDto
{
    [JsonPropertyName("first_name")]
    public string FirstName { get; set; } = string.Empty;
    [JsonPropertyName("last_name")]
    public string LastName { get; set; } = string.Empty;
    [JsonPropertyName("address1")]
    public string Address1 { get; set; } = string.Empty;
    [JsonPropertyName("address2")]
    public string Address2 { get; set; } = string.Empty;
    [JsonPropertyName("city")]
    public string City { get; set; } = string.Empty;
    [JsonPropertyName("province")]
    public string Province { get; set; } = string.Empty;
    [JsonPropertyName("zip")]
    public string PostalCode { get; set; } = string.Empty;
    [JsonPropertyName("country")]
    public string Country { get; set; } = string.Empty;
    [JsonPropertyName("phone")]
    public string Phone { get; set; } = string.Empty;
}