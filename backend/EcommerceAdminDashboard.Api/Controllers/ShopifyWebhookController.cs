using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using EcommerceAdminDashboard.Models.DTOs;
using EcommerceAdminDashboard.Services.Implementations;

namespace EcommerceAdminDashboard.Api.Controllers;

[ApiController]
[Route("api/webhooks")]
public class ShopifyWebhookController : ControllerBase
{
    private readonly ShopifyWebhookService _webhookService;
    private readonly ILogger<ShopifyWebhookController> _logger;

    public ShopifyWebhookController(ShopifyWebhookService webhookService, ILogger<ShopifyWebhookController> logger)
    {
        _webhookService = webhookService;
        _logger = logger;
    }

    [HttpPost("shopify/orders")]
    public async Task<IActionResult> HandleOrderWebhook()
    {
        try
        {
            var signature = Request.Headers["X-Shopify-Hmac-SHA256"].ToString();
            var body = await new StreamReader(Request.Body).ReadToEndAsync();

            if (!_webhookService.ValidateWebhookSignature(signature, body))
            {
                _logger.LogWarning("Invalid webhook signature received");
                return Unauthorized();
            }

            var shopifyOrder = JsonSerializer.Deserialize<ShopifyOrderDto>(body);
            if (shopifyOrder == null)
                return BadRequest("Invalid order data");

            var order = await _webhookService.ProcessOrderWebhookAsync(shopifyOrder);
            _logger.LogInformation($"Order {order.OrderId} processed from Shopify webhook");

            return Ok(new { success = true, orderId = order.OrderId });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing Shopify webhook");
            return StatusCode(500, new { error = "Internal server error" });
        }
    }

    [HttpPost("shopify/products")]
    public IActionResult HandleProductWebhook()
    {
        try
        {
            var signature = Request.Headers["X-Shopify-Hmac-SHA256"].ToString();
            _logger.LogInformation("Product webhook received");
            return Ok(new { success = true });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing product webhook");
            return StatusCode(500, new { error = "Internal server error" });
        }
    }
}
