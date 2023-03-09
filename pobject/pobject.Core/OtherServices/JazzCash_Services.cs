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
                //StringContent payloadContent = new StringContent(request.Payload.ToString(), System.Text.Encoding.UTF8, "application/json");
                string  payloadContent = request.Payload.ToString();
                List<SqlParameter> param = new List<SqlParameter>();
                param.Add(new SqlParameter("@UsernameOrEmail", request.EmailOrUsername));
                param.Add(new SqlParameter("@UserId", request.UserID));
                param.Add(new SqlParameter("@Payload", payloadContent));
                param.Add(new SqlParameter("@desc", request.Description));
                string query = $@"insert into tbl_PendingRequests(UsernameOrEmail,UserId,Payload,[desc]) values(@UsernameOrEmail,@UserId,@Payload,@desc)";
                int affected = _database.ExecuteNonQuery(query,param);
                if (affected > 0)
                {
                    response.MessageBox = "Successfully Submitted Request";
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
                DataTable requests = _database.SqlView("select * from tbl_PendingRequests");
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
