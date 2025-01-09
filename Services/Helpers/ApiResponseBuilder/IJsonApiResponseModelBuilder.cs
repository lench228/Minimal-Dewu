namespace Services.Helpers.ApiResponseBuilder;

public interface IJsonApiResponseModelBuilder<TModel> : IBuilder<JsonApiResponse<TModel>>
{
    void Model(TModel model);
}