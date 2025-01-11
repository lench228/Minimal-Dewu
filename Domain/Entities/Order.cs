using System.ComponentModel.DataAnnotations.Schema;
using Domain.Abstractions;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace Domain.Entities;

public class Order : IEntity<int>
{
    public int Id { get; set; }
    public DateTimeOffset CreationDate { get; set; }
    public DateTimeOffset DueDate { get; set; }
    public OrderStatus Status { get; set; }
    public List<Good> Goods { get; set; } = null!;
    public Address Address { get; set; } = null!;
    public PersonalData UserPersonalData { get; set; } = null!;
    
    public Guid UserId { get; set; }
    [ForeignKey(nameof(UserId))]
    [DeleteBehavior(DeleteBehavior.Cascade)]
    public User User { get; set; } = null!;
}