namespace Services.Helpers.ResponseBuilder;

internal class JsonResponseModelBuilder<TModel> : IJsonResponseModelBuilder<TModel>
{
    private TModel? _model;
    
    public void Model(TModel model)
    {
        _model = model;
    }

    public JsonApiResponse<TModel> Build()
    {
        return new JsonApiResponse<TModel>
        {
            Model = _model
        };
    }
}