using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Domain.Entities;
using Infrastructure.EfCore;
using Infrastructure.Extensions;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Services.Abstractions;
using Services.Extensions;
using Services.Helpers.ResponseBuilder;
using Services.Models.Auth;

namespace Services.Services;

internal class UserService(UserManager<User> userManager,
    AppDbContext dbContext,
    IConfiguration config,
    IHttpContextAccessor httpContextAccessor) : IUserService
{
    public async Task<JsonApiResponse<Guid>> CreateUser(CreateUserRequestDto request)
    {
        var existingUser = await userManager.FindByEmailAsync(request.Email);
        if (existingUser is not null)
            return ApiResponseFactory.Json<Guid>(o => o.Error(409, "User already exists"));
        var newUser = new User
        {
            UserName = Guid.NewGuid().ToString(),
            Email = request.Email
        };
        await userManager.CreateAsync(newUser, request.Password);
        return ApiResponseFactory.Json<Guid>(o => o
            .Success()
            .Model(newUser.Id));
    }

    public async Task<JsonApiResponse<LogInResponseDto>> LogInUser(LogInRequestDto request)
    {
        var user = await userManager.FindByEmailAsync(request.Email);
        if (user is null)
            return ApiResponseFactory.Json<LogInResponseDto>(o => o.Error(404, "User not found"));

        var passwordValid = await userManager.CheckPasswordAsync(user, request.Password);
        if (!passwordValid)
            return ApiResponseFactory.Json<LogInResponseDto>(o => o.Error(401));

        var refreshToken = GenerateGwtRefreshToken();
        user.RefreshToken = refreshToken;
        user.RefreshTokenExpirationDate = DateTimeOffset.UtcNow.Add(config.GetJwtRefreshTokenLifetime());
        await userManager.UpdateAsync(user);

        var responseModel = new LogInResponseDto
        {
            AccessToken = GenerateGwtAccessToken(user),
            RefreshToken = refreshToken
        };
        return ApiResponseFactory.Json<LogInResponseDto>(o => o
            .Success()
            .Model(responseModel));
    }

    public async Task<JsonApiResponse<RefreshResponseDto>> RefreshUserToken(RefreshRequestDto request)
    {
        var unauthorizedResponse = ApiResponseFactory.Json<RefreshResponseDto>(o => o.Error(401));
        
        var context = httpContextAccessor.HttpContext;
        var token = context?.Request.Headers.Authorization.ToString()[JwtBearerDefaults.AuthenticationScheme.Length..].Trim();
        if (string.IsNullOrWhiteSpace(token))
            return unauthorizedResponse;
        var principal = GetPrincipalFromExpiredToken(token);
        var id = principal.FindFirstValue(ClaimTypes.NameIdentifier);
        if (id is null || !Guid.TryParse(id, out var idGuid))
            return unauthorizedResponse;

        var user = await dbContext.Users.FirstOrDefaultAsync(u => u.Id == idGuid);
        if (user is null)
            return unauthorizedResponse;
        
        if (user.RefreshToken is null ||
            user.RefreshToken != request.RefreshToken ||
            DateTimeOffset.UtcNow > user.RefreshTokenExpirationDate)
            return unauthorizedResponse;
        
        var refreshToken = GenerateGwtRefreshToken();
        user.RefreshToken = refreshToken;
        user.RefreshTokenExpirationDate = DateTimeOffset.UtcNow.Add(config.GetJwtRefreshTokenLifetime());
        await userManager.UpdateAsync(user);
        
        return ApiResponseFactory.Json<RefreshResponseDto>(o => o
            .Success()
            .Model(new RefreshResponseDto
            {
                AccessToken = GenerateGwtAccessToken(user),
                RefreshToken = refreshToken
            }));
    }

    private string GenerateGwtAccessToken(User user)
    {
        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config.GetJwtSecretKey()));

        var token = new JwtSecurityToken(
            expires: DateTime.UtcNow.Add(config.GetJwtAccessTokenLifetime()),
            claims: claims,
            signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
    
    private static string GenerateGwtRefreshToken()
    {
        var randomNumber = new byte[64];

        using var generator = RandomNumberGenerator.Create();

        generator.GetBytes(randomNumber);

        return Convert.ToBase64String(randomNumber);
    }

    private ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
    {
        var validation = new TokenValidationParameters
        {
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config.GetJwtSecretKey())),
            ValidateAudience = false,
            ValidateIssuer = false,
            ValidateLifetime = false
        };

        return new JwtSecurityTokenHandler().ValidateToken(token, validation, out _);
    }
}