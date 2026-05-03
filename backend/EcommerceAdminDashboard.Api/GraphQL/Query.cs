using EcommerceAdminDashboard.Data;
using EcommerceAdminDashboard.Models.Domain;
using HotChocolate;
using HotChocolate.Data;
using Microsoft.EntityFrameworkCore;

namespace EcommerceAdminDashboard.Api.GraphQL;

public class Query
{
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<Order> GetOrders([Service] ApplicationDbContext context)
    {
        return context.Orders;
    }

    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<Product> GetProducts([Service] ApplicationDbContext context)
    {
        return context.Products;
    }

    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<Variant> GetVariants([Service] ApplicationDbContext context)
    {
        return context.Variants;
    }

    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<Inventory> GetInventory([Service] ApplicationDbContext context)
    {
        return context.Inventory;
    }

    public Order? GetOrder(Guid orderId, [Service] ApplicationDbContext context)
    {
        return context.Orders
            .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Variant)
                    .ThenInclude(v => v!.Product)
            .FirstOrDefault(o => o.OrderId == orderId);
    }

    [UseProjection]
    public Product? GetProduct(Guid productId, [Service] ApplicationDbContext context)
    {
        return context.Products.FirstOrDefault(p => p.ProductId == productId);
    }
}
