using System.Security.Cryptography;
using System.Text;
using EcommerceAdminDashboard.Data.Repositories;
using EcommerceAdminDashboard.Models.Domain;
using EcommerceAdminDashboard.Models.DTOs;

namespace EcommerceAdminDashboard.Services.Implementations;

public class ShopifyWebhookService
{
    private readonly IOrderRepository _orderRepository;
    private readonly IProductRepository _productRepository;
    private readonly string _webhookSecret;

    public ShopifyWebhookService(IOrderRepository orderRepository, IProductRepository productRepository, string webhookSecret)
    {
        _orderRepository = orderRepository;
        _productRepository = productRepository;
        _webhookSecret = webhookSecret;
    }

    public bool ValidateWebhookSignature(string signature, string body)
    {
        var key = Encoding.UTF8.GetBytes(_webhookSecret);
        var message = Encoding.UTF8.GetBytes(body);
        using var hmac = new HMACSHA256(key);
        var hash = hmac.ComputeHash(message);
        var computedSignature = Convert.ToBase64String(hash);
        return computedSignature == signature;
    }

    public async Task<Order> ProcessOrderWebhookAsync(ShopifyOrderDto shopifyOrder)
    {
        var existingOrder = await _orderRepository.GetByShopifyOrderIdAsync(shopifyOrder.Id);
        
        if (existingOrder != null)
        {
            existingOrder.Status = shopifyOrder.FulfillmentStatus ?? "Pending";
            existingOrder.UpdatedAt = DateTime.UtcNow;
            await _orderRepository.UpdateAsync(existingOrder);
            return existingOrder;
        }

        var order = new Order
        {
            OrderId = Guid.NewGuid(),
            ShopifyOrderId = shopifyOrder.Id,
            OrderDate = shopifyOrder.CreatedAt ?? DateTime.UtcNow,
            CustomerName = $"{shopifyOrder.Customer?.FirstName} {shopifyOrder.Customer?.LastName}",
            CustomerEmail = shopifyOrder.Customer?.Email ?? string.Empty,
            ShippingAddress = FormatAddress(shopifyOrder.ShippingAddress),
            TotalAmount = decimal.TryParse(shopifyOrder.TotalPrice, out var tp) ? tp : 0m,
            Status = shopifyOrder.FulfillmentStatus ?? "Pending",
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        foreach (var lineItem in shopifyOrder.LineItems)
        {
            var orderItem = new OrderItem
            {
                OrderItemId = Guid.NewGuid(),
                OrderId = order.OrderId,
                VariantId = Guid.NewGuid(),
                Quantity = lineItem.Quantity,
                PriceAtPurchase = lineItem.PriceDecimal
            };
            order.OrderItems.Add(orderItem);
        }

        await _orderRepository.AddAsync(order);
        return order;
    }

    private string FormatAddress(ShopifyAddressDto? address)
    {
        if (address == null)
            return string.Empty;

        return $"{address.Address1}, {address.City}, {address.Province} {address.PostalCode}, {address.Country}";
    }
}
