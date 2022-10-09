﻿using System.Runtime.Serialization;

namespace Bua.CodeRev.TrackerService.Contracts.Actions;

[DataContract]
public class MoveDto
{
    [DataMember] public int Start { get; set; }

    [DataMember] public int? End { get; set; }
}