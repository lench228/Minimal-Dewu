using Domain.Abstractions;
using Domain.Entities;
using Infrastructure.EfCore;
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

    public static async Task<GlobalVars> GetGlobalVarsAsync(this AppDbContext db, bool track = false)
    {
        var gv = await db.GlobalVars.FirstOrDefaultAsync();
        if (gv is not null)
            return gv;
        
        gv = new GlobalVars();
        await db.GlobalVars.AddAsync(gv);
        await db.SaveChangesAsync();

        return gv;
    }
}