using Services.Exceptions;

namespace Services.Helpers.ResponseBuilder;

internal class JsonApiResponseBuilder<TModel> : IJsonApiResponseBuilder<TModel>
{
    private int? _statusCode;
    private string? _error;
    private IBuilder<JsonApiResponse<TModel>> _child;

    public IJsonApiResponseModelBuilder<TModel> Error(int statusCode, string? message = null)
    {
        _statusCode = statusCode;
        _error = message;
        var modelBuilder = new JsonApiResponseModelBuilder<TModel>();
        _child = modelBuilder;
        return modelBuilder;
    }

    public IJsonApiResponseModelBuilder<TModel> Success()
    {
        _statusCode = 200;
        var modelBuilder = new JsonApiResponseModelBuilder<TModel>();
        _child = modelBuilder;
        return modelBuilder;
    }

    public IJsonApiResponseModelBuilder<TModel> NoContent()
    {
        _statusCode = 204;
        var modelBuilder = new JsonApiResponseModelBuilder<TModel>();
        _child = modelBuilder;
        return modelBuilder;
    }
    
    public JsonApiResponse<TModel> Build()
    {
        if (_statusCode is null || _child is null)
            throw new ResponseBuilderException("Cannot build response without status code");
        var response = _child.Build();
        response.Error = _error;
        response.StatusCode = _statusCode.Value;
        return response;
    }
}