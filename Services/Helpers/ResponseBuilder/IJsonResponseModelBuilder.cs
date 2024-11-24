namespace Services.Helpers.ResponseBuilder;

public interface IJsonResponseModelBuilder<TModel> : IBuilder<JsonApiResponse<TModel>>
{
    void Model(TModel model);
}