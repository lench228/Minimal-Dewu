using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using Services.Models.Shared;

namespace Services.Helpers.ResponseBuilder;

public class JsonApiResponse<TModel> : IApiResponse
{
    private readonly JsonSerializerOptions _jsonSerializerOptions = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
    };
    
    public int StatusCode { get; set; }
    public TModel? Model { get; set; }
    public string? Error { get; set; }
    
    public IActionResult ToActionResult()
    {
        return new JsonResult(new JsonResponseDto<TModel>
        {
            Status = StatusCode,
            Response = Model,
            Error = Error
        }, _jsonSerializerOptions)
        {
            StatusCode = StatusCode
        };
    }
}