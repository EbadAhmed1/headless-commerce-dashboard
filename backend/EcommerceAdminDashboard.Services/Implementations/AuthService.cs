using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using EcommerceAdminDashboard.Data.Repositories;
using EcommerceAdminDashboard.Models.Domain;
using EcommerceAdminDashboard.Services.Interfaces;

namespace EcommerceAdminDashboard.Services.Implementations;

public class AuthService : IAuthService
{
    private readonly IRepository<User> _userRepository;
    private readonly string _jwtSecret;
    private readonly string _jwtIssuer;
    private readonly string _jwtAudience;

    public AuthService(IRepository<User> userRepository, string jwtSecret, string jwtIssuer, string jwtAudience)
    {
        _userRepository = userRepository;
        _jwtSecret = jwtSecret;
        _jwtIssuer = jwtIssuer;
        _jwtAudience = jwtAudience;
    }

    public async Task<User?> AuthenticateAsync(string email, string password)
    {
        var users = await _userRepository.GetAllAsync();
        var user = users.FirstOrDefault(u => u.Email == email);

        if (user == null || !VerifyPasswordHash(password, user.PasswordHash))
            return null;

        return user;
    }

    public async Task<User> RegisterAsync(string email, string password, string firstName, string lastName)
    {
        var user = new User
        {
            UserId = Guid.NewGuid(),
            Email = email,
            PasswordHash = HashPassword(password),
            FirstName = firstName,
            LastName = lastName,
            IsActive = true,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        await _userRepository.AddAsync(user);
        return user;
    }

    public async Task<bool> VerifyPasswordAsync(string password, string hash)
    {
        return await Task.FromResult(VerifyPasswordHash(password, hash));
    }

    public string GenerateJwtToken(User user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_jwtSecret);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.GivenName, user.FirstName),
                new Claim(ClaimTypes.Surname, user.LastName)
            }),
            Expires = DateTime.UtcNow.AddHours(24),
            Issuer = _jwtIssuer,
            Audience = _jwtAudience,
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    public async Task<User?> GetUserByEmailAsync(string email)
    {
        var users = await _userRepository.GetAllAsync();
        return users.FirstOrDefault(u => u.Email == email);
    }

    private string HashPassword(string password)
    {
        return BCrypt.Net.BCrypt.HashPassword(password);
    }

    private bool VerifyPasswordHash(string password, string hash)
    {
        return BCrypt.Net.BCrypt.Verify(password, hash);
    }
}
