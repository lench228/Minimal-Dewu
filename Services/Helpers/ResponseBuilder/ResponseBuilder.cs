namespace Services.Helpers.ResponseBuilder;

public class ResponseBuilder
{
    private ResponseBuilder() { }

    public static IApiResponse Json<TModel>(Action<IJsonResponseBuilder<TModel>> jsonResponseBuilderOptions)
    {
        var builder = new JsonResponseBuilder<TModel>();
        jsonResponseBuilderOptions.Invoke(builder);
        return builder.Build();
    }
}