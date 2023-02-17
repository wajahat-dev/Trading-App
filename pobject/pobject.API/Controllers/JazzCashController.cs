using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using pobject.API.Helpers;
using pobject.Core.AuthBase;
using pobject.Core.DatabaseEnvironment;
using pobject.Core.OtherServices;
using pobject.Core.UserProfile;
using System;
using System.Data;
using System.Net.Http.Headers;

namespace pobject.API.Controllers
{
    [Route("api")]
    [EnableCors("AllowSpecificOrigin")]
    [ApiController]
    [AllowAnonymous]
    public class JazzCashController : ControllerBase
    {
        private readonly IJazzCash_Services _JazzCash_Services;
        private readonly IJwtHelper _JWT_Helper;
        private readonly IHttpContextAccessor _httpContextAccessor;

        //public JazzCashController(IJazzCash_Services JazzCash_Services, IJwtHelper JWT_Helper, IHttpContextAccessor httpContextAccessor, IDatabase database) : base(httpContextAccessor, database)
        //{
        //    _JazzCash_Services = JazzCash_Services;
        //    _JWT_Helper = JWT_Helper;
        //    _httpContextAccessor = httpContextAccessor;
        //}
        public JazzCashController(IJazzCash_Services JazzCash_Services)
        {
            _JazzCash_Services = JazzCash_Services;
        }
        [HttpPost]
        [Route("jc_wallet")]
        public async Task<IActionResult> jc_wallet([FromBody] dynamic data)
        {
            HttpResponseMessage result = new HttpResponseMessage();
            try
            {
                #region A Way
                Uri baseAddress = new Uri($"https://sandbox.jazzcash.com.pk/ApplicationAPI/API/2.0/Purchase/DoMWalletTransaction");
                HttpClient client = new HttpClient();
                HttpResponseMessage response = await client.PostAsync(baseAddress, new StringContent(data.ToString(), System.Text.Encoding.UTF8, "application/json"));
                return Content(await response.Content.ReadAsStringAsync(), "application/json");
                #endregion

                #region Another AWay
                //if (_httpContextAccessor != null)
                //{
                //    if (_httpContextAccessor.HttpContext != null)
                //    {
                //        if (_httpContextAccessor.HttpContext.Request != null)
                //        {
                //            if (_httpContextAccessor.HttpContext.Request.Headers != null)
                //            {
                //                if (_httpContextAccessor.HttpContext.Request.Headers.Authorization.Count > 0)
                //                {
                //                    //string token = _httpContextAccessor.HttpContext.Request.Headers.Authorization[0];
                //                    Uri baseAddress = new Uri($"https://sandbox.jazzcash.com.pk/ApplicationAPI/API/2.0/Purchase/DoMWalletTransaction");
                //                    HttpClient client = new HttpClient();
                //                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                //                    //client.DefaultRequestHeaders.Add("Authorization", token);
                //                    HttpResponseMessage response = await client.PostAsync($"{baseAddress}", data);
                //                    return Ok(response);
                //                }
                //            }
                //        }
                //    }
                //}
                #endregion

            }
            catch (Exception e)
            {
                return NotFound(new { Message = "Exception due to " + e });
            }

            return Ok(result);
        }

    }
}
