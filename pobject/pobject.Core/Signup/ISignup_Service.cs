using System.Data;

namespace pobject.Core.Signup;

public interface ISignup_Service
{
    DataTable GetUser();
    Signup_Response SignupUser(Signup_Request request);
    StoreCode DeleteUser(int UserId);
}
