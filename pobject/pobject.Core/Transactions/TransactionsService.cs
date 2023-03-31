using pobject.Core.DatabaseEnvironment;
using pobject.Core.OtherServices;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pobject.Core.CommonHelper;
using Microsoft.Net.Http.Headers;


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
                        Date = '{DateTime.Now}',
                        Investment=Investment + '{amount}'
                        
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

        public StoreCode sentamount(SetAmount request, string useremail)
        {
            StoreCode response = new StoreCode();
            try
            {
                
                
                DataTable receiver = _database.SqlView($@"select * from tbl_useramountdetails where EmailOrUsername='{request.UserEmail}'"); // receiver
                DataTable isReceiverAdmin = _database.SqlView($@"select * from tbl_users where EmailOrUsername='{request.UserEmail}' AND RoleCode='A'"); // sent to admin
                DataTable isSenderAdmin = _database.SqlView($@"select * from tbl_users where EmailOrUsername='{useremail}' AND RoleCode='A'"); // sent to admin
                Boolean isAdmin = isSenderAdmin.Rows.Count > 0 ? true : false;
                if (receiver.Rows.Count == 0 || request.UserEmail == useremail || isReceiverAdmin.Rows.Count > 0)
                {
                    response.MessageBox = "This user don\'t exists";
                    response.Success = false;
                    return response;
                }

                DataTable userdata = _database.SqlView($@"select * from tbl_useramountdetails where EmailOrUsername='{useremail}'");  // sender
                if (userdata.Rows.Count > 0)
                {
                    if ( request.Amount > (float)Convert.ToDouble(userdata.Rows[0]["TotalAmount"]))
                    {
                        response.MessageBox = "You Don\'t have much balance";
                        response.Success = false;
                        return response;
                    }
                    if (!isAdmin && request.Amount > (float)Convert.ToDouble(userdata.Rows[0]["Investment"]))
                    {
                        response.MessageBox = "Your Profit amount is less than you current amount";
                        response.Success = false;
                        return response;
                    }
                }
                DataTable deductsender = _database.SqlView($@"UPDATE [dbo].[tbl_useramountdetails] SET [TotalAmount] = TotalAmount - {request.Amount} WHERE [EmailOrUsername] = '{useremail}'");
                DataTable addreceiver = _database.SqlView($@"UPDATE [dbo].[tbl_useramountdetails] SET [TotalAmount] = TotalAmount + {request.Amount}, Investment = Investment + '{request.Amount}' WHERE [EmailOrUsername] = '{request.UserEmail}'");


            }
            catch (Exception e)
            {
                response.Success = false;
                response.MessageBox = "Exception due to " + e;
                return response;
            }
            response.MessageBox = $@"Send {request.Amount} to {request.UserEmail}";
            response.Success = true;
            return response;
        }

    }
}
