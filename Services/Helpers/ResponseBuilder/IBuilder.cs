namespace Services.Helpers.ResponseBuilder;

public interface IBuilder<out T>
{
    T Build();
}