using Services.Helpers.ApiResponseBuilder;
using Services.Models.Account;

namespace Services.Abstractions;

public interface IAccountService
{
    public Task<JsonApiResponse> UpdateUserAccountDataAsync(UpdateAccountDataRequestDto request);
    public Task<JsonApiResponse<AccountDataResponseDto>> GetUserAccountDataAsync();
}