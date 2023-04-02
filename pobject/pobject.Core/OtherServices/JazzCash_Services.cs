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
                string  payloadContent = request.Payload.ToString();
                List<SqlParameter> param = new List<SqlParameter>();
                param.Add(new SqlParameter("@UsernameOrEmail", request.EmailOrUsername));
                param.Add(new SqlParameter("@UserId", request.UserID));
                param.Add(new SqlParameter("@Payload", payloadContent));
                param.Add(new SqlParameter("@desc", request.Description));
                param.Add(new SqlParameter("@cnic", request.cnic));
                param.Add(new SqlParameter("@phoneNumber", request.phoneNumber));

                Boolean flag = true; // false: can withdrawal all amount, true: can't withdrawal all amount
               
                DataTable userAmount = _database.SqlView($@"select * from tbl_useramountdetails WHERE EmailOrUsername = '{request.EmailOrUsername}'");
                if (userAmount.Rows.Count > 0)
                {
                    Double TotalAmount = Convert.ToDouble(userAmount.Rows[0]["TotalAmount"]);
                    if ( (Convert.ToDouble(userAmount.Rows[0]["Investment"]) * 2) <= TotalAmount)
                    {
                        flag = false;
                    }
                    if (TotalAmount < Convert.ToDouble(request.amount))
                    {
                        response.MessageBox = "Your Amuont is greater than balance";
                        response.Success = false;
                        return response;
                    }
                    if (flag)
                    {
                        
                        Double investment = userAmount.Rows[0]["Investment"] != DBNull.Value ? Convert.ToDouble(userAmount.Rows[0]["Investment"]) : 0.0;

                        double difference = Math.Abs(investment - TotalAmount);
                        double roundedResult = Math.Round(difference, 1);

                        if (roundedResult < Convert.ToDouble(request.amount))
                        {
                            response.MessageBox = "Your Profit amount is less than you current amount";
                            response.Success = false;
                            return response;
                        }
                        flag = true;
                    }

                    DataTable sumOfalreadyPending = _database.SqlView($@"select  COALESCE(sum(withdrawal_amount), 0) as totalSum from tbl_PendingRequests where UsernameOrEmail = '{request.EmailOrUsername}' AND Approved=0 ");
                    //Double total = Convert.ToDouble(userAmount.Rows[0]["Investment"]) + Convert.ToDouble(sumOfalreadyPending.Rows[0]["totalSum"]) + Convert.ToDouble(request.amount);

                    Double total = 0;
                    Boolean conditionmaker = false;
                    if (flag)
                    {
                        total = Convert.ToDouble(userAmount.Rows[0]["Investment"]) + Convert.ToDouble(sumOfalreadyPending.Rows[0]["totalSum"]) + Convert.ToDouble(request.amount);
                        conditionmaker = Math.Round(total, 1) <= Math.Round(Convert.ToDouble(userAmount.Rows[0]["TotalAmount"]), 1);
                    }
                    else
                    {
                        
                        total = Convert.ToDouble(sumOfalreadyPending.Rows[0]["totalSum"]) + Convert.ToDouble(request.amount);
                        conditionmaker = Math.Round(total, 1) > Math.Round(TotalAmount, 1) ? false : true;
                    }


                    if (conditionmaker)
                    {
                        string query = $@"insert into tbl_PendingRequests(UsernameOrEmail,UserId,[desc],cnic,phoneNumber,payload,withdrawal_amount) values(@UsernameOrEmail,@UserId,@desc,@cnic,@phoneNumber, '','{request.amount}')";
                        int affected = _database.ExecuteNonQuery(query, param);
                        if (affected > 0)
                        {
                            response.MessageBox = "Successfully Submitted Request";
                        }
                    }
                    else
                    {
                        response.Success = false;
                        response.MessageBox = "Your Profit has been Ended, Wait for the Admin to accept your transactions";
                        return response;
                    }
                }
                else
                {
                    response.Success = false;
                    response.MessageBox = "Can't WithDraw At this moment";
                    return response;
                }

                

            }
            catch (Exception e)
            {
                response.Success = false;
                response.MessageBox = "exception due to "+e;
                return response;
            }
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
