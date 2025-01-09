namespace Services.Helpers.ApiResponseBuilder;

public static class ApiResponseFactory
{
    public static JsonApiResponse<TModel> Json<TModel>(Action<IJsonApiResponseBuilder<TModel>> jsonResponseBuilderOptions)
    {
        var builder = new JsonApiResponseBuilder<TModel>();
        jsonResponseBuilderOptions.Invoke(builder);
        return builder.Build();
    }
    
    public static JsonApiResponse Json(Action<IJsonApiResponseBuilder> jsonResponseBuilderOptions)
    {
        var builder = new JsonApiResponseBuilder();
        jsonResponseBuilderOptions.Invoke(builder);
        return builder.Build();
    }
}