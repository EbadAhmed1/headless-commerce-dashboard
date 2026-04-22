using EcommerceAdminDashboard.Models.Domain;

namespace EcommerceAdminDashboard.Services.Interfaces;

public interface IProductService
{
    Task<Product?> GetProductAsync(Guid productId);
    Task<IEnumerable<Product>> GetProductsAsync();
    Task<IEnumerable<Product>> GetActiveProductsAsync();
    Task<Product> CreateProductAsync(Product product);
    Task<Product?> UpdateProductAsync(Guid productId, Product product);
    Task<bool> DeleteProductAsync(Guid productId);
    Task<IEnumerable<Product>> SearchProductsAsync(string query);
}
