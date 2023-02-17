using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using pobject.Core.AuthBase;
using pobject.Core.DatabaseEnvironment;
using pobject.Core.OtherServices;

namespace pobject.API.Controllers
{
    [Route("api")]
    [ApiController]
    public class AdminUserController : Auth_Controller
    {
        private readonly IAdminAndUserServices _AdminAndUserServices;
        private readonly IHttpContextAccessor _HttpContextAccessor;
        public AdminUserController(IAdminAndUserServices AdminAndUserServices, IHttpContextAccessor httpContextAccessor, IDatabase database) : base(httpContextAccessor, database)
        {
            _AdminAndUserServices= AdminAndUserServices;
            _HttpContextAccessor= httpContextAccessor;
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
    }
}
