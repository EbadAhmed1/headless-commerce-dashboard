using Microsoft.EntityFrameworkCore;
using EcommerceAdminDashboard.Models.Domain;

namespace EcommerceAdminDashboard.Data.Repositories;

public class ProductRepository : Repository<Product>, IProductRepository
{
    private readonly ApplicationDbContext _context;

    public ProductRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<Product?> GetProductWithVariantsAsync(Guid productId)
    {
        return await _context.Products
            .Include(p => p.Variants)
            .Include(p => p.ProductAttributes)
            .FirstOrDefaultAsync(p => p.ProductId == productId);
    }

    public async Task<IEnumerable<Product>> GetActiveProductsAsync()
    {
        return await _context.Products
            .Where(p => p.IsActive)
            .OrderBy(p => p.Name)
            .ToListAsync();
    }

    public async Task<Product?> GetByShopifyProductIdAsync(string shopifyProductId)
    {
        return await _context.Products
            .FirstOrDefaultAsync(p => p.ShopifyProductId == shopifyProductId);
    }

    public async Task<IEnumerable<Product>> SearchProductsAsync(string query)
    {
        return await _context.Products
            .Where(p => p.Name.Contains(query) || p.Description.Contains(query))
            .OrderBy(p => p.Name)
            .ToListAsync();
    }
}
