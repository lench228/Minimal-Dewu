using Microsoft.AspNetCore.Mvc;

namespace Services.Helpers.ResponseBuilder;

public interface IApiResponse
{
    IActionResult ToActionResult();
}