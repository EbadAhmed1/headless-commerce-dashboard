namespace EcommerceAdminDashboard.Shared.Utilities;

public static class DateTimeHelper
{
    public static DateTime GetUtcNow() => DateTime.UtcNow;

    public static DateTime ConvertToUtc(DateTime dateTime) => dateTime.ToUniversalTime();

    public static string FormatDate(DateTime dateTime, string format = "yyyy-MM-dd HH:mm:ss")
    {
        return dateTime.ToString(format);
    }

    public static bool IsWithinRange(DateTime dateTime, DateTime startDate, DateTime endDate)
    {
        return dateTime >= startDate && dateTime <= endDate;
    }
}
