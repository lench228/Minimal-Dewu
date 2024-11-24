using Domain.Abstractions;
using Infrastructure.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Extensions;

public static class EntitiesExtensions
{
    public static async Task<TEntity?> GetByIdAsync<TEntity, TKey>(
        this IQueryable<TEntity> query,
        TKey id,
        bool throwIfNotFound = false)
        where TEntity : IEntity<TKey>
        where TKey : IEquatable<TKey>
    {
        var entity = await query.FirstOrDefaultAsync(e => e.Id.Equals(id));
        if (entity is null && throwIfNotFound)
            throw new EntityNotFoundException($"Entity of type '{typeof(TEntity).FullName}' with Id '{id}' not found.");

        return entity;
    }
}