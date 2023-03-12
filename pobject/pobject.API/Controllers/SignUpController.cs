using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using pobject.API.Helpers;
using pobject.Core.DatabaseEnvironment;
using pobject.Core.Signup;

namespace pobject.API.Controllers
{
    [AllowAnonymous]
    [Route("api")]
    [ApiController]
    //Sinup Controller should not inhertit out abstract class
    public class SignUpController : ControllerBase
    {
        private readonly IDatabase _database;
        private readonly IJwtHelper _jWT_Helper;
        public SignUpController(IDatabase database, IJwtHelper jWT_Helper)
        {
            _database = database;
            _jWT_Helper = jWT_Helper;
        }

        [HttpPost]
        [Route("signup")]
        public IActionResult DoSignUp(SignupModels user,string RoleCodeIfLoggedInAsAdmin, string referralcode, string cnic)
        { 
            Signup_Request request = new Signup_Request();
            request.UserNameOrEmail = user.UserNameOrEmail;
            request.Password = user.Password;
            request.ConfirmPassword = user.ConfirmPassword;
            request.referral_code = referralcode;
            request.cnic = cnic;
            request.DisplayName = user.UserNameOrEmail.Length > 5 ? user.UserNameOrEmail.Substring(0,5) : user.UserNameOrEmail;
            Signup_Response response = _database.CreateNewUser(request, RoleCodeIfLoggedInAsAdmin);
            if (response.Success)
            {
                response.Token = _jWT_Helper.GenerateToken(response);
                return Ok(response);
            }
            else
            {
                return Ok(response);
            }
        } 
    }
}
