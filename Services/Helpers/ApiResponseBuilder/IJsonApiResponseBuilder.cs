namespace Services.Helpers.ApiResponseBuilder;

public interface IJsonApiResponseBuilder<TModel> : IApiResponseBuilder<IJsonApiResponseModelBuilder<TModel>, JsonApiResponse<TModel>>;