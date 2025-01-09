using System.ComponentModel.DataAnnotations;

namespace Services.Models.Auth;

public class CreateUserRequestDto
{
    [EmailAddress]
    public required string Email { get; init; }
    public required string Password { get; init; }
}