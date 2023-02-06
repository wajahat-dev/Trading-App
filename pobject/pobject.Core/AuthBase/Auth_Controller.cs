using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using pobject.Core.DatabaseEnvironment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace pobject.Core.AuthBase
{ 
    [Authorize] 
    [ApiController]
    [Produces("application/json")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [EnableCors("AllowSpecificOrigin")]
    public abstract class Auth_Controller : ControllerBase
    {//private readonly IMemoryCache _memoryCache;
        protected readonly IDatabase _database;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public Auth_Controller(IHttpContextAccessor httpContextAccessor, IDatabase database)
        {
            _httpContextAccessor = httpContextAccessor;
            _database = database;

            var _user = httpContextAccessor.HttpContext!.User;
            int auth = httpContextAccessor.HttpContext!.Request.Headers["Authorization"].Count;
            string token = auth > 0 ? httpContextAccessor.HttpContext!.Request.Headers["Authorization"][0].Split(' ')[1].ToString() : "";
            //var userId = jwtUtils.ValidateToken(token);
            string UserId = _user.FindFirst(ClaimTypes.Sid).Value;
            string EmailOrUsername = _user.FindFirst(ClaimTypes.Email).Value;
            string Name = _user.FindFirst(ClaimTypes.Name).Value;
            string GivenName = _user.FindFirst(ClaimTypes.GivenName).Value;

            //Sid = clientCode
            //var userId = jwtUtils.ValidateToken(token);
            //if (userId != null)
            //{
            //    // attach user to context on successful jwt validation
            //    //httpContext.Items["Co_User_name"] = "Abu Baker Khan Dada";
            //}
            _database.InitConnection(UserId,EmailOrUsername);
        }
    }
}
