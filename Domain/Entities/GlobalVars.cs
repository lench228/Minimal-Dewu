﻿using Domain.Abstractions;

namespace Domain.Entities;

public class GlobalVars : IEntity<int>
{
    public int Id { get; set; }
    public bool CaptchaBlocked { get; set; }
}