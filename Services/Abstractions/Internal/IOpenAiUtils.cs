namespace Services.Abstractions.Internal;

internal interface IOpenAiUtils
{
    Task<int> SolveCaptchaAsync(byte[] tokenWordImage, byte[] captchaImages);
}