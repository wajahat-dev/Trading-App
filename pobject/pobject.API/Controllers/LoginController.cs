﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using pobject.API.Helpers;
using pobject.Core.AuthBase;
using pobject.Core.Login; 
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

        [HttpPost]
        [Route("getLoginInfo")]
        public IActionResult GetLoginInfo(LoginInformation request)
        {
            Login_Response result = _LoginService.GetLoginInfo(request);
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


    }
}
