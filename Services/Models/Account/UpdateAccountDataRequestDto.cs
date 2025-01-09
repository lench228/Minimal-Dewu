using System.ComponentModel.DataAnnotations;

namespace Services.Models.Account;

public class UpdateAccountDataRequestDto : IValidatableObject
{
    public UpdateAddressDataRequestDto? AddressData { get; set; }
    public UpdatePersonalDataRequestDto? PersonalData { get; set; }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (!(AddressData != null ^ PersonalData != null))
            return
            [
                new ValidationResult("Only address data or only personal data should be specified",
                    [nameof(PersonalData), nameof(AddressData)])
            ];
        return [];
    }
}