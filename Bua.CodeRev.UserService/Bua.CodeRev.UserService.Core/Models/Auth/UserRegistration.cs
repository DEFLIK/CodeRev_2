﻿using System.ComponentModel.DataAnnotations;

namespace Bua.CodeRev.UserService.Core.Models.Auth
{
    public class UserRegistration
    {
        [Required]
        public string FullName { get; set; }
        
        [Required]
        [Phone]
        public string PhoneNumber { get; set; }
        
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        
        [Required]
        public string PasswordHash { get; set; }
    }
}