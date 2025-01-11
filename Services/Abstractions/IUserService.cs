using Services.Helpers.ApiResponseBuilder;
using Services.Models.Auth;

namespace Services.Abstractions;

public interface IUserService
{
    Task<JsonApiResponse<RegisterResponseDto>> CreateUserAsync(CreateUserRequestDto request);
    Task<JsonApiResponse<LogInResponseDto>> LogInUserAsync(LogInRequestDto request);
    Task<JsonApiResponse<RefreshResponseDto>> RefreshUserTokenAsync(RefreshRequestDto request);
}