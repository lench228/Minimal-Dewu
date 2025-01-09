namespace Services.Abstractions;

public interface IUserIdAccessor
{
    public Guid GetCurrentUserId();
}