using EcommerceAdminDashboard.Data;
using EcommerceAdminDashboard.Models.Domain;
using HotChocolate.Data;

namespace EcommerceAdminDashboard.Api.GraphQL;

public class Query
{
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<Order> GetOrders(ApplicationDbContext context)
    {
        return context.Orders;
    }

    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<Product> GetProducts(ApplicationDbContext context)
    {
        return context.Products;
    }

    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<Variant> GetVariants(ApplicationDbContext context)
    {
        return context.Variants;
    }

    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<Inventory> GetInventory(ApplicationDbContext context)
    {
        return context.Inventory;
    }

    [UseProjection]
    public Order? GetOrder(Guid orderId, ApplicationDbContext context)
    {
        return context.Orders.FirstOrDefault(o => o.OrderId == orderId);
    }

    [UseProjection]
    public Product? GetProduct(Guid productId, ApplicationDbContext context)
    {
        return context.Products.FirstOrDefault(p => p.ProductId == productId);
    }
}
