namespace Services.Abstractions.Internal;

internal interface IPlaywrightUtilsFactory
{
    Task<IPlaywrightUtils> CreateAsync();
}