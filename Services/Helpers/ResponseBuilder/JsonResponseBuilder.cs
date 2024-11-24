using Services.Exceptions;

namespace Services.Helpers.ResponseBuilder;

internal class JsonResponseBuilder<TModel> : IJsonResponseBuilder<TModel>
{
    private int? _statusCode;
    private string? _error;
    private JsonResponseModelBuilder<TModel>? _child;

    public IJsonResponseModelBuilder<TModel> Error(int statusCode, string? message = null)
    {
        _statusCode = statusCode;
        _error = message;
        _child = new JsonResponseModelBuilder<TModel>();
        return _child;
    }

    public IJsonResponseModelBuilder<TModel> Success()
    {
        _statusCode = 200;
        _child = new JsonResponseModelBuilder<TModel>();
        return _child;
    }

    public IJsonResponseModelBuilder<TModel> NoContent()
    {
        _statusCode = 204;
        _child = new JsonResponseModelBuilder<TModel>();
        return _child;
    }
    
    public IApiResponse Build()
    {
        if (_statusCode is null || _child is null)
            throw new ResponseBuilderException("Cannot build response without status code");
        var response = _child.Build();
        response.Error = _error;
        response.StatusCode = _statusCode.Value;
        return response;
    }
}