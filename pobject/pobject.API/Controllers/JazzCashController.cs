using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using pobject.API.Helpers;
using pobject.Core;
using pobject.Core.AuthBase;
using pobject.Core.DatabaseEnvironment;
using pobject.Core.DatabaseEnvironment;
using pobject.Core.OtherServices;
using pobject.Core.Bank.JassCash;
using pobject.API.Helpers;
using pobject.Core.UserProfile;
using System;
using System.Data;
using System.Net.Http.Headers;
using System.Security.Cryptography;
using System.Text.Json;
using System.Text;
using System.Text.Json.Serialization;
using System.Net.Http;
using Newtonsoft.Json;
using Microsoft.VisualBasic;
using System.Collections.Generic;
using System.Runtime.InteropServices;

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
        private readonly IDatabase _database;

        public JazzCashController(IJazzCash_Services JazzCash_Services, IJwtHelper JWT_Helper, IHttpContextAccessor httpContextAccessor, IDatabase database) : base(httpContextAccessor, database)
        {
            _JazzCash_Services = JazzCash_Services;
            _JWT_Helper = JWT_Helper;
            _httpContextAccessor = httpContextAccessor;
            _database = database;
        }


        [HttpPost]

        [Route("jc_wallet")]

        //public async ActionResult<JazzRespone> jc_wallet(JazzRequest request)
        public async Task<JazzRespone> jc_wallet(JazzRequest request)
        {
            HttpResponseMessage result = new HttpResponseMessage();
            JazzRespone response = new JazzRespone();


            PaymentData paymentData = new PaymentData
            {
                pp_Version = "1.1",
                pp_TxnType = "MWALLET",
                pp_Language = "EN",
                pp_MerchantID = "MC53678",
                pp_SubMerchantID = "",
                pp_Password = "808ww559vu",
                pp_BankID = "",
                pp_ProductID = "",
                pp_TxnRefNo = "T" + $@"{JazzHelper.GetTransactionDateTime()}",
                pp_Amount = $@"{request.amount}",
                pp_TxnCurrency = "PKR",
                pp_TxnDateTime = $@"{JazzHelper.GetTransactionDateTime()}",
                pp_BillReference = "billref",
                pp_Description = "Description of transaction",
                pp_TxnExpiryDateTime = $@"{JazzHelper.GetTransactionExpiry(30)}",
                pp_ReturnURL = "https://wajahatali.vercel.app/",
                ppmpf_1 = $@"{request.phoneNumber}",
                ppmpf_2 = "",
                ppmpf_3 = "",
                ppmpf_4 = "",
                ppmpf_5 = "",
                pp_SecureHash = "",
            };

            try
            {
                #region A Way To Request Jazz Payment Gateway
                string json = System.Text.Json.JsonSerializer.Serialize(paymentData);
                Uri baseAddress = new Uri($"https://sandbox.jazzcash.com.pk/ApplicationAPI/API/2.0/Purchase/DoMWalletTransaction");
                var httpContent = new StringContent(json, System.Text.Encoding.UTF8, "application/json");
                HttpClient client = new HttpClient();
                HttpResponseMessage httpresponse = await client.PostAsync(baseAddress, httpContent);
                dynamic responseResult = JsonConvert.DeserializeObject(await httpresponse.Content.ReadAsStringAsync());
                string responseMsg = responseResult["pp_ResponseMessage"];
                string responseStatusCode = responseResult["pp_ResponseCode"];

                #endregion

                if (responseStatusCode == "000" || 1 == 1)
                {
                    // check againt id_pk not email
                    DataTable currentuser = _database.SqlView($@"
				        SELECT pr.id_Pk,pr.UsernameOrEmail,pr.UserId,pr.Payload,pr.Approved,pr.[desc],pr.CreatedOn,
				        pr.cnic,pr.phoneNumber,pr.[withdrawal_amount],uad.Totalamount FROM tbl_PendingRequests pr LEFT JOIN 
				        tbl_useramountdetails uad ON pr.UserId = uad.UserId where pr.[id_pk] = '{request.id_Pk}' AND pr.UsernameOrEmail='{request.emailOrUsername}' ;");
                    if (currentuser.Rows.Count > 0)
                    {
                        if (Convert.ToInt32(currentuser.Rows[0]["Approved"]) == 0)
                        {

                            float withdrawl = (float)Convert.ToDouble(currentuser.Rows[0]["withdrawal_amount"]); // 10
                            float totatAmount = (float)Convert.ToDouble(currentuser.Rows[0]["Totalamount"]); // 
                            float commissionvalue = ((float)5 / (float)100) * withdrawl; // senior
                            float basevalue = totatAmount - (withdrawl + commissionvalue); // current user


                            DataTable seniordata = _database.SqlView($@"
                                SELECT * FROM tbl_useramountdetails usr  JOIN 
				                tbl_Referrals ref ON usr.EmailOrUsername = ref.ReferredEmail where ref.ReferrerEmail = '{request.emailOrUsername}'");

                            if (seniordata.Rows.Count > 0)
                            {
                                if ((float)Convert.ToDouble(seniordata.Rows[0]["TotalAmount"]) > 0)
                                {
                                    DataTable seniordatauser = _database.SqlView($@"UPDATE tbl_useramountdetails SET TotalAmount= TotalAmount + '{commissionvalue}'  WHERE EmailOrUsername = '{seniordata.Rows[0]["EmailOrUsername"]}'");

                                }

                            }

                            DataTable updateUserAmount = _database.SqlView($@"UPDATE tbl_useramountdetails SET TotalAmount = '{basevalue}' WHERE EmailOrUsername = '{request.emailOrUsername}'");
                            DataTable setApprovedpayment = _database.SqlView($@"UPDATE tbl_PendingRequests SET  [withdrawal_amount] = 0, Approved = 1 WHERE UsernameOrEmail = '{request.emailOrUsername}'");

                        }
                        else
                        {
                            response.message = "Transaction Already Approved";
                            response.success = false;
                            return response;
                        }
                    }

                }
                //return responseResult;response
            }
            catch (Exception e)
            {
                response.message = "Unable To Proceed Transaction";
                response.success = false;
                return response;
            }

            response.message = "Transaction Approved";
            response.success = true;
            return response;
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
