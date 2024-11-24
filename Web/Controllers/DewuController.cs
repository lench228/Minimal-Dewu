using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers;

[ApiController]
[Route("api/dewu")]
public class DewuController : ControllerBase
{
    // [HttpGet]
    // public async Task<IActionResult> GetProductInfo([FromQuery] string productUrl)
    // {
    //     var jsonString = await dewuUtils.GetProductInfoByUrlAsync(productUrl);
    //     return Ok(jsonString);
    // }
}