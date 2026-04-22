using EcommerceAdminDashboard.Models.Domain;
using EcommerceAdminDashboard.Services.Interfaces;

namespace EcommerceAdminDashboard.Api.GraphQL;

public class Query
{
    public async Task<Order?> GetOrder(Guid orderId, [Service] IOrderService orderService)
    {
        return await orderService.GetOrderAsync(orderId);
    }

    public async Task<IEnumerable<Order>> GetOrders([Service] IOrderService orderService, int skip = 0, int take = 10)
    {
        return await orderService.GetOrdersAsync(skip, take);
    }

    public async Task<IEnumerable<Order>> GetOrdersByStatus(string status, [Service] IOrderService orderService)
    {
        return await orderService.GetOrdersByStatusAsync(status);
    }

    public async Task<Product?> GetProduct(Guid productId, [Service] IProductService productService)
    {
        return await productService.GetProductAsync(productId);
    }

    public async Task<IEnumerable<Product>> GetProducts([Service] IProductService productService)
    {
        return await productService.GetProductsAsync();
    }

    public async Task<IEnumerable<Product>> GetActiveProducts([Service] IProductService productService)
    {
        return await productService.GetActiveProductsAsync();
    }

    public async Task<IEnumerable<Product>> SearchProducts(string query, [Service] IProductService productService)
    {
        return await productService.SearchProductsAsync(query);
    }

    public async Task<Inventory?> GetInventory(Guid inventoryId, [Service] IInventoryService inventoryService)
    {
        return await inventoryService.GetInventoryAsync(inventoryId);
    }

    public async Task<IEnumerable<Inventory>> GetInventoryByVariant(Guid variantId, [Service] IInventoryService inventoryService)
    {
        return await inventoryService.GetInventoryByVariantAsync(variantId);
    }

    public async Task<int> GetTotalQuantityByVariant(Guid variantId, [Service] IInventoryService inventoryService)
    {
        return await inventoryService.GetTotalQuantityByVariantAsync(variantId);
    }

    public async Task<IEnumerable<Inventory>> GetLowStockItems([Service] IInventoryService inventoryService, int threshold = 10)
    {
        return await inventoryService.GetLowStockItemsAsync(threshold);
    }
}
