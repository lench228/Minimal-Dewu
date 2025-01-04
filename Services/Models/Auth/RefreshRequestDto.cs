namespace Services.Models.Auth;

public class RefreshRequestDto
{
    public required string RefreshToken { get; init; }
}