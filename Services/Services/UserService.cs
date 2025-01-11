using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Domain.Entities;
using Infrastructure.EfCore;
using Infrastructure.Extensions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Services.Abstractions;
using Services.Helpers.ApiResponseBuilder;
using Services.Models.Auth;

namespace Services.Services;

internal class UserService(UserManager<User> userManager,
    AppDbContext dbContext,
    IConfiguration config,
    IHttpContextAccessor httpContextAccessor) : IUserService
{
    public async Task<JsonApiResponse<RegisterResponseDto>> CreateUserAsync(CreateUserRequestDto request)
    {
        var existingUser = await userManager.FindByEmailAsync(request.Email);
        if (existingUser is not null)
            return ApiResponseFactory.Json<RegisterResponseDto>(o => o.Error(409, "User already exists"));
        
        var refreshToken = GenerateGwtRefreshToken();
        var newUser = new User
        {
            UserName = Guid.NewGuid().ToString(),
            Email = request.Email,
            RefreshToken = refreshToken,
            RefreshTokenExpirationDate = DateTimeOffset.UtcNow.Add(config.GetJwtRefreshTokenLifetime())
        };
        
        var res = await userManager.CreateAsync(newUser, request.Password);
        if (!res.Succeeded)
            return ApiResponseFactory.Json<RegisterResponseDto>(o => o
                .Error(400, string.Join('\n', res.Errors.Select(e => e.Description))));

        var responseModel = new RegisterResponseDto
        {
            AccessToken = GenerateGwtAccessToken(newUser),
            RefreshToken = refreshToken
        };
        return ApiResponseFactory.Json<RegisterResponseDto>(o => o
            .Success()
            .Model(responseModel));
    }

    public async Task<JsonApiResponse<LogInResponseDto>> LogInUserAsync(LogInRequestDto request)
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

    public async Task<JsonApiResponse<RefreshResponseDto>> RefreshUserTokenAsync(RefreshRequestDto request)
    {
        var unauthorizedResponse = ApiResponseFactory.Json<RefreshResponseDto>(o => o.Error(401));
        
        var context = httpContextAccessor.HttpContext;
        var authHeader = context?.Request.Headers.Authorization.ToString();
        if (string.IsNullOrWhiteSpace(authHeader))
            return unauthorizedResponse;
        if (!authHeader.Contains(JwtBearerDefaults.AuthenticationScheme))
            return unauthorizedResponse;
        var token = authHeader[JwtBearerDefaults.AuthenticationScheme.Length..].Trim();
        var handler = new JwtSecurityTokenHandler();
        if (!handler.CanReadToken(token))
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
        
        // var refreshToken = GenerateGwtRefreshToken();
        // user.RefreshToken = refreshToken;
        // user.RefreshTokenExpirationDate = DateTimeOffset.UtcNow.Add(config.GetJwtRefreshTokenLifetime());
        // await userManager.UpdateAsync(user);
        
        return ApiResponseFactory.Json<RefreshResponseDto>(o => o
            .Success()
            .Model(new RefreshResponseDto
            {
                AccessToken = GenerateGwtAccessToken(user),
                RefreshToken = user.RefreshToken
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