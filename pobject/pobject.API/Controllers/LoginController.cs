using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using pobject.API.Helpers;
using pobject.Core.AuthBase;
using pobject.Core.Login;
using Microsoft.Net.Http.Headers;
using Microsoft.AspNetCore.Identity;
using System.Data;

namespace pobject.API.Controllers
{
    [Route("api")]
    [EnableCors("AllowSpecificOrigin")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILoginService _LoginService;
        private readonly IJwtHelper _JWT_Helper;

        public LoginController(ILoginService iLoginService, IJwtHelper JWT_Helper)
        {
            _LoginService = iLoginService;
            _JWT_Helper = JWT_Helper;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("login")]
        public IActionResult LoginUser(Login_Request request)
        {
            Login_Response result = _LoginService.LOGIN(request);
            if (result.Success)
            {
                if (result.IsActiveUser)
                {
                    result.Token = _JWT_Helper.GenerateToken(result);
                    return Ok(result);
                }
                else
                { 
                    result.MessageBox = "Your Account is Suspended , Please Contact from your Administrator";
                    return Ok(result);
                }
            }
            else
            {
                return Ok(result);
            }
        }

        [HttpGet]
        [EnableCors("AllowSpecificOrigin")]
        [Route("getLoginInfo")]
        //public IActionResult GetLoginInfo(LoginInformation request)
        public IActionResult GetLoginInfo()
        {
            var _bearer_token = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            Login_Response result = _LoginService.GetLoginInfo(_bearer_token);
               
            if (result.Success)
            {
                if (result.IsActiveUser)
                {
                    return Ok(result);
                }
                else
                {
                    result.MessageBox = "Your Account is Suspended , Please Contact from your Administrator";
                    return Ok(result);
                }
            }
            else
            {
                return Ok(result);
            }
        }


        [HttpPost]
        [EnableCors("AllowSpecificOrigin")]
        [Route("registerreferral")]
        //public IActionResult GetLoginInfo(LoginInformation request)
        public IActionResult RegisterReferral()
        {
            Login_Response result = _LoginService.GetLoginInfo("");

            return Ok(result);
        }

        [HttpPost]
        [Route("reset-password")]
        public async Task<IActionResult> ResetPassword( ResetPasswordRequest request)
        {
            Login_Response  response = _LoginService.resetpassword(request);
            return Ok(response);
        }


        [HttpGet]
        [Route("verifyresetlink")]
        public async Task<IActionResult> VerifyResetLink(string token)
        {
            Login_Response response = _LoginService.verifyResetLink(token);
            
            return Ok(response);
        }

    }
}
