using Microsoft.EntityFrameworkCore;
using EcommerceAdminDashboard.Models.Domain;

namespace EcommerceAdminDashboard.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();
    public DbSet<Role> Roles => Set<Role>();
    public DbSet<UserRole> UserRoles => Set<UserRole>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<ProductAttribute> ProductAttributes => Set<ProductAttribute>();
    public DbSet<ProductAttributeValue> ProductAttributeValues => Set<ProductAttributeValue>();
    public DbSet<Variant> Variants => Set<Variant>();
    public DbSet<VariantAttributeValue> VariantAttributeValues => Set<VariantAttributeValue>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();
    public DbSet<Inventory> Inventory => Set<Inventory>();
    public DbSet<WarehouseBin> WarehouseBins => Set<WarehouseBin>();
    public DbSet<AuditLog> AuditLogs => Set<AuditLog>();
    public DbSet<ShippingLabel> ShippingLabels => Set<ShippingLabel>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId);
            entity.HasIndex(e => e.Email).IsUnique();
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RoleId);
        });

        modelBuilder.Entity<UserRole>(entity =>
        {
            entity.HasKey(e => e.UserRoleId);
            entity.HasOne(e => e.User).WithMany(u => u.UserRoles).HasForeignKey(e => e.UserId);
            entity.HasOne(e => e.Role).WithMany(r => r.UserRoles).HasForeignKey(e => e.RoleId);
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.ProductId);
        });

        modelBuilder.Entity<ProductAttribute>(entity =>
        {
            entity.HasKey(e => e.AttributeId);
            entity.HasOne(e => e.Product).WithMany(p => p.ProductAttributes).HasForeignKey(e => e.ProductId);
        });

        modelBuilder.Entity<ProductAttributeValue>(entity =>
        {
            entity.HasKey(e => e.AttributeValueId);
            entity.HasOne(e => e.Attribute).WithMany(a => a.AttributeValues).HasForeignKey(e => e.AttributeId);
        });

        modelBuilder.Entity<Variant>(entity =>
        {
            entity.HasKey(e => e.VariantId);
            entity.HasOne(e => e.Product).WithMany(p => p.Variants).HasForeignKey(e => e.ProductId);
        });

        modelBuilder.Entity<VariantAttributeValue>(entity =>
        {
            entity.HasKey(e => e.VariantAttributeValueId);
            entity.HasOne(e => e.Variant).WithMany(v => v.VariantAttributeValues).HasForeignKey(e => e.VariantId);
            entity.HasOne(e => e.ProductAttributeValue).WithMany(pav => pav.VariantAttributeValues).HasForeignKey(e => e.AttributeValueId);
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.OrderId);
        });

        modelBuilder.Entity<OrderItem>(entity =>
        {
            entity.HasKey(e => e.OrderItemId);
            entity.HasOne(e => e.Order).WithMany(o => o.OrderItems).HasForeignKey(e => e.OrderId);
            entity.HasOne(e => e.Variant).WithMany(v => v.OrderItems).HasForeignKey(e => e.VariantId);
        });

        modelBuilder.Entity<Inventory>(entity =>
        {
            entity.HasKey(e => e.InventoryId);
            entity.HasOne(e => e.Variant).WithMany(v => v.Inventory).HasForeignKey(e => e.VariantId);
            entity.HasOne(e => e.Bin).WithMany(b => b.Inventory).HasForeignKey(e => e.BinId);
        });

        modelBuilder.Entity<WarehouseBin>(entity =>
        {
            entity.HasKey(e => e.BinId);
        });

        modelBuilder.Entity<AuditLog>(entity =>
        {
            entity.HasKey(e => e.AuditLogId);
        });

        modelBuilder.Entity<ShippingLabel>(entity =>
        {
            entity.HasKey(e => e.ShippingLabelId);
            entity.HasOne(e => e.Order).WithMany().HasForeignKey(e => e.OrderId);
        });
    }
}
