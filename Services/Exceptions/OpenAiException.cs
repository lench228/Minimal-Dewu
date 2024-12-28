namespace Services.Exceptions;

internal class OpenAiException(string message) : Exception(message);