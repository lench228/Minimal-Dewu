namespace Services.Models.Auth;

public class CreateUserRequestDto
{
    public required string Email { get; init; }
    public required string Password { get; init; }
}