namespace Services.Helpers.ResponseBuilder;

public interface IJsonApiResponseBuilder<TModel> : IApiResponseBuilder<IJsonApiResponseModelBuilder<TModel>, JsonApiResponse<TModel>>;