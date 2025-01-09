using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Abstractions;
using Services.Models.Products;
using Services.Models.Shared;

namespace Web.Controllers;

[ApiController]
[Route("api/dewu")]
[Authorize]
public class DewuController(IDewuService dewuService) : ControllerBase
{
    [HttpGet]
    [ProducesResponseType<JsonResponseDto<ProductResponseDto>>(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetProductInfo([FromQuery, Url] string productUrl)
    {
        var response = await dewuService.GetProductInfoByUrlAsync(productUrl);
        return response.ToActionResult();
    }
}