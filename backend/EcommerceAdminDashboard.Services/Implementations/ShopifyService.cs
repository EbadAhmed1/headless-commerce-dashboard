using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using EcommerceAdminDashboard.Models.DTOs;
using EcommerceAdminDashboard.Services.Interfaces;

namespace EcommerceAdminDashboard.Services.Implementations
{
    public class ShopifyService : IShopifyService
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<ShopifyService> _logger;
        private readonly OrderService _orderService;
        private readonly HttpClient _httpClient;
        private static readonly JsonSerializerOptions JsonOptions = new()
        {
            PropertyNameCaseInsensitive = true,
            PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower
        };

        public ShopifyService(
            IConfiguration configuration,
            ILogger<ShopifyService> logger,
            OrderService orderService,
            HttpClient httpClient)
        {
            _configuration = configuration;
            _logger = logger;
            _orderService = orderService;
            _httpClient = httpClient;

            var accessToken = configuration["Shopify:AccessToken"] ?? string.Empty;
            var storeUrl = configuration["Shopify:StoreUrl"] ?? string.Empty;
            var apiVersion = configuration["Shopify:ApiVersion"] ?? "2024-01";
            _httpClient.BaseAddress = new Uri($"https://{storeUrl}/admin/api/{apiVersion}/");
            _httpClient.DefaultRequestHeaders.Add("X-Shopify-Access-Token", accessToken);
        }

        public async Task<List<ShopifyOrderDto>> GetOrdersAsync()
        {
            try
            {
                var response = await _httpClient.GetAsync("orders.json");
                response.EnsureSuccessStatusCode();
                var json = await response.Content.ReadAsStringAsync();
                using var doc = JsonDocument.Parse(json);
                var ordersJson = doc.RootElement.GetProperty("orders").GetRawText();
                return JsonSerializer.Deserialize<List<ShopifyOrderDto>>(ordersJson, JsonOptions) ?? new();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error fetching Shopify orders: {ex.Message}");
                throw;
            }
        }

        public async Task<ShopifyOrderDto> GetOrderByIdAsync(long orderId)
        {
            try
            {
                var response = await _httpClient.GetAsync($"orders/{orderId}.json");
                response.EnsureSuccessStatusCode();
                var json = await response.Content.ReadAsStringAsync();
                using var doc = JsonDocument.Parse(json);
                var orderJson = doc.RootElement.GetProperty("order").GetRawText();
                return JsonSerializer.Deserialize<ShopifyOrderDto>(orderJson, JsonOptions)
                    ?? throw new InvalidOperationException($"Failed to deserialize order {orderId}");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error fetching Shopify order {orderId}: {ex.Message}");
                throw;
            }
        }

        public async Task<List<ShopifyProductDto>> GetProductsAsync()
        {
            try
            {
                var response = await _httpClient.GetAsync("products.json");
                response.EnsureSuccessStatusCode();
                var json = await response.Content.ReadAsStringAsync();
                using var doc = JsonDocument.Parse(json);
                var productsJson = doc.RootElement.GetProperty("products").GetRawText();
                return JsonSerializer.Deserialize<List<ShopifyProductDto>>(productsJson, JsonOptions) ?? new();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error fetching Shopify products: {ex.Message}");
                throw;
            }
        }

        public async Task<ShopifyProductDto> GetProductByIdAsync(long productId)
        {
            try
            {
                var response = await _httpClient.GetAsync($"products/{productId}.json");
                response.EnsureSuccessStatusCode();
                var json = await response.Content.ReadAsStringAsync();
                using var doc = JsonDocument.Parse(json);
                var productJson = doc.RootElement.GetProperty("product").GetRawText();
                return JsonSerializer.Deserialize<ShopifyProductDto>(productJson, JsonOptions)
                    ?? throw new InvalidOperationException($"Failed to deserialize product {productId}");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error fetching Shopify product {productId}: {ex.Message}");
                throw;
            }
        }

        public bool ValidateWebhook(string requestBody, string hmacHeader)
        {
            try
            {
                var secret = _configuration["Shopify:WebhookSecret"] ?? string.Empty;
                var data = Encoding.UTF8.GetBytes(requestBody);
                var key = Encoding.UTF8.GetBytes(secret);

                using var hmac = new HMACSHA256(key);
                var hash = hmac.ComputeHash(data);
                var hashBase64 = Convert.ToBase64String(hash);
                return hashBase64 == hmacHeader;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error validating webhook: {ex.Message}");
                return false;
            }
        }

        public async Task<ShopifyOrderDto> ProcessWebhookOrderAsync(string requestBody)
        {
            try
            {
                using var jsonDocument = JsonDocument.Parse(requestBody);
                var root = jsonDocument.RootElement;

                var orderId = root.GetProperty("id").GetInt64();
                var order = await GetOrderByIdAsync(orderId);

                await _orderService.CreateOrderFromShopifyAsync(order);

                _logger.LogInformation($"Processed Shopify order webhook: {orderId}");
                return order;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error processing webhook order: {ex.Message}");
                throw;
            }
        }

        public async Task UpdateOrderStatusAsync(long orderId, string status)
        {
            try
            {
                var payload = JsonSerializer.Serialize(new
                {
                    order = new { id = orderId, note = $"Status updated to {status}" }
                });
                var content = new StringContent(payload, Encoding.UTF8, "application/json");
                var response = await _httpClient.PutAsync($"orders/{orderId}.json", content);
                response.EnsureSuccessStatusCode();
                _logger.LogInformation($"Updated Shopify order {orderId} status to {status}");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error updating order status: {ex.Message}");
                throw;
            }
        }
    }
}