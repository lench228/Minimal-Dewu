﻿using Microsoft.AspNetCore.Mvc;
using Services.Abstractions;
using Services.Models.Auth;
using Services.Models.Shared;

namespace Web.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController(IUserService userService) : ControllerBase
{
    [HttpPost("register")]
    [ProducesResponseType<JsonResponseDto<RegisterResponseDto>>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> Register([FromBody] CreateUserRequestDto request) =>
        (await userService.CreateUserAsync(request)).ToActionResult();

    [HttpPost("login")]
    [ProducesResponseType<JsonResponseDto<LogInResponseDto>>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> Login([FromBody] LogInRequestDto request) =>
        (await userService.LogInUserAsync(request)).ToActionResult();

    [HttpPost("refresh")]
    [ProducesResponseType<JsonResponseDto<RefreshResponseDto>>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> Refresh([FromBody] RefreshRequestDto request) =>
        (await userService.RefreshUserTokenAsync(request)).ToActionResult();
}