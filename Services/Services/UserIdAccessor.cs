using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Services.Abstractions;
using Services.Exceptions;

namespace Services.Services;

internal class UserIdAccessor(IHttpContextAccessor httpContextAccessor) : IUserIdAccessor
{
    public Guid GetCurrentUserId()
    {
        var context = httpContextAccessor.HttpContext;
        var id = context?.User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (id == null)
            throw new UserAccessorException("Couldn't find user id");
        return Guid.Parse(id);
    }
}