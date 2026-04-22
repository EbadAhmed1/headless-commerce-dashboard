using EcommerceAdminDashboard.Models.DTOs;

namespace EcommerceAdminDashboard.Services.Interfaces
{
    public interface IShopifyService
    {
        Task<List<ShopifyOrderDto>> GetOrdersAsync();
        Task<ShopifyOrderDto> GetOrderByIdAsync(long orderId);
        Task<List<ShopifyProductDto>> GetProductsAsync();
        Task<ShopifyProductDto> GetProductByIdAsync(long productId);
        bool ValidateWebhook(string requestBody, string hmacHeader);
        Task<ShopifyOrderDto> ProcessWebhookOrderAsync(string requestBody);
        Task UpdateOrderStatusAsync(long orderId, string status);
    }
}