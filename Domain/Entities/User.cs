using Domain.Abstractions;
using Microsoft.AspNetCore.Identity;

namespace Domain.Entities;

public class User : IdentityUser<Guid>, IEntity<Guid>
{
    public List<Role> Roles { get; set; } = null!;
}