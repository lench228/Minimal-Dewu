namespace Services.Models.Account;

public class AccountDataResponseDto
{
    public PersonalDataResponseDto PersonalData { get; set; } = null!;
    public AddressDataResponseDto AddressData { get; set; } = null!;
}