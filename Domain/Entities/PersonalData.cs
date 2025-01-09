using Microsoft.EntityFrameworkCore;

namespace Domain.Entities;

[Owned]
public class PersonalData
{
    public string? Phone { get; set; }
    public string? FullName { get; set; }
}