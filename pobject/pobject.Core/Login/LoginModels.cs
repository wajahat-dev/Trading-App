using pobject.Core.Signup;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pobject.Core.Login
{
    internal class LoginModels
    {
    }
    public class Login_Request
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public int Clientid { get; set; }
    }
    public class Login_Response
    {
        public bool Success { get; set; }
        public string MessageBox { get; set; } 
        public CreatedUser User { get; set; }
        public int ClientId { get; set; }
        public string Token { get; set; }
        public bool IsActiveUser { get; set; }
    }
    public class UserInformation
    {
        public string User_ID { get; set; }
        public string DisplayName { get; set; }
        public string EmailOrUsername { get; set; }
    }
}
