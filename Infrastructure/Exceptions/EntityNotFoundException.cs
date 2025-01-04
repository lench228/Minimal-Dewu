namespace Infrastructure.Exceptions;

internal class EntityNotFoundException(string message) : Exception(message);