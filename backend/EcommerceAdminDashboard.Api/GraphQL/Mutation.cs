using EcommerceAdminDashboard.Data;
using EcommerceAdminDashboard.Models.Domain;
using EcommerceAdminDashboard.Models.DTOs;
using EcommerceAdminDashboard.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

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

    public async Task<SyncResult> SyncShopifyData([Service] IShopifyService shopifyService, [Service] ApplicationDbContext context)
    {
        var result = new SyncResult();

        // Sync products
        var shopifyProducts = await shopifyService.GetProductsAsync();
        foreach (var sp in shopifyProducts)
        {
            var existingProduct = await context.Products
                .Include(p => p.Variants)
                .FirstOrDefaultAsync(p => p.ShopifyProductId == sp.Id.ToString());

            if (existingProduct == null)
            {
                var product = new Product
                {
                    ProductId = Guid.NewGuid(),
                    Name = sp.Title,
                    Description = sp.BodyHtml ?? string.Empty,
                    BasePrice = sp.Variants.FirstOrDefault()?.PriceDecimal ?? 0m,
                    ShopifyProductId = sp.Id.ToString(),
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };

                foreach (var sv in sp.Variants)
                {
                    var variant = new Variant
                    {
                        VariantId = Guid.NewGuid(),
                        ProductId = product.ProductId,
                        SKU = sv.Sku ?? $"SHOP-{sv.Id}",
                        Price = sv.PriceDecimal,
                        ShopifyVariantId = sv.Id.ToString(),
                        IsActive = true,
                        CreatedAt = DateTime.UtcNow,
                        UpdatedAt = DateTime.UtcNow
                    };
                    product.Variants.Add(variant);

                    // Create default inventory record
                    var defaultBin = await context.WarehouseBins.FirstOrDefaultAsync();
                    if (defaultBin == null)
                    {
                        defaultBin = new WarehouseBin
                        {
                            BinId = Guid.NewGuid(),
                            Name = "Main Warehouse",
                            LocationDescription = "Default warehouse location",
                            Capacity = 10000,
                            IsActive = true,
                            CreatedAt = DateTime.UtcNow
                        };
                        context.WarehouseBins.Add(defaultBin);
                    }

                    context.Inventory.Add(new Inventory
                    {
                        InventoryId = Guid.NewGuid(),
                        VariantId = variant.VariantId,
                        BinId = defaultBin.BinId,
                        Quantity = sv.InventoryQuantity,
                        LastUpdated = DateTime.UtcNow
                    });
                }

                context.Products.Add(product);
                result.ProductsSynced++;
            }
            else
            {
                existingProduct.Name = sp.Title;
                existingProduct.Description = sp.BodyHtml ?? existingProduct.Description;
                existingProduct.UpdatedAt = DateTime.UtcNow;

                foreach (var sv in sp.Variants)
                {
                    var existingVariant = existingProduct.Variants
                        .FirstOrDefault(v => v.ShopifyVariantId == sv.Id.ToString());

                    if (existingVariant == null)
                    {
                        var variant = new Variant
                        {
                            VariantId = Guid.NewGuid(),
                            ProductId = existingProduct.ProductId,
                            SKU = sv.Sku ?? $"SHOP-{sv.Id}",
                            Price = sv.PriceDecimal,
                            ShopifyVariantId = sv.Id.ToString(),
                            IsActive = true,
                            CreatedAt = DateTime.UtcNow,
                            UpdatedAt = DateTime.UtcNow
                        };
                        context.Variants.Add(variant);
                    }
                    else
                    {
                        existingVariant.SKU = sv.Sku ?? existingVariant.SKU;
                        existingVariant.Price = sv.PriceDecimal;
                        existingVariant.UpdatedAt = DateTime.UtcNow;
                    }
                }

                result.ProductsSynced++;
            }
        }

        // Sync orders
        var shopifyOrders = await shopifyService.GetOrdersAsync();
        foreach (var so in shopifyOrders)
        {
            var existingOrder = await context.Orders
                .FirstOrDefaultAsync(o => o.ShopifyOrderId == so.Id);

            if (existingOrder == null)
            {
                var order = new Order
                {
                    OrderId = Guid.NewGuid(),
                    ShopifyOrderId = so.Id,
                    OrderDate = so.CreatedAt.HasValue ? so.CreatedAt.Value.ToUniversalTime() : DateTime.UtcNow,
                    CustomerName = so.Customer != null
                        ? $"{so.Customer.FirstName} {so.Customer.LastName}".Trim()
                        : so.Email,
                    CustomerEmail = so.Customer?.Email ?? so.Email,
                    ShippingAddress = so.ShippingAddress != null
                        ? $"{so.ShippingAddress.Address1}, {so.ShippingAddress.City}, {so.ShippingAddress.Province} {so.ShippingAddress.PostalCode}, {so.ShippingAddress.Country}"
                        : string.Empty,
                    TotalAmount = decimal.TryParse(so.TotalPrice, out var tp) ? tp : 0m,
                    Status = !string.IsNullOrEmpty(so.FulfillmentStatus) ? so.FulfillmentStatus : "Pending",
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };

                foreach (var li in so.LineItems)
                {
                    // Try to match variant by Shopify variant ID
                    var variant = await context.Variants
                        .FirstOrDefaultAsync(v => v.ShopifyVariantId == li.VariantId.ToString());

                    order.OrderItems.Add(new OrderItem
                    {
                        OrderItemId = Guid.NewGuid(),
                        OrderId = order.OrderId,
                        VariantId = variant?.VariantId ?? Guid.Empty,
                        Quantity = li.Quantity,
                        PriceAtPurchase = li.PriceDecimal
                    });
                }

                context.Orders.Add(order);
                result.OrdersSynced++;
            }
            else
            {
                existingOrder.CustomerName = so.Customer != null
                    ? $"{so.Customer.FirstName} {so.Customer.LastName}".Trim()
                    : so.Email;
                existingOrder.CustomerEmail = so.Customer?.Email ?? so.Email;
                existingOrder.ShippingAddress = so.ShippingAddress != null
                    ? $"{so.ShippingAddress.Address1}, {so.ShippingAddress.City}, {so.ShippingAddress.Province} {so.ShippingAddress.PostalCode}, {so.ShippingAddress.Country}"
                    : existingOrder.ShippingAddress;
                existingOrder.TotalAmount = decimal.TryParse(so.TotalPrice, out var etp) ? etp : existingOrder.TotalAmount;
                existingOrder.Status = !string.IsNullOrEmpty(so.FulfillmentStatus) ? so.FulfillmentStatus 
                    : (!string.IsNullOrEmpty(existingOrder.Status) ? existingOrder.Status : "Pending");
                existingOrder.OrderDate = so.CreatedAt.HasValue ? so.CreatedAt.Value.ToUniversalTime() : existingOrder.OrderDate;
                existingOrder.UpdatedAt = DateTime.UtcNow;
                result.OrdersSynced++;
            }
        }

        await context.SaveChangesAsync();

        result.Success = true;
        return result;
    }
}

public class SyncResult
{
    public bool Success { get; set; }
    public int ProductsSynced { get; set; }
    public int OrdersSynced { get; set; }
}
