using EcommerceAdminDashboard.Models.Domain;
using EcommerceAdminDashboard.Models.DTOs;
using EcommerceAdminDashboard.Services.Interfaces;

namespace EcommerceAdminDashboard.Api.GraphQL;

public class Mutation
{
    public async Task<Order> CreateOrder(CreateOrderDto input, [Service] IOrderService orderService)
    {
        return await orderService.CreateOrderAsync(input);
    }

    public async Task<Order?> UpdateOrderStatus(Guid orderId, string newStatus, [Service] IOrderService orderService)
    {
        return await orderService.UpdateOrderStatusAsync(orderId, newStatus);
    }

    public async Task<Product> CreateProduct(string name, string description, decimal basePrice, [Service] IProductService productService)
    {
        var product = new Product
        {
            ProductId = Guid.NewGuid(),
            Name = name,
            Description = description,
            BasePrice = basePrice,
            IsActive = true,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        return await productService.CreateProductAsync(product);
    }

    public async Task<Product?> UpdateProduct(Guid productId, string name, string description, decimal basePrice, [Service] IProductService productService)
    {
        var product = new Product
        {
            ProductId = productId,
            Name = name,
            Description = description,
            BasePrice = basePrice,
            IsActive = true,
            UpdatedAt = DateTime.UtcNow
        };

        return await productService.UpdateProductAsync(productId, product);
    }

    public async Task<bool> DeleteProduct(Guid productId, [Service] IProductService productService)
    {
        return await productService.DeleteProductAsync(productId);
    }

    public async Task<bool> DeductInventory(Guid variantId, Guid binId, int quantity, [Service] IInventoryService inventoryService)
    {
        return await inventoryService.DeductInventoryAsync(variantId, binId, quantity);
    }

    public async Task<bool> AddInventory(Guid variantId, Guid binId, int quantity, [Service] IInventoryService inventoryService)
    {
        return await inventoryService.AddInventoryAsync(variantId, binId, quantity);
    }

    public async Task<bool> TransferInventory(Guid variantId, Guid fromBinId, Guid toBinId, int quantity, [Service] IInventoryService inventoryService)
    {
        return await inventoryService.TransferInventoryAsync(variantId, fromBinId, toBinId, quantity);
    }
}
