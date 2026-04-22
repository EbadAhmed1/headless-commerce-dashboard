using EcommerceAdminDashboard.Models.Domain;

namespace EcommerceAdminDashboard.Services.Interfaces;

public interface IAuthService
{
    Task<User?> AuthenticateAsync(string email, string password);
    Task<User> RegisterAsync(string email, string password, string firstName, string lastName);
    Task<bool> VerifyPasswordAsync(string password, string hash);
    string GenerateJwtToken(User user);
    Task<User?> GetUserByEmailAsync(string email);
}
