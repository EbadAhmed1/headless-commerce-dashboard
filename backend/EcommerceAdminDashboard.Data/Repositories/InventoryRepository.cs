using Microsoft.EntityFrameworkCore;
using EcommerceAdminDashboard.Models.Domain;

namespace EcommerceAdminDashboard.Data.Repositories;

public class InventoryRepository : Repository<Inventory>, IInventoryRepository
{
    private readonly ApplicationDbContext _context;

    public InventoryRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<Inventory?> GetInventoryByVariantAndBinAsync(Guid variantId, Guid binId)
    {
        return await _context.Inventory
            .FirstOrDefaultAsync(i => i.VariantId == variantId && i.BinId == binId);
    }

    public async Task<IEnumerable<Inventory>> GetInventoryByVariantAsync(Guid variantId)
    {
        return await _context.Inventory
            .Where(i => i.VariantId == variantId)
            .Include(i => i.Bin)
            .ToListAsync();
    }

    public async Task<IEnumerable<Inventory>> GetLowStockItemsAsync(int threshold)
    {
        return await _context.Inventory
            .Where(i => i.Quantity <= threshold)
            .Include(i => i.Variant)
            .ThenInclude(v => v.Product)
            .Include(i => i.Bin)
            .ToListAsync();
    }

    public async Task<int> GetTotalQuantityByVariantAsync(Guid variantId)
    {
        return await _context.Inventory
            .Where(i => i.VariantId == variantId)
            .SumAsync(i => i.Quantity);
    }
}
