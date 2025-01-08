namespace Services.Helpers.ApiResponseBuilder;

public interface IBuilder<out T>
{
    T Build();
}