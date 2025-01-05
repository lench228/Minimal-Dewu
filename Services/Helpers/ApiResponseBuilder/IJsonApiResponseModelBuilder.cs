namespace Services.Helpers.ResponseBuilder;

public interface IJsonApiResponseModelBuilder<TModel> : IBuilder<JsonApiResponse<TModel>>
{
    void Model(TModel model);
}