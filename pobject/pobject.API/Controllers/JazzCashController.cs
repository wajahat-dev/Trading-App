﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using pobject.API.Helpers;
using pobject.Core;
using pobject.Core.AuthBase;
using pobject.Core.DatabaseEnvironment;
using pobject.Core.OtherServices;
using pobject.API.Helpers;
using pobject.Core.UserProfile;
using System;
using System.Data;
using System.Net.Http.Headers;
using System.Security.Cryptography;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;


namespace pobject.API.Controllers
{
    [Route("api")]
    [EnableCors("AllowSpecificOrigin")]
    [ApiController]
    public class JazzCashController : Auth_Controller
    {
        private readonly IJazzCash_Services _JazzCash_Services;
        private readonly IJwtHelper _JWT_Helper;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public JazzCashController(IJazzCash_Services JazzCash_Services, IJwtHelper JWT_Helper, IHttpContextAccessor httpContextAccessor, IDatabase database) : base(httpContextAccessor, database)
        {
            _JazzCash_Services = JazzCash_Services;
            _JWT_Helper = JWT_Helper;
            _httpContextAccessor = httpContextAccessor;
        }
        
        
        [HttpPost]
        [Route("jc_wallet")]
        public async Task<IActionResult> jc_wallet([FromBody] dynamic data)
        {
            HttpResponseMessage result = new HttpResponseMessage();
           

            try
            {

                var payload = new Dictionary<string, string>
{
    { "pp_Version", "1.1" },
    { "pp_TxnType", "MWALLET" },
    { "pp_Language", "EN" },
    { "pp_MerchantID", "" },
    { "pp_SubMerchantID", "" },
    { "pp_Password", "" },
    { "pp_BankID", "" },
    { "pp_ProductID", "" },
    { "pp_TxnRefNo", "" },
    { "pp_Amount", "" },
    { "pp_TxnCurrency", "PKR" },
    { "pp_TxnDateTime", "" },
    { "pp_BillReference", "billref" },
    { "pp_Description", "Description of transaction" },
    { "pp_TxnExpiryDateTime", "" },
    { "pp_ReturnURL", "https://wajahatali.vercel.app/" },
    { "ppmpf_1", "" },
    { "ppmpf_2", "" },
    { "ppmpf_3", "" },
    { "ppmpf_4", "" },
    { "ppmpf_5", "" }
};
                payload["pp_MerchantID"] = "MC53678";
                payload["pp_Password"] = "808ww559vu";
                payload["pp_TxnRefNo"] = "T" + JazzHelper.GetTransactionDateTime();
                payload["pp_TxnDateTime"] = JazzHelper.GetTransactionDateTime();
                payload["pp_TxnExpiryDateTime"] = JazzHelper.GetTransactionExpiry(30);
                payload["pp_SecureHash"] = JazzHelper.GenerateSecureHash(payload, "8scc0yux1z");

                JObject json = JsonConvert.DeserializeObject<JObject>(data.ToString());

                //payload["ppmpf_1"] = data.string.phoneNumber;


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

        [HttpPost]
        [Route("submit-jc_wallet-request")]
        public async Task<IActionResult> jc_walletRequest([FromBody] JazzCashRequestSubmission request)
        {
            //Ignore UserId, Username from request , It will bind internally
            request.EmailOrUsername = _JWT_Helper.Email;
            request.UserID = _JWT_Helper.UserId;
            StoreCode response = _JazzCash_Services.Submit_JazzCash_Request(request);
            return Ok(response);
        }
        [HttpGet]
        [Route("allpending-request")]
        public async Task<IActionResult> GetPendingRequest()
        {
            StoreCode response = _JazzCash_Services.GetAllPendingRequest();
            return Ok(response);
        }

    }
}
