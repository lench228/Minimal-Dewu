using System.ComponentModel.DataAnnotations;
using Domain.Abstractions;

namespace Domain.Entities;

public class Proxy : IEntity<int>, IProxy
{
    [Key]
    public int Id { get; set; }
    public string Url { get; set; } = null!;
    public string? Username { get; set; }
    public string? Password { get; set; }
    public bool CaptchaBlocked { get; set; }
}