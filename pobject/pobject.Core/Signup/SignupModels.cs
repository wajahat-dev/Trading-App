using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pobject.Core.Signup
{
    public class SignupModels
    {
        public string UserNameOrEmail { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }
    public class Signup_Request
    {
        public string UserNameOrEmail { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public string DisplayName { get; set; } //not for frontEnd Field, It will give to user internally
    }

    public class Signup_Response
    {
        public string MessageBox { get; set; }
        public bool Success { get; set; }
        public string Clientid { get; set; }
        public string Token { get; set; } 
        public CreatedUser User { get; set; }
    }
    public class CreatedUser
    {
        public bool IsAdmin { get; set; }
        public bool IsEndUser { get; set; }
        public bool IsSubAdmin { get; set; }
        public string EmailOrUsername { get; set; }
        public string DisplayName { get; set; }
        public string User_ID { get; set; }
        public DateTime InActiveDate { get; set; }
        public DateTime CreatedOn { get; set; }

    }
}
