﻿using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Services.Abstractions;

namespace Web.Controllers;

[ApiController]
[Route("api/dewu")]
public class DewuController(IDewuService dewuService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetProductInfo([FromQuery, Url] string productUrl)
    {
        var response = await dewuService.GetProductInfoByUrlAsync(productUrl);
        return response.ToActionResult();
    }
}