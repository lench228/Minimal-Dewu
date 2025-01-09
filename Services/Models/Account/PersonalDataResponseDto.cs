namespace Services.Models.Account;

public class PersonalDataResponseDto
{
    public string Email { get; set; } = null!;
    public string? Phone { get; set; } = null!;
    public string? FullName { get; set; } = null!;
}