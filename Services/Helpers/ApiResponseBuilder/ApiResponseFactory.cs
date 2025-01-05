namespace Services.Helpers.ResponseBuilder;

public static class ApiResponseFactory
{
    public static JsonApiResponse<TModel> Json<TModel>(Action<IJsonApiResponseBuilder<TModel>> jsonResponseBuilderOptions)
    {
        var builder = new JsonApiResponseBuilder<TModel>();
        jsonResponseBuilderOptions.Invoke(builder);
        return builder.Build();
    }
}