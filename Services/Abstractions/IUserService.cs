using Services.Helpers.ApiResponseBuilder;
using Services.Models.Auth;

namespace Services.Abstractions;

public interface IUserService
{
    Task<JsonApiResponse<Guid?>> CreateUser(CreateUserRequestDto request);
    Task<JsonApiResponse<LogInResponseDto>> LogInUser(LogInRequestDto request);
    Task<JsonApiResponse<RefreshResponseDto>> RefreshUserToken(RefreshRequestDto request);
}