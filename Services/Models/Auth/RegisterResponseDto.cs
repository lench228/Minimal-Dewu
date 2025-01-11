namespace Services.Models.Auth;

public class RegisterResponseDto
{
    public required string AccessToken { get; init; }
    public required string RefreshToken { get; init; }
}