using Domain.Abstractions;

namespace Services.Models.Captcha;

public class CaptchaRequest
{
    public string Url { get; set; }
    public IProxy? Proxy { get; set; }

    public CaptchaRequest(string url, IProxy? proxy = null)
    {
        Url = url;
        Proxy = proxy;
    }
}