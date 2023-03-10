using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pobject.Core.Login
{
    public interface ILoginService
    {
        Login_Response DoLogin(Login_Request request);
        Login_Response LOGIN(Login_Request request);
        Login_Response GetLoginInfo(string token);
    }
}
