using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Abstractions;
using Services.Helpers.ApiResponseBuilder;
using Services.Models.Account;
using Services.Models.Shared;

namespace Web.Controllers;

[ApiController]
[Authorize]
[Route("api/account")]
public class AccountController(IAccountService accountService) : ControllerBase
{
    [HttpPatch]
    [ProducesResponseType<JsonResponseDto>(StatusCodes.Status200OK)]
    public async Task<IActionResult> UpdateUserAccountData([FromBody] UpdateAccountDataRequestDto request) =>
        (await accountService.UpdateUserAccountDataAsync(request)).ToActionResult();
    
    [HttpGet]
    [ProducesResponseType<JsonResponseDto<AccountDataResponseDto>>(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetUserAccountData() =>
        (await accountService.GetUserAccountDataAsync()).ToActionResult();
}