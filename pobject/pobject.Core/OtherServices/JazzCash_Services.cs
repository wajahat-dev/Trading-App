using Newtonsoft.Json;
using pobject.Core.DatabaseEnvironment;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pobject.Core.OtherServices
{
    public class JazzCashRequestSubmission
    {
        public string EmailOrUsername { get; set; }
        public string UserID { get; set; }
        public string Description { get; set; }
        public string amount { get; set; }
        public string cnic { get; set; }
        public string phoneNumber { get; set; }
        public dynamic Payload { get; set; } // compelete Json.stringyfy payload
    }
    
    public interface IJazzCash_Services
    {
        public StoreCode Submit_JazzCash_Request(JazzCashRequestSubmission request);
        public StoreCode GetAllPendingRequest();
    }
    public class JazzCash_Services : IJazzCash_Services
    {
        private readonly IDatabase _database;
        public JazzCash_Services(IDatabase database)
        {
            _database= database;
        }

        public StoreCode Submit_JazzCash_Request(JazzCashRequestSubmission request)
        {
            StoreCode response = new StoreCode();
            try
            {

                if (String.IsNullOrEmpty(request.EmailOrUsername))
                {
                    response.MessageBox = "Email Not Found";
                    response.Success = false;
                    return response;
                }
                if (String.IsNullOrEmpty(request.UserID))
                {
                    response.MessageBox = "UserID Not Found";
                    response.Success = false;
                    return response;
                }
                if (String.IsNullOrEmpty(request.cnic))
                {
                    response.MessageBox = "Cnic Not Found";
                    response.Success = false;
                    return response;
                }

                DataTable withdrawerTransaction = _database.SqlView($@"select * from tbl_useramountdetails WHERE EmailOrUsername = '{request.EmailOrUsername}'");

                if (withdrawerTransaction.Rows.Count == 0)
                {
                    response.MessageBox = "User Not Found";
                    response.Success = false;
                    return response;
                }
                withdrawerTransaction.Rows[0]["TotalAmount"] = withdrawerTransaction.Rows[0]["TotalAmount"] != DBNull.Value ? Convert.ToDouble(withdrawerTransaction.Rows[0]["TotalAmount"]) : 0.0;
                withdrawerTransaction.Rows[0]["Investment"] = withdrawerTransaction.Rows[0]["Investment"] != DBNull.Value ? Convert.ToDouble(withdrawerTransaction.Rows[0]["Investment"]) : 0.0;


                DataTable wihdrawerInfo = _database.SqlView($@"select * from tbl_users where EmailOrUsername='{request.EmailOrUsername}'"); // withdrawer 
                Boolean isWihdrawerAdmin = wihdrawerInfo.Rows[0]["RoleCode"].ToString() == "A" ? true : false;

                if (isWihdrawerAdmin)
                {
                    // sender (Admin) can sent all money
                    if (Math.Round(Convert.ToDouble(request.amount)) > Math.Round((float)Convert.ToDouble(withdrawerTransaction.Rows[0]["TotalAmount"])))
                    {
                        response.MessageBox = "Your Balance amount is less than you current amount";
                        response.Success = false;
                        return response;
                    }

                    response.MessageBox = "Admin Can't Withdraw at this moment";
                    response.Success = false;
                    return response;
                }
                else
                {


                    if (Convert.ToDouble(withdrawerTransaction.Rows[0]["Totalamount"]) >= (Convert.ToDouble(withdrawerTransaction.Rows[0]["Investment"]) * 2.00))
                    {
                        // sender can sent all money

                        DataTable sumOfPendingWithdraws = _database.SqlView($@"select  COALESCE(sum(withdrawal_amount), 0) as withdrawal_amount from tbl_PendingRequests where UsernameOrEmail = '{request.EmailOrUsername}' AND Approved=0 ");
                        Double differceAmount = Math.Round(Math.Abs((float)Convert.ToDouble(withdrawerTransaction.Rows[0]["TotalAmount"]) - Convert.ToDouble(sumOfPendingWithdraws.Rows[0]["withdrawal_amount"])));

                        if (Math.Round(Convert.ToDouble(request.amount)) > differceAmount)
                        {
                            response.MessageBox = "Your Profit amount is less than you current amount";
                            response.Success = false;
                            return response;
                        }


                    }
                    else
                    {
                        // sender only sent profit money

                        Double differceAmount = Math.Round(Math.Abs((float)Convert.ToDouble(withdrawerTransaction.Rows[0]["TotalAmount"]) - (float)Convert.ToDouble(withdrawerTransaction.Rows[0]["Investment"])));
                        DataTable sumOfPendingWithdraws = _database.SqlView($@"select  COALESCE(sum(withdrawal_amount), 0) as withdrawal_amount from tbl_PendingRequests where UsernameOrEmail = '{request.EmailOrUsername}' AND Approved=0 ");

                        if ( Math.Round(Convert.ToDouble(request.amount)) > Math.Abs((differceAmount - Convert.ToDouble(sumOfPendingWithdraws.Rows[0]["withdrawal_amount"]))))
                        {
                            response.MessageBox = "Your Profit amount is less than you current amount";
                            response.Success = false;
                            return response;
                        }

                    }


                    List<SqlParameter> param = new List<SqlParameter>();
                    param.Add(new SqlParameter("@UsernameOrEmail", request.EmailOrUsername));
                    param.Add(new SqlParameter("@UserId", request.UserID));
                    param.Add(new SqlParameter("@Payload", request.Payload.ToString()));
                    param.Add(new SqlParameter("@desc", request.Description));
                    param.Add(new SqlParameter("@cnic", request.cnic));
                    param.Add(new SqlParameter("@phoneNumber", request.phoneNumber));
                    string insertPendingWirthdrawQuery = $@"insert into tbl_PendingRequests(UsernameOrEmail,UserId,[desc],cnic,phoneNumber,payload,withdrawal_amount) values(@UsernameOrEmail,@UserId,@desc,@cnic,@phoneNumber, '','{request.amount}')";
                    int affected = _database.ExecuteNonQuery(insertPendingWirthdrawQuery, param);
                    if (affected > 0)
                    {
                        response.MessageBox = "Successfully Submitted Request to Admin";
                    }

                }

                

            }
            catch (Exception e)
            {
                response.Success = false;
                response.MessageBox = "exception due to "+e;
                return response;
            }
            response.MessageBox = "Successfully Submitted Request to Admin";
            response.Success= true;
            return response;
        }


  

        public StoreCode GetAllPendingRequest()
        { 
            StoreCode response = new StoreCode();
            try
            { 
                DataTable requests = _database.SqlView($@"
				SELECT pr.id_Pk,pr.UsernameOrEmail,pr.UserId,pr.Payload,pr.Approved,pr.[desc],pr.CreatedOn,
				pr.cnic,pr.phoneNumber,pr.[withdrawal_amount],uad.Totalamount FROM tbl_PendingRequests pr LEFT JOIN 
				tbl_useramountdetails uad ON pr.UserId = uad.UserId order by id_pk desc");
                response.Information = (DataTable)requests;
            }
            catch (Exception e)
            {
                response.Success = false;
                response.MessageBox = "exception due to " + e;
                return response;
            }
            response.Success = true;
            return response;
        }
    }
}
