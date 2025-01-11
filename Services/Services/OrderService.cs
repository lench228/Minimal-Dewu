using Domain.Entities;
using Domain.Enums;
using Infrastructure.EfCore;
using Infrastructure.Extensions;
using Microsoft.EntityFrameworkCore;
using Services.Abstractions;
using Services.Helpers.ApiResponseBuilder;
using Services.Models.Orders;

namespace Services.Services;

public class OrderService(IUserIdAccessor userIdAccessor, AppDbContext dbContext) : IOrderService
{
    public async Task<JsonApiResponse> CreateOrderAsync(CreateOrderRequestDto request)
    {
        var userId = userIdAccessor.GetCurrentUserId();
        var user = await dbContext.Users
            .Include(u => u.Orders)
            .GetByIdAsync(userId, true);

        var now = DateTimeOffset.UtcNow;
        var entity = new Order
        {
            CreationDate = now,
            DueDate = now + TimeSpan.FromDays(10),
            UserId = user!.Id,
            Status = OrderStatus.Pending,
            Address = new Address
            {
                City = request.Address.City,
                Street = request.Address.Street,
                Apartment = request.Address.Apartment,
                Building = request.Address.Building
            },
            UserPersonalData = new PersonalData
            {
                FullName = request.UserData.FullName,
                Phone = request.UserData.Phone
            },
            Goods = request.Goods.Select(g => new Good
            {
                Title = g.Good.Title,
                Price = g.Good.Price,
                ImageUrl = g.Good.ImageUrl,
                Quantity = g.Count,
                Properties = g.Good.Properties.Select(p => new GoodProperty
                {
                    Name = p.Name,
                    Value = p.Value
                }).ToList()
            }).ToList()
        };
        
        user.Orders.Add(entity);
        await dbContext.SaveChangesAsync();

        return ApiResponseFactory.Json(o => o.Success());
    }

    public async Task<JsonApiResponse<OrdersResponseDto>> GetOrdersAsync()
    {
        var userId = userIdAccessor.GetCurrentUserId();
        var user = await dbContext.Users
            .Include(u => u.Orders)
            .GetByIdAsync(userId, true);

        var orders = user!.Orders.Select(o => new
        {
            o.Status,
            Data = new OrderResponseDto
            {
                Id = o.Id,
                Created = o.CreationDate,
                Due = o.DueDate,
                Address = new OrderResponseAddressDto
                {
                    City = o.Address.City ?? string.Empty,
                    Street = o.Address.Street ?? string.Empty,
                    Apartment = o.Address.Apartment ?? string.Empty,
                    Building = o.Address.Building ?? string.Empty
                },
                UserData = new OrderResponsePersonalDataDto
                {
                    FullName = o.UserPersonalData.FullName ?? string.Empty,
                    Phone = o.UserPersonalData.Phone ?? string.Empty
                },
                Total = o.Goods.Sum(g => g.Price),
                Goods = o.Goods.Select(g => new OrderResponseGoodItemDto
                {
                    Count = g.Quantity,
                    Good = new OrderResponseGoodDto
                    {
                        Title = g.Title,
                        ImageUrl = g.ImageUrl,
                        Price = g.Price,
                        Properties = g.Properties.Select(p => new OrderResponseGoodPropertyDto
                        {
                            Name = p.Name,
                            Value = p.Value
                        }).ToList()
                    }
                }).ToList()
            }
        }).ToList();

        var response = new OrdersResponseDto
        {
            Current = orders.Where(o => o.Status == OrderStatus.Pending).Select(o => o.Data).ToList(),
            Canceled = orders.Where(o => o.Status == OrderStatus.Canceled).Select(o => o.Data).ToList(),
            Ended = orders.Where(o => o.Status == OrderStatus.Completed).Select(o => o.Data).ToList()
        };
        return ApiResponseFactory.Json<OrdersResponseDto>(o => o
            .Success()
            .Model(response));
    }
}