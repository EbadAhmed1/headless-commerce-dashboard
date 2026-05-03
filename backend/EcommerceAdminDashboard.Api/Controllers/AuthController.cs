using EcommerceAdminDashboard.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceAdminDashboard.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
            return BadRequest(new { message = "Email and password are required." });

        var user = await _authService.AuthenticateAsync(request.Email, request.Password);
        if (user == null)
            return Unauthorized(new { message = "Invalid email or password." });

        var token = _authService.GenerateJwtToken(user);
        return Ok(new
        {
            token,
            user = new
            {
                user.UserId,
                user.Email,
                user.FirstName,
                user.LastName
            }
        });
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Email) ||
            string.IsNullOrWhiteSpace(request.Password) ||
            string.IsNullOrWhiteSpace(request.FirstName) ||
            string.IsNullOrWhiteSpace(request.LastName))
        {
            return BadRequest(new { message = "All fields are required." });
        }

        var existingUser = await _authService.GetUserByEmailAsync(request.Email);
        if (existingUser != null)
            return Conflict(new { message = "Email is already registered." });

        var user = await _authService.RegisterAsync(request.Email, request.Password, request.FirstName, request.LastName);
        var token = _authService.GenerateJwtToken(user);

        return Ok(new
        {
            token,
            user = new
            {
                user.UserId,
                user.Email,
                user.FirstName,
                user.LastName
            }
        });
    }
}

public class LoginRequest
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

public class RegisterRequest
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
}
