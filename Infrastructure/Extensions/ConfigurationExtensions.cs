using Microsoft.Extensions.Configuration;

namespace Infrastructure.Extensions;

public static class ConfigurationExtensions
{
    public static bool GetApplyMigrations(this IConfiguration config) =>
        bool.Parse(config["APPLY_MIGRATIONS"]!);
    public static string GetOpenAiApiKey(this IConfiguration config) =>
        config["OPEN_AI_API_KEY"]!;
    public static string GetJwtSecretKey(this IConfiguration config) =>
        config["JWT_SECRET_KEY"]!;
    public static TimeSpan GetJwtRefreshTokenLifetime(this IConfiguration config) => 
        TimeSpan.FromHours(int.Parse(config["JWT_REFRESH_LIFETIME_HOURS"]!));
    public static TimeSpan GetJwtAccessTokenLifetime(this IConfiguration config) => 
        TimeSpan.FromSeconds(int.Parse(config["JWT_ACCESS_LIFETIME_SECONDS"]!));
}