using EcommerceAdminDashboard.Models.Domain;
using EcommerceAdminDashboard.Models.DTOs;

namespace EcommerceAdminDashboard.Services.Interfaces;

public interface IOrderService
{
    Task<Order?> GetOrderAsync(Guid orderId);
    Task<IEnumerable<Order>> GetOrdersAsync(int skip = 0, int take = 10);
    Task<Order> CreateOrderAsync(CreateOrderDto dto);
    Task<Order?> UpdateOrderStatusAsync(Guid orderId, string newStatus);
    Task<IEnumerable<Order>> GetOrdersByStatusAsync(string status);
    Task<IEnumerable<Order>> GetOrdersByCustomerEmailAsync(string email);
    Task<Order> CreateOrderFromShopifyAsync(ShopifyOrderDto shopifyOrder);
}
