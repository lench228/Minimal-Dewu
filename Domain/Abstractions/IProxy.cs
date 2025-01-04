namespace Domain.Abstractions;

public interface IProxy
{
    string Url { get; }
    string? Username { get; }
    string? Password { get; }
}