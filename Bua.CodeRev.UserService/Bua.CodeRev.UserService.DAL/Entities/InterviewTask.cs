﻿using System;

namespace Bua.CodeRev.UserService.DAL.Entities
{
    public class InterviewTask : BaseEntity
    {
        public Guid TaskId { get; set; }
        public Guid InterviewId { get; set; }
    }
}