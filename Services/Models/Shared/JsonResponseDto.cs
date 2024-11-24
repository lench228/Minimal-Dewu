namespace Services.Models.Shared;

public class JsonResponseDto<TResponse>
{
    public int Status { get; set; }
    public TResponse? Response { get; set; }
    public string? Error { get; set; }
}