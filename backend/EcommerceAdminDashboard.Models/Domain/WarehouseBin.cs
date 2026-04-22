namespace EcommerceAdminDashboard.Models.Domain;

public class WarehouseBin
{
    public Guid BinId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string LocationDescription { get; set; } = string.Empty;
    public int Capacity { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; }

    public ICollection<Inventory> Inventory { get; set; } = new List<Inventory>();
}