using EcommerceAdminDashboard.Models.Domain;

namespace EcommerceAdminDashboard.Services.Interfaces;

public interface IInventoryService
{
    Task<Inventory?> GetInventoryAsync(Guid inventoryId);
    Task<IEnumerable<Inventory>> GetInventoryByVariantAsync(Guid variantId);
    Task<int> GetTotalQuantityByVariantAsync(Guid variantId);
    Task<IEnumerable<Inventory>> GetLowStockItemsAsync(int threshold = 10);
    Task<bool> DeductInventoryAsync(Guid variantId, Guid binId, int quantity);
    Task<bool> AddInventoryAsync(Guid variantId, Guid binId, int quantity);
    Task<bool> TransferInventoryAsync(Guid variantId, Guid fromBinId, Guid toBinId, int quantity);
}
