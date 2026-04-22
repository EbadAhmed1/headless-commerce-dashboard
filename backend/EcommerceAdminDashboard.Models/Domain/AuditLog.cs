namespace EcommerceAdminDashboard.Models.Domain;

public class AuditLog
{
    public Guid AuditLogId { get; set; }
    public Guid UserId { get; set; }
    public string Action { get; set; } = string.Empty;
    public string EntityType { get; set; } = string.Empty;
    public string EntityId { get; set; } = string.Empty;
    public string Changes { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}