using EcommerceAdminDashboard.Data.Repositories;
using EcommerceAdminDashboard.Models.Domain;
using EcommerceAdminDashboard.Services.Interfaces;

namespace EcommerceAdminDashboard.Services.Implementations;

public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;

    public ProductService(IProductRepository productRepository)
    {
        _productRepository = productRepository;
    }

    public async Task<Product?> GetProductAsync(Guid productId)
    {
        return await _productRepository.GetProductWithVariantsAsync(productId);
    }

    public async Task<IEnumerable<Product>> GetProductsAsync()
    {
        return await _productRepository.GetAllAsync();
    }

    public async Task<IEnumerable<Product>> GetActiveProductsAsync()
    {
        return await _productRepository.GetActiveProductsAsync();
    }

    public async Task<Product> CreateProductAsync(Product product)
    {
        product.ProductId = Guid.NewGuid();
        product.CreatedAt = DateTime.UtcNow;
        product.UpdatedAt = DateTime.UtcNow;
        await _productRepository.AddAsync(product);
        return product;
    }

    public async Task<Product?> UpdateProductAsync(Guid productId, Product product)
    {
        var existingProduct = await _productRepository.GetByIdAsync(productId);
        if (existingProduct == null)
            return null;

        existingProduct.Name = product.Name;
        existingProduct.Description = product.Description;
        existingProduct.BasePrice = product.BasePrice;
        existingProduct.IsActive = product.IsActive;
        existingProduct.UpdatedAt = DateTime.UtcNow;
        await _productRepository.UpdateAsync(existingProduct);
        return existingProduct;
    }

    public async Task<bool> DeleteProductAsync(Guid productId)
    {
        var product = await _productRepository.GetByIdAsync(productId);
        if (product == null)
            return false;

        await _productRepository.DeleteAsync(product);
        return true;
    }

    public async Task<IEnumerable<Product>> SearchProductsAsync(string query)
    {
        return await _productRepository.SearchProductsAsync(query);
    }
}
