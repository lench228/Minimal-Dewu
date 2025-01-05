namespace Services.Models.Auth;

public class RefreshResponseDto
{
    public required string AccessToken { get; init; }
    public required string RefreshToken { get; init; }
}