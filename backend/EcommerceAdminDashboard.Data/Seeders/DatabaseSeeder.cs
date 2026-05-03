using EcommerceAdminDashboard.Models.Domain;

namespace EcommerceAdminDashboard.Data.Seeders;

public class DatabaseSeeder
{
    private readonly ApplicationDbContext _context;

    public DatabaseSeeder(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task SeedAsync()
    {
        if (_context.Users.Any())
            return;

        await SeedRoles();
        await SeedUsers();
        await SeedProducts();
        await SeedVariants();
        await SeedWarehouseBins();
        await SeedInventory();
        await SeedOrders();

        await _context.SaveChangesAsync();
    }

    private async Task SeedVariants()
    {
        var products = _context.Products.Local.ToList();
        if (products.Count == 0)
            return;

        var variants = new List<Variant>
        {
            new()
            {
                VariantId = Guid.NewGuid(),
                ProductId = products[0].ProductId,
                SKU = "TSHIRT-BLACK-M",
                Price = 29.99m,
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new()
            {
                VariantId = Guid.NewGuid(),
                ProductId = products[1].ProductId,
                SKU = "JEANS-BLUE-32",
                Price = 79.99m,
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            }
        };

        await _context.Variants.AddRangeAsync(variants);
    }

    private async Task SeedRoles()
    {
        var roles = new List<Role>
        {
            new() { RoleId = Guid.NewGuid(), Name = "Admin", Description = "Administrator", CreatedAt = DateTime.UtcNow },
            new() { RoleId = Guid.NewGuid(), Name = "Manager", Description = "Manager", CreatedAt = DateTime.UtcNow },
            new() { RoleId = Guid.NewGuid(), Name = "Operator", Description = "Operator", CreatedAt = DateTime.UtcNow }
        };

        await _context.Roles.AddRangeAsync(roles);
    }

    private async Task SeedUsers()
    {
        var users = new List<User>
        {
            new()
            {
                UserId = Guid.NewGuid(),
                Email = "admin@example.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@123"),
                FirstName = "Admin",
                LastName = "User",
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            }
        };

        await _context.Users.AddRangeAsync(users);
    }

    private async Task SeedProducts()
    {
        var products = new List<Product>
        {
            new()
            {
                ProductId = Guid.NewGuid(),
                Name = "Cotton T-Shirt",
                Description = "High-quality cotton t-shirt",
                BasePrice = 29.99m,
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new()
            {
                ProductId = Guid.NewGuid(),
                Name = "Denim Jeans",
                Description = "Classic denim jeans",
                BasePrice = 79.99m,
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            }
        };

        await _context.Products.AddRangeAsync(products);
    }

    private async Task SeedWarehouseBins()
    {
        var bins = new List<WarehouseBin>
        {
            new()
            {
                BinId = Guid.NewGuid(),
                Name = "Bin A1",
                LocationDescription = "Shelf A, Row 1",
                Capacity = 1000,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            },
            new()
            {
                BinId = Guid.NewGuid(),
                Name = "Bin B1",
                LocationDescription = "Shelf B, Row 1",
                Capacity = 1000,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            }
        };

        await _context.WarehouseBins.AddRangeAsync(bins);
    }

    private async Task SeedInventory()
    {
        var variants = _context.Variants.Local.ToList();
        var bins = _context.WarehouseBins.Local.ToList();

        if (variants.Count == 0 || bins.Count == 0)
            return;

        var inventory = new List<Inventory>
        {
            new()
            {
                InventoryId = Guid.NewGuid(),
                VariantId = variants[0].VariantId,
                BinId = bins[0].BinId,
                Quantity = 100,
                LastUpdated = DateTime.UtcNow
            },
            new()
            {
                InventoryId = Guid.NewGuid(),
                VariantId = variants[1].VariantId,
                BinId = bins[1].BinId,
                Quantity = 50,
                LastUpdated = DateTime.UtcNow
            }
        };

        await _context.Inventory.AddRangeAsync(inventory);
    }

    private async Task SeedOrders()
    {
        var orders = new List<Order>
        {
            new()
            {
                OrderId = Guid.NewGuid(),
                OrderDate = DateTime.UtcNow,
                CustomerName = "John Doe",
                CustomerEmail = "john@example.com",
                ShippingAddress = "123 Main St, City, State 12345",
                TotalAmount = 99.99m,
                Status = "Pending",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            }
        };

        await _context.Orders.AddRangeAsync(orders);
    }
}
