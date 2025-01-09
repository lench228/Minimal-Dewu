using Microsoft.EntityFrameworkCore;

namespace Domain.Entities;

[Owned]
public class Address
{
    public string? City { get; set; }
    public string? Street { get; set; }
    public string? Building { get; set; }
    public string? Apartment { get; set; }
}