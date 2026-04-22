using EcommerceAdminDashboard.Models.Domain;

namespace EcommerceAdminDashboard.Data.Repositories;

public interface IInventoryRepository : IRepository<Inventory>
{
    Task<Inventory?> GetInventoryByVariantAndBinAsync(Guid variantId, Guid binId);
    Task<IEnumerable<Inventory>> GetInventoryByVariantAsync(Guid variantId);
    Task<IEnumerable<Inventory>> GetLowStockItemsAsync(int threshold);
    Task<int> GetTotalQuantityByVariantAsync(Guid variantId);
}
