using Microsoft.AspNetCore.Cors;
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
    [EnableCors("AllowSpecificOrigin")]
    [ApiController]
    public class ReferralsController : Auth_Controller
    {
        private readonly IReferralServices _service;
        private readonly IJwtHelper _jwt;
        private readonly IHttpContextAccessor _HttpContextAccessor;

        public ReferralsController(IReferralServices service, IJwtHelper jwt, IHttpContextAccessor httpContextAccessor, IDatabase database) : base(httpContextAccessor, database)
        {
            _service= service;
            _jwt= jwt;
            _HttpContextAccessor = httpContextAccessor;
        }

        [HttpPost]
        [Route("referral")]
        public IActionResult GenerateReferralLink([FromBody] ReferralLinkRequest request)
        {
            // Find the user by email
             string Email =  _jwt.Email;
             string UserId = _jwt.UserId;

            // unique referral code for the user
            string referralCode = _service.GenerateReferralCode();

            //make request
            request.ReferredEmail = Email;
            request.ReferredUserId = UserId;
            request.ReferralCode = referralCode;

            // Save the referral code to the user's record
            StoreCode response = _service.SaveInDatabase(request);

            // Return the referral link
            var referralLink = $"http://localhost:3000/referral?code={referralCode}";
            return Ok(referralLink);
        }

        [HttpPost]
        [HttpPost("commission")]
        //public IActionResult CalculateCommission([FromBody] CommissionRequest request)
        public IActionResult CalculateCommission([FromBody] double request)
        {
            // Find the referrer and referred users by referral code
            //var referrer = _context.Users.SingleOrDefault(u => u.ReferralCode == request.ReferralCode);
            //var referredUser = _context.Users.SingleOrDefault(u => u.UserId == request.ReferredUserId);

            // Calculate the commission amount
            //var commissionAmount = request.PurchaseAmount * 0.1m;

            // Save the commission to the referral record
            //var referral = new Referral
            //{
            //    ReferralCode = request.ReferralCode,
            //    ReferredUserId = request.ReferredUserId,
            //    ReferrerUserId = referrer.UserId,
            //    ReferralDate = DateTime.Now,
            //    CommissionAmount = commissionAmount
            //};
            //_context.Referrals.Add(referral);
            //_context.SaveChanges();

            // Update the referrer's balance
            //_context.SaveChanges();

            // Return the commission amount
           // return Ok(commissionAmount);
            return Ok();
        }
    }
}
