using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using pobject.API.Helpers;
using pobject.Core;
using pobject.Core.AuthBase;
using pobject.Core.DatabaseEnvironment;
using pobject.Core.Models;
using pobject.Core.OtherServices;

namespace pobject.API.Controllers
{
    [Route("api")]
    [ApiController]
    public class AdminUserController : Auth_Controller
    {
        private readonly IAdminAndUserServices _AdminAndUserServices;
        private readonly IHttpContextAccessor _HttpContextAccessor;
        private readonly IJwtHelper _JwtHelper;
        public AdminUserController(IAdminAndUserServices AdminAndUserServices,IJwtHelper jwtHelper, IHttpContextAccessor httpContextAccessor, IDatabase database) : base(httpContextAccessor, database)
        {
            _AdminAndUserServices= AdminAndUserServices;
            _HttpContextAccessor= httpContextAccessor;
            _JwtHelper= jwtHelper;
        }
        [HttpGet]
        [Route("all-users")]
        public async Task<IActionResult> GetUserList()
        {
            var response = _AdminAndUserServices.GetUserList();
            return Ok(response);
        }
        [HttpGet]
        [Route("all-subadmins")]
        public async Task<IActionResult> GetSubAdminList()
        {
            var response = _AdminAndUserServices.GetSubAdminList();
            return Ok(response);
        }
        //All In One 
        [HttpGet]
        [Route("all-listof")]
        public async Task<IActionResult> GetListOf(string RoleCode)
        {
            var response = _AdminAndUserServices.GetListOf(RoleCode);
            return Ok(response);
        }

        #region Suspend User
        [HttpPost]
        [Route("suspend-user")]
        public async Task<IActionResult> SuspendUser(UserSuspendRequest request)
        {
            request.AdminID = _JwtHelper.UserId;
            StoreCode response = _AdminAndUserServices.SuspendAUser(request);
            return Ok(response);
        }
        #endregion

    }
}
