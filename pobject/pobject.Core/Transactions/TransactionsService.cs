using pobject.Core.DatabaseEnvironment;
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
        private readonly IDatabase _database ;
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
                response.MessageBox = "Exception due to "+e;
                return response;
            }
            response.Success = true;
            return response;
        }

        public StoreCode deposit(Transaction_Deposit request)
        {
            StoreCode response = new StoreCode();
            try
            {
                string existuserquery = $"select * from tbl_useramountdetails where User_Id = '{request.Referral_UserId}'";
                DataTable userExist = _database.SqlView(existuserquery);
         
                if (userExist.Rows.Count > 0)
                {
                    string useruserquery = $@"UPDATE tbl_useramountdetails SET 
EmailOrUsername = '{userExist.Rows[0]["EmailOrUsername"]}', 
UserId ='{userExist.Rows[0]["UserId"]}',TotalAmount= TotalAmount + '{userExist.Rows[0]["TotalAmount"]}', 
Date = '{DateTime.Now}' +
                        WHERE User_Id = '{request.Referral_UserId}'";
                }
                else
                {
                    response.MessageBox = "No User Found";
                    response.Success = false;
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

    }
}
