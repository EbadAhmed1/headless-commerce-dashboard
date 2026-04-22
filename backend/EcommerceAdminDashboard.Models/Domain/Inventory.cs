namespace EcommerceAdminDashboard.Models.Domain;

public class Inventory
{
    public Guid InventoryId { get; set; }
    public Guid VariantId { get; set; }
    public Guid BinId { get; set; }
    public int Quantity { get; set; }
    public DateTime LastUpdated { get; set; }

    public Variant? Variant { get; set; }
    public WarehouseBin? Bin { get; set; }
}