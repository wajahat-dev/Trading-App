using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using pobject.API.Helpers;
using pobject.Core.AuthBase;
using pobject.Core.DatabaseEnvironment;
using pobject.Core.Roles;
using pobject.Core.UserProfile;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace pobject.API.Controllers
{
    [Route("api/roles")]
    [EnableCors("AllowSpecificOrigin")]
    [ApiController]
    public class RolesController : Auth_Controller
    {
        private readonly IRoles_Services _Roles_Services;
        private readonly IJwtHelper _JWT_Helper;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public RolesController(IHttpContextAccessor httpContextAccessor, IDatabase database, IRoles_Services iRoles_Services) : base(httpContextAccessor, database)
        {
            _httpContextAccessor = _httpContextAccessor;
            _Roles_Services = iRoles_Services;
        }

        [HttpGet]
        [Route("allroles")]
        public IActionResult GetRoles() => Ok(_Roles_Services.GetAllRoles());


        [HttpPost]
        [Route("store-roles")]
        public IActionResult Store_Roles(RolesModels_Request request)
        {
            RolesModels_Response response = _Roles_Services.StoreRole(request);
            return Ok(response);
        }
    }
}
