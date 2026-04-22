using EcommerceAdminDashboard.Data.Repositories;
using EcommerceAdminDashboard.Models.Domain;
using EcommerceAdminDashboard.Models.DTOs;
using EcommerceAdminDashboard.Services.Interfaces;

namespace EcommerceAdminDashboard.Services.Implementations;

public class OrderService : IOrderService
{
    private readonly IOrderRepository _orderRepository;

    public OrderService(IOrderRepository orderRepository)
    {
        _orderRepository = orderRepository;
    }

    public async Task<Order?> GetOrderAsync(Guid orderId)
    {
        return await _orderRepository.GetOrderWithItemsAsync(orderId);
    }

    public async Task<IEnumerable<Order>> GetOrdersAsync(int skip = 0, int take = 10)
    {
        return await _orderRepository.GetOrdersAsync(skip, take);
    }

    public async Task<Order> CreateOrderAsync(CreateOrderDto dto)
    {
        var order = new Order
        {
            OrderId = Guid.NewGuid(),
            OrderDate = DateTime.UtcNow,
            CustomerName = dto.CustomerName,
            CustomerEmail = dto.CustomerEmail,
            ShippingAddress = dto.ShippingAddress,
            TotalAmount = dto.OrderItems.Sum(oi => oi.PriceAtPurchase * oi.Quantity),
            Status = "Pending",
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        foreach (var item in dto.OrderItems)
        {
            order.OrderItems.Add(new OrderItem
            {
                OrderItemId = Guid.NewGuid(),
                OrderId = order.OrderId,
                VariantId = item.VariantId,
                Quantity = item.Quantity,
                PriceAtPurchase = item.PriceAtPurchase
            });
        }

        await _orderRepository.AddAsync(order);
        return order;
    }

    public async Task<Order?> UpdateOrderStatusAsync(Guid orderId, string newStatus)
    {
        var order = await _orderRepository.GetByIdAsync(orderId);
        if (order == null)
            return null;

        order.Status = newStatus;
        order.UpdatedAt = DateTime.UtcNow;
        await _orderRepository.UpdateAsync(order);
        return order;
    }

    public async Task<IEnumerable<Order>> GetOrdersByStatusAsync(string status)
    {
        return await _orderRepository.GetOrdersByStatusAsync(status);
    }

    public async Task<IEnumerable<Order>> GetOrdersByCustomerEmailAsync(string email)
    {
        return await _orderRepository.GetOrdersByCustomerEmailAsync(email);
    }

    public async Task<Order> CreateOrderFromShopifyAsync(ShopifyOrderDto shopifyOrder)
    {
        var order = new Order
        {
            OrderId = Guid.NewGuid(),
            OrderDate = shopifyOrder.CreatedAt ?? DateTime.UtcNow,
            CustomerName = shopifyOrder.Email,
            CustomerEmail = shopifyOrder.Email,
            ShippingAddress = shopifyOrder.ShippingAddress != null
                ? $"{shopifyOrder.ShippingAddress.Address1}, {shopifyOrder.ShippingAddress.City}, {shopifyOrder.ShippingAddress.Province}, {shopifyOrder.ShippingAddress.Country}"
                : string.Empty,
            TotalAmount = shopifyOrder.TotalPrice ?? 0m,
            Status = shopifyOrder.FinancialStatus,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        foreach (var item in shopifyOrder.LineItems)
        {
            order.OrderItems.Add(new OrderItem
            {
                OrderItemId = Guid.NewGuid(),
                OrderId = order.OrderId,
                Quantity = item.Quantity,
                PriceAtPurchase = item.Price ?? 0m
            });
        }

        await _orderRepository.AddAsync(order);
        return order;
    }
}
