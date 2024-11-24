namespace Services.Helpers.ResponseBuilder;

public interface IJsonResponseBuilder<TModel> : IBuilder<JsonApiResponse<TModel>>
{
    IJsonResponseModelBuilder<TModel> NoContent();
    IJsonResponseModelBuilder<TModel> Success();
    IJsonResponseModelBuilder<TModel> Error(int statusCode, string? message = null);
}