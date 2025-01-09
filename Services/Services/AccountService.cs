using Infrastructure.EfCore;
using Infrastructure.Extensions;
using Services.Abstractions;
using Services.Helpers.ApiResponseBuilder;
using Services.Models.Account;

namespace Services.Services;

internal class AccountService(IUserIdAccessor userIdAccessor, AppDbContext dbContext) : IAccountService
{
    public async Task<JsonApiResponse> UpdateUserAccountDataAsync(UpdateAccountDataRequestDto request)
    {
        var userId = userIdAccessor.GetCurrentUserId();
        var user = await dbContext.Users.GetByIdAsync(userId, true);
        if (request.AddressData != null)
        {
            user!.Address.City = request.AddressData.City;
            user.Address.Street = request.AddressData.Street;
            user.Address.Building = request.AddressData.Building;
            user.Address.Apartment = request.AddressData.Apartment;
        }
        else
        {
            user!.PersonalData.Phone = request.PersonalData!.Phone;
            user.PersonalData.FullName = request.PersonalData.FullName;
        }

        await dbContext.SaveChangesAsync();
        return ApiResponseFactory.Json(o => o.Success());
    }

    public async Task<JsonApiResponse<AccountDataResponseDto>> GetUserAccountDataAsync()
    {
        var userId = userIdAccessor.GetCurrentUserId();
        var user = await dbContext.Users.GetByIdAsync(userId, true);

        var model = new AccountDataResponseDto
        {
            AddressData = new AddressDataResponseDto
            {
                City = user!.Address.City,
                Building = user.Address.Building,
                Street = user.Address.Street,
                Apartment = user.Address.Apartment
            },
            PersonalData = new PersonalDataResponseDto
            {
                Email = user.Email!,
                FullName = user.PersonalData.FullName,
                Phone = user.PersonalData.Phone
            }
        };

        return ApiResponseFactory.Json<AccountDataResponseDto>(o => o
            .Success()
            .Model(model));
    }
}