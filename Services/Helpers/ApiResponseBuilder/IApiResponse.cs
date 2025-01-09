using Microsoft.AspNetCore.Mvc;

namespace Services.Helpers.ApiResponseBuilder;

public interface IApiResponse
{
    IActionResult ToActionResult();
}