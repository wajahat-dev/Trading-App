﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using pobject.API.Helpers;
using pobject.Core;
using pobject.Core.AuthBase;
using pobject.Core.DatabaseEnvironment;
using pobject.Core.Models;
using pobject.Core.OtherServices;
using pobject.Core.Transactions;

namespace pobject.API.Controllers
{
    [Route("api/transaction")]
    [ApiController]
    public class TransactionController : Auth_Controller
    {
        private readonly ITransactionsService _TransactionsService;
        private readonly IHttpContextAccessor _HttpContextAccessor;
        private readonly IJwtHelper _JwtHelper;
        public TransactionController(ITransactionsService TransactionsService, IJwtHelper jwtHelper, IHttpContextAccessor httpContextAccessor, IDatabase database) : base(httpContextAccessor, database)
        {
			_TransactionsService = TransactionsService;
            _HttpContextAccessor= httpContextAccessor;
            _JwtHelper= jwtHelper;
        } 
        [HttpPost]
        [Route("Withdrawl")]
        public async Task<IActionResult> WithDrwal(Transaction_Withdrawl request)
        { 
            var response = _TransactionsService.Withdrawl(request);
            return Ok(response);
        }


        [HttpPost]
        [HttpPost("depositamount")]

        public StoreCode depositAmount(Transaction_Deposit request)
        {
            StoreCode response = _TransactionsService.deposit(request);
            return response;
        }


    }
}
