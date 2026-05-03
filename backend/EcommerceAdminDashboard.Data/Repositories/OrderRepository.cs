using Microsoft.EntityFrameworkCore;
using EcommerceAdminDashboard.Models.Domain;

namespace EcommerceAdminDashboard.Data.Repositories;

public class OrderRepository : Repository<Order>, IOrderRepository
{
    private readonly ApplicationDbContext _context;

    public OrderRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<Order?> GetOrderWithItemsAsync(Guid orderId)
    {
        return await _context.Orders
            .Include(o => o.OrderItems)
            .ThenInclude(oi => oi.Variant)
            .ThenInclude(v => v.Product)
            .FirstOrDefaultAsync(o => o.OrderId == orderId);
    }

    public async Task<IEnumerable<Order>> GetOrdersByStatusAsync(string status)
    {
        return await _context.Orders
            .Where(o => o.Status == status)
            .OrderByDescending(o => o.OrderDate)
            .ToListAsync();
    }

    public async Task<IEnumerable<Order>> GetOrdersByCustomerEmailAsync(string email)
    {
        return await _context.Orders
            .Where(o => o.CustomerEmail == email)
            .OrderByDescending(o => o.OrderDate)
            .ToListAsync();
    }

    public async Task<IEnumerable<Order>> GetOrdersAsync(int skip, int take)
    {
        return await _context.Orders
            .OrderByDescending(o => o.OrderDate)
            .Skip(skip)
            .Take(take)
            .ToListAsync();
    }

    public async Task<Order?> GetByShopifyOrderIdAsync(long shopifyOrderId)
    {
        return await _context.Orders
            .FirstOrDefaultAsync(o => o.ShopifyOrderId == shopifyOrderId);
    }
}
