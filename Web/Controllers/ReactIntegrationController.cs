using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers;

[ApiExplorerSettings(IgnoreApi = true)]
public class ReactIntegrationController : Controller
{
    public async Task<IActionResult> GetReactApp()
    {
        var html = await System.IO.File.ReadAllTextAsync("wwwroot/dist/index.html");
        return Content(html, "text/html");
    }
}