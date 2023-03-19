using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using pobject.API.Helpers;
using pobject.Core.AuthBase;
using pobject.Core.DatabaseEnvironment;
using pobject.Core.Login;
using pobject.Core.UserProfile;
using System.Data; 
namespace pobject.API.Controllers
{
    [Route("api")]
    [EnableCors("AllowSpecificOrigin")]
    [ApiController]
    public class ProfileController : Auth_Controller
    {
        private readonly IUserProfileService _UserProfileService;
        private readonly IJwtHelper _JWT_Helper;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ProfileController(IUserProfileService iLoginService, IJwtHelper JWT_Helper,IHttpContextAccessor httpContextAccessor,IDatabase database):base(httpContextAccessor,database)
        {
            _UserProfileService = iLoginService;
            _JWT_Helper = JWT_Helper;
            _httpContextAccessor= httpContextAccessor;
        } 
        [HttpGet]
        [Route("userprofile")]
        public IActionResult GetUserProfile()
        {
            string UsernameOrEmail = _JWT_Helper.Email;
            string UserId = _JWT_Helper.UserId;
            DataTable result = _UserProfileService.GetUserProfile(UsernameOrEmail,UserId);
            return Ok(result);
        }

        [HttpGet]
        [Route("userallprofile")]
        public IActionResult GetAllUserProfile()
        {
            string UsernameOrEmail = _JWT_Helper.Email;
            string UserId = _JWT_Helper.UserId;
            DataTable result = _UserProfileService.GetAllUserProfile();
            return Ok(result);
        }

        [HttpPost]
        [Route("store-userprofile")]
        public IActionResult StoreUserProfile(UserProfile_Request request)
        {
            Internal_JWT_Request jwt = new Internal_JWT_Request() { Email = _JWT_Helper.Email, UserId = _JWT_Helper.UserId };
            UserProfile_Response response = _UserProfileService.StoreUserProfile(request, jwt);
            return Ok(response);
        }


        [HttpGet]
        [Route("getusergriddata")]
        public IActionResult StoreUserProfile()
        {
            var _bearer_token = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            UserFinanceData response = _UserProfileService.UserGridData(_bearer_token);
            return Ok(response);
        }

    

    }
}
