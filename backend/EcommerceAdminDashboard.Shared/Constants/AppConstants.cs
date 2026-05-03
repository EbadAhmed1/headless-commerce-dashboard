namespace EcommerceAdminDashboard.Shared.Constants;

public static class AppConstants
{
    public const string ApiVersion = "1.0.0";
    public const string ApplicationName = "Ecommerce Admin Dashboard";
    
    public static class OrderStatus
    {
        public const string Pending = "Pending";
        public const string Processing = "Processing";
        public const string Shipped = "Shipped";
        public const string Delivered = "Delivered";
        public const string Cancelled = "Cancelled";
        public const string Refunded = "Refunded";
    }

    public static class UserRoles
    {
        public const string Admin = "Admin";
        public const string Manager = "Manager";
        public const string Operator = "Operator";
        public const string Viewer = "Viewer";
    }

    public static class ErrorMessages
    {
        public const string OrderNotFound = "Order not found.";
        public const string ProductNotFound = "Product not found.";
        public const string InvalidCredentials = "Invalid email or password.";
        public const string UnauthorizedAccess = "Unauthorized access.";
        public const string InsufficientInventory = "Insufficient inventory.";
    }
}
