﻿using pobject.Core.DatabaseEnvironment;
using pobject.Core.OtherServices;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pobject.Core.Transactions
{

    public class TransactionsService : ITransactionsService
    {
        private readonly IDatabase _database;
        public TransactionsService(IDatabase database)
        {
            _database = database;
        }
        public StoreCode Withdrawl(Transaction_Withdrawl request)
        {
            StoreCode response = new StoreCode();
            try
            {
                List<SqlParameter> param = new List<SqlParameter>();
                param.Add(new SqlParameter("@UserId", request.Referred_UserId));
                string EdQuery = $"select UserNumber,EmailOrUsername,Referral_Code from tbl_users where User_Id = '{request.Referred_UserId}' and (InActiveDate == '' || InActiveDate is null)";
                DataTable Referred = _database.SqlView(EdQuery, param);
                if (Referred.Rows.Count > 0)
                {
                    //add 5 % Commission to referred Account
                }
                else
                {
                    //Continue to Simple Withdrwal
                }
            }
            catch (Exception e)
            {
                response.Success = false;
                response.MessageBox = "Exception due to " + e;
                return response;
            }
            response.Success = true;
            return response;
        }

        public Boolean updateamount(string Referral_UserId,int amount)
        {
            string existuserquery = $"select * from tbl_useramountdetails where UserId = '{Referral_UserId}'";
            DataTable userExist = _database.SqlView(existuserquery);
            if (userExist.Rows.Count > 0)
            {
                // give message if amount is less then zero
                string useruserquery = $@"UPDATE tbl_useramountdetails SET 
                        EmailOrUsername = '{userExist.Rows[0]["EmailOrUsername"]}', 
                        UserId ='{userExist.Rows[0]["UserId"]}',TotalAmount= TotalAmount + '{amount}', 
                        Date = '{DateTime.Now}'
                        
                        WHERE UserId = '{Referral_UserId}'";
                _database.SqlView(useruserquery);

                return true;
            }
            return false;
        }


        public StoreCode deposit(Transaction_Deposit request)
        {
            StoreCode response = new StoreCode();
            try
            {
                Boolean isAdded = updateamount(request.Referral_UserId, request.amount);
                if (isAdded)
                {
                    response.MessageBox = "Updated User Data";
                    response.Success = true;
                    return response;
                }
            }
            catch (Exception e)
            {
                response.Success = false;
                response.MessageBox = "Exception due to " + e;
                return response;
            }
            response.MessageBox = "No User Found";
            response.Success = false;
            return response;
        }

    }
}
