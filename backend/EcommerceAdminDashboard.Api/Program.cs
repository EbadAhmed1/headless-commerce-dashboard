using EcommerceAdminDashboard.Api.GraphQL;
using EcommerceAdminDashboard.Data;
using EcommerceAdminDashboard.Data.Repositories;
using EcommerceAdminDashboard.Data.Seeders;
using EcommerceAdminDashboard.Models.Domain;
using EcommerceAdminDashboard.Services.Implementations;
using EcommerceAdminDashboard.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Database
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Repositories
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IInventoryRepository, InventoryRepository>();

// Application services
builder.Services.AddScoped<OrderService>();
builder.Services.AddScoped<IOrderService>(sp => sp.GetRequiredService<OrderService>());
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IInventoryService, InventoryService>();
builder.Services.AddScoped<IAuthService>(sp =>
{
    var config = sp.GetRequiredService<IConfiguration>();
    var userRepo = sp.GetRequiredService<IRepository<User>>();
    return new AuthService(
        userRepo,
        config["Jwt:Secret"] ?? throw new InvalidOperationException("Jwt:Secret is not configured"),
        config["Jwt:Issuer"] ?? "EcommerceAdminDashboard",
        config["Jwt:Audience"] ?? "EcommerceAdminDashboardUsers");
});
builder.Services.AddHttpClient<IShopifyService, ShopifyService>();

// Shopify Webhook Service (Updated with validation)
builder.Services.AddScoped<ShopifyWebhookService>(provider => 
{
    var orderRepo = provider.GetRequiredService<IOrderRepository>();
    var productRepo = provider.GetRequiredService<IProductRepository>();
    var configuration = provider.GetRequiredService<IConfiguration>();
    
    var secret = configuration["Shopify:WebhookSecret"] ?? string.Empty;
    
    return new ShopifyWebhookService(orderRepo, productRepo, secret);
});

// CORS
var corsSettings = builder.Configuration.GetSection("Cors");
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(corsSettings.GetSection("AllowedOrigins").Get<string[]>() ?? ["http://localhost:3000"])
              .WithMethods(corsSettings.GetSection("AllowedMethods").Get<string[]>() ?? ["GET", "POST"])
              .WithHeaders(corsSettings.GetSection("AllowedHeaders").Get<string[]>() ?? ["Content-Type", "Authorization"])
              .AllowCredentials();
    });
});

// GraphQL (HotChocolate)
builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>()
    .AddFiltering()
    .AddSorting()
    .AddProjections()
    .ModifyCostOptions(o => o.MaxFieldCost = 10000);

// Controllers (for webhook endpoints)
builder.Services.AddControllers();

builder.Services.AddOpenApi();
builder.Services.AddScoped<DatabaseSeeder>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    
    // Apply migrations and seed the database
    using var scope = app.Services.CreateScope();
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    context.Database.Migrate();
    
    var seeder = scope.ServiceProvider.GetRequiredService<DatabaseSeeder>();
    await seeder.SeedAsync();
}

app.UseCors();

app.UseHttpsRedirection();

app.MapControllers();
app.MapGraphQL();

app.Run();