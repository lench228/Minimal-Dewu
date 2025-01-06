using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers;

[Route("")]
public class ReactIntegrationController : Controller
{
    public async Task<IActionResult> GetReactApp()
    {
        var html = await System.IO.File.ReadAllTextAsync("wwwroot/dist/index.html");
        return Content(html, "text/html");
    }
}