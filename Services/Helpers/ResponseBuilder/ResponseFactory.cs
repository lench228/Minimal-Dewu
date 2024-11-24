namespace Services.Helpers.ResponseBuilder;

public class ResponseFactory
{
    private ResponseFactory() { }

    public static JsonApiResponse<TModel> Json<TModel>(Action<IJsonResponseBuilder<TModel>> jsonResponseBuilderOptions)
    {
        var builder = new JsonResponseBuilder<TModel>();
        jsonResponseBuilderOptions.Invoke(builder);
        return builder.Build();
    }
}