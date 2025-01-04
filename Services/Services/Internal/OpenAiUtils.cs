using System.ClientModel;
using System.ClientModel.Primitives;
using System.Net;
using Infrastructure.Extensions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using OpenAI;
using OpenAI.Chat;
using Services.Abstractions.Internal;
using Services.Exceptions;
using Services.Extensions;

namespace Services.Services.Internal;

internal class OpenAiUtils(
    IConfiguration config,
    ILogger<OpenAiUtils> logger,
    IProxyUtils proxyUtils) : IOpenAiUtils
{
    private const string GptModel = "gpt-4o-mini";
    private const string Prompt = "You going to get the two images. The only content of the first image will be the word in Chinese lanugage and the second image will be the image of a table with 2 rows and 3 columns. Each cell of that table on the second image is going to contain different picture, one if these 6 pictures is going to have white background. Enumerate each cell of the table from left to right and from top to bottom and assign a number from 1 to 6 to each picture in a respective cell. Then output the number of picture which content is the most similar to the word in Chinese language you got on the first image and then the number of picture with white background.\nThe output should be the two numbers divided by single space without any additional explanations.";
    
    public async Task<int> SolveCaptchaAsync(byte[] tokenWordImage, byte[] captchaImages)
    {
        var proxy = await proxyUtils.GetProxyAsync();
        
        var handler = new HttpClientHandler();
        handler.Proxy = new WebProxy
        {
            Address = new Uri(proxy.Url),
            Credentials = new NetworkCredential(proxy.Username, proxy.Password)
        };

        using var httpClient = new HttpClient(handler);
        httpClient.Timeout = TimeSpan.FromSeconds(60);
        
        var client = new ChatClient(GptModel, new ApiKeyCredential(config.GetOpenAiApiKey()), new OpenAIClientOptions
        {
            Transport = new HttpClientPipelineTransport(httpClient)
        });

        var sysMessage = ChatMessage.CreateSystemMessage(Prompt);
        var userMessage = ChatMessage.CreateUserMessage(
            ChatMessageContentPart.CreateImagePart(BinaryData.FromBytes(tokenWordImage), "image/png"),
            ChatMessageContentPart.CreateImagePart(BinaryData.FromBytes(captchaImages), "image/png")
            );
        
        var response = await client.CompleteChatAsync(sysMessage, userMessage);

        if (response is null)
            throw new OpenAiException("Error trying to get response form open ai api");

        var answerText = await GetResponseText(response);
        
        if (answerText is null)
            throw new OpenAiException("Error trying to get response form open ai api");

        var answerArray = answerText.Split();
        if (answerArray.Length != 2 || 
            !int.TryParse(answerArray[0], out var ansNum) || 
            !int.TryParse(answerArray[1], out var socketNum) ||
            ansNum < 1 || ansNum > 6 ||
            socketNum < 1 || socketNum > 6 ||
            ansNum == socketNum)
            throw new OpenAiException($"Invalid open ai api response format: {answerText}");
        
        return ansNum < socketNum ? ansNum : ansNum - 1;
    }

    private async Task<string?> GetResponseText(ClientResult<ChatCompletion> result)
    {
        var rawResponse = result.GetRawResponse();
        
        if (rawResponse.IsError)
        {
            var content = string.Empty;
            if (rawResponse.ContentStream is not null)
            {
                using var reader = new StreamReader(rawResponse.ContentStream);
                content = await reader.ReadToEndAsync();
            }
            
            logger.LogError("Couldn't get open ai api response for translation. Error code: {ErrorCode}, Content: {Content}",
                rawResponse.Status, content);
        }
        
        return result.Value.Content[0].Text;
    }
}