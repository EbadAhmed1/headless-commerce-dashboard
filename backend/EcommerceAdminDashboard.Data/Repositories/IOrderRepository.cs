using EcommerceAdminDashboard.Models.Domain;

namespace EcommerceAdminDashboard.Data.Repositories;

public interface IOrderRepository : IRepository<Order>
{
    Task<Order?> GetOrderWithItemsAsync(Guid orderId);
    Task<IEnumerable<Order>> GetOrdersByStatusAsync(string status);
    Task<IEnumerable<Order>> GetOrdersByCustomerEmailAsync(string email);
    Task<IEnumerable<Order>> GetOrdersAsync(int skip, int take);
    Task<Order?> GetByShopifyOrderIdAsync(long shopifyOrderId);
}
