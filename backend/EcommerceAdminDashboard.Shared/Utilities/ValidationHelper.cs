using System.Text.RegularExpressions;

namespace EcommerceAdminDashboard.Shared.Utilities;

public static class ValidationHelper
{
    public static bool IsValidEmail(string email)
    {
        try
        {
            var addr = new System.Net.Mail.MailAddress(email);
            return addr.Address == email;
        }
        catch
        {
            return false;
        }
    }

    public static bool IsValidPhoneNumber(string phoneNumber)
    {
        return Regex.IsMatch(phoneNumber, @"^\d{10,}$");
    }

    public static bool IsValidPrice(decimal price)
    {
        return price > 0;
    }

    public static bool IsValidQuantity(int quantity)
    {
        return quantity > 0;
    }

    public static bool IsNullOrEmpty(string? value)
    {
        return string.IsNullOrWhiteSpace(value);
    }
}
