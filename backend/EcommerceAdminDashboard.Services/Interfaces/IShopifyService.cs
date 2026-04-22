using EcommerceAdminDashboard.Models.DTOs;

namespace EcommerceAdminDashboard.Services.Interfaces;

public interface IShopifyService
{
    Task<ShopifyOrderDto?> GetOrderAsync(long shopifyOrderId);
    Task<ShopifyProductDto?> GetProductAsync(long shopifyProductId);
    Task<IEnumerable<ShopifyOrderDto>> GetOrdersAsync();
    Task<IEnumerable<ShopifyProductDto>> GetProductsAsync();
    bool ValidateWebhookSignature(string signature, string body);
}
