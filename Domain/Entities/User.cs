using Domain.Abstractions;
using Microsoft.AspNetCore.Identity;

namespace Domain.Entities;

public class User : IdentityUser<Guid>, IEntity<Guid>
{
    public string? RefreshToken { get; set; }
    public DateTimeOffset? RefreshTokenExpirationDate { get; set; }
    public Address Address { get; set; } = new();
    public PersonalData PersonalData { get; set; } = new();
    public List<Role> Roles { get; set; } = null!;
    public List<Order> Orders { get; set; } = [];
}