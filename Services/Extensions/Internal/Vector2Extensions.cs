using System.Numerics;

namespace Services.Extensions.Internal;

public static class Vector2Extensions
{
    public static Vector2 Approximate(this Vector2 vec, float radius)
    {
        var random = new Random();
        var ax = radius * ((float)random.NextDouble() * 2 - 1);
        var ay = radius * ((float)random.NextDouble() * 2 - 1);
        return new Vector2(vec.X + ax, vec.Y + ay);
    }
}