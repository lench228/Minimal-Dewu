namespace Services.Models.Auth;

public class LogInResponseDto
{
    public required string AccessToken { get; init; }
    public required string RefreshToken { get; init; }
}