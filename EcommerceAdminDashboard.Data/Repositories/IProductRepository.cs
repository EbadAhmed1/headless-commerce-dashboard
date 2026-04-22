using EcommerceAdminDashboard.Models.Domain;

namespace EcommerceAdminDashboard.Data.Repositories;

public interface IProductRepository : IRepository<Product>
{
    Task<Product?> GetProductWithVariantsAsync(Guid productId);
    Task<IEnumerable<Product>> GetActiveProductsAsync();
    Task<Product?> GetByShopifyProductIdAsync(string shopifyProductId);
    Task<IEnumerable<Product>> SearchProductsAsync(string query);
}
