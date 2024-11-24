using Domain.Abstractions;
using Microsoft.AspNetCore.Identity;

namespace Domain.Entities;

public class Role : IdentityRole<Guid>, IEntity<Guid>
{
    public List<User> Users { get; set; } = null!;
}