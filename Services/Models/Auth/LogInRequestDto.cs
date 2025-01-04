namespace Services.Models.Auth;

public class LogInRequestDto
{
    public required string Email { get; set; }
    public required string Password { get; set; }
}