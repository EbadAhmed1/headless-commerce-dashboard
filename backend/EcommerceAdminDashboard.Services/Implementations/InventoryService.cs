using EcommerceAdminDashboard.Data.Repositories;
using EcommerceAdminDashboard.Models.Domain;
using EcommerceAdminDashboard.Services.Interfaces;

namespace EcommerceAdminDashboard.Services.Implementations;

public class InventoryService : IInventoryService
{
    private readonly IInventoryRepository _inventoryRepository;

    public InventoryService(IInventoryRepository inventoryRepository)
    {
        _inventoryRepository = inventoryRepository;
    }

    public async Task<Inventory?> GetInventoryAsync(Guid inventoryId)
    {
        return await _inventoryRepository.GetByIdAsync(inventoryId);
    }

    public async Task<IEnumerable<Inventory>> GetInventoryByVariantAsync(Guid variantId)
    {
        return await _inventoryRepository.GetInventoryByVariantAsync(variantId);
    }

    public async Task<int> GetTotalQuantityByVariantAsync(Guid variantId)
    {
        return await _inventoryRepository.GetTotalQuantityByVariantAsync(variantId);
    }

    public async Task<IEnumerable<Inventory>> GetLowStockItemsAsync(int threshold = 10)
    {
        return await _inventoryRepository.GetLowStockItemsAsync(threshold);
    }

    public async Task<bool> DeductInventoryAsync(Guid variantId, Guid binId, int quantity)
    {
        var inventory = await _inventoryRepository.GetInventoryByVariantAndBinAsync(variantId, binId);
        if (inventory == null || inventory.Quantity < quantity)
            return false;

        inventory.Quantity -= quantity;
        inventory.LastUpdated = DateTime.UtcNow;
        await _inventoryRepository.UpdateAsync(inventory);
        return true;
    }

    public async Task<bool> AddInventoryAsync(Guid variantId, Guid binId, int quantity)
    {
        var inventory = await _inventoryRepository.GetInventoryByVariantAndBinAsync(variantId, binId);
        
        if (inventory == null)
        {
            inventory = new Inventory
            {
                InventoryId = Guid.NewGuid(),
                VariantId = variantId,
                BinId = binId,
                Quantity = quantity,
                LastUpdated = DateTime.UtcNow
            };
            await _inventoryRepository.AddAsync(inventory);
        }
        else
        {
            inventory.Quantity += quantity;
            inventory.LastUpdated = DateTime.UtcNow;
            await _inventoryRepository.UpdateAsync(inventory);
        }

        return true;
    }

    public async Task<bool> TransferInventoryAsync(Guid variantId, Guid fromBinId, Guid toBinId, int quantity)
    {
        var deducted = await DeductInventoryAsync(variantId, fromBinId, quantity);
        if (!deducted)
            return false;

        return await AddInventoryAsync(variantId, toBinId, quantity);
    }
}
