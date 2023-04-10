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


                if (String.IsNullOrEmpty(request.emailOrUsername) || String.IsNullOrEmpty(request.id_Pk))
                {
                    response.message = "Selected User Not Found";
                    response.success = false;
                    return response;
                }

                DataTable withdrawer = _database.SqlView($@"
				        SELECT pr.id_Pk,pr.UsernameOrEmail,pr.UserId,pr.Payload,pr.Approved,pr.[desc],pr.CreatedOn,
				        pr.cnic,pr.phoneNumber,pr.[withdrawal_amount],uad.Totalamount FROM tbl_PendingRequests pr LEFT JOIN 
				        tbl_useramountdetails uad ON pr.UserId = uad.UserId where pr.[id_pk] = '{request.id_Pk}' AND pr.UsernameOrEmail='{request.emailOrUsername}' ;");


                if (withdrawer.Rows.Count == 0)
                {
                    response.message = "Selected User Not Found";
                    response.success = false;
                    return response;
                }

                if ((Convert.ToInt32(withdrawer.Rows[0]["Approved"]) != 0))
                {
                    response.message = "Tranction Already Completed";
                    response.success = false;
                    return response;
                }


                #region A Way To Request Jazz Payment Gateway
                string json = System.Text.Json.JsonSerializer.Serialize(paymentData);
                Uri baseAddress = new Uri($"https://sandbox.jazzcash.com.pk/ApplicationAPI/API/2.0/Purchase/DoMWalletTransaction");
                var httpContent = new StringContent(json, System.Text.Encoding.UTF8, "application/json");
                HttpClient client = new HttpClient();
                HttpResponseMessage httpresponse = await client.PostAsync(baseAddress, httpContent);
                dynamic responseResult = JsonConvert.DeserializeObject(await httpresponse.Content.ReadAsStringAsync());
                string responseMsg = responseResult["pp_ResponseMessage"];
                string responseStatusCode = responseResult["pp_ResponseCode"];
                //if (responseStatusCode != "000")
                //{
                //    response.message = "Unable To Proceed Transaction";
                //    response.success = false;
                //    return response;
                //}
                #endregion

                DataTable withdrawerTransactionInfo = _database.SqlView($@"select * from tbl_useramountdetails where EmailOrUsername = '{request.emailOrUsername}'");

                //float commissionvalue = ((float)5 / (float)100) * withdrawl; // withdrawer's senior
                //float basevalue = totatAmount - (withdrawl + commissionvalue); // withdrawer
                //float investment = (float)Convert.ToDouble(withdrawerTransactionInfo.Rows[0]["Investment"]);


                float withdrawl = (float)Convert.ToDouble(withdrawer.Rows[0]["withdrawal_amount"]); 
                float totatAmount = (float)Convert.ToDouble(withdrawerTransactionInfo.Rows[0]["Totalamount"]);
                float investment = (float)Convert.ToDouble(withdrawerTransactionInfo.Rows[0]["Investment"]);
                float profit = (float)Convert.ToDouble(withdrawerTransactionInfo.Rows[0]["Profit"]);
                float commission = (float)Convert.ToDouble(withdrawerTransactionInfo.Rows[0]["Commission"]);

                if (withdrawl > totatAmount)
                {
                    response.message = "Can't Transaction since user's balance is less than his withdrawal amount";
                    response.success = false;
                    return response;
                }

                float investmentTmp = investment;
                float profitTmp = profit - withdrawl;
                float commissionTmp = commission;

                if (profitTmp < 0)
                {
                    commissionTmp = commissionTmp + profitTmp;
                    profitTmp = 0;
                    if (commissionTmp < 0 ) {
                        investmentTmp = investmentTmp + commissionTmp;
                        commissionTmp = 0;
                    }
                }





                DataTable updateUserAmount = _database.SqlView($@"UPDATE tbl_useramountdetails SET TotalAmount = '{investmentTmp + profitTmp + commissionTmp}', Investment = '{investmentTmp}',
Commission= '{commissionTmp}', Profit= '{profitTmp}'

WHERE EmailOrUsername = '{request.emailOrUsername}'");
                DataTable setApprovedpayment = _database.SqlView($@"UPDATE tbl_PendingRequests SET  Approved = 1 WHERE UsernameOrEmail = '{request.emailOrUsername}' AND [id_pk]='{request.id_Pk}' ");

               



                // no need to give commision to senior as per user requirement
                //DataTable seniorTransaction = _database.SqlView($@"
                //                SELECT * FROM tbl_useramountdetails usr  JOIN 
                //    tbl_Referrals ref ON usr.EmailOrUsername = ref.ReferredEmail where ref.ReferrerEmail = '{request.emailOrUsername}'");

                //if (seniorTransaction.Rows.Count > 0)
                //{
                //if ((float)Convert.ToDouble(seniorTransaction.Rows[0]["TotalAmount"]) > 0)
                //{
                //    DataTable seniordatauser = _database.SqlView($@"UPDATE tbl_useramountdetails SET TotalAmount= TotalAmount + '{commissionvalue}'  WHERE EmailOrUsername = '{seniorTransaction.Rows[0]["EmailOrUsername"]}'");
                //}

                //}



            }
            catch (Exception e)
            {
                response.message = "Unable To Proceed Transaction";
                response.success = false;
                return response;
            }
            response.message = "Transaction Successfully Completed";
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
