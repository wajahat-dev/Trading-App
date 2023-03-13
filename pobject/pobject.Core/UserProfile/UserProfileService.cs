using pobject.Core.DatabaseEnvironment;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using pobject.Core.Signup;
using Microsoft.Net.Http.Headers;
using System.Collections;
using pobject.Core.CommonHelper;

namespace pobject.Core.UserProfile
{
    public class UserProfileService : IUserProfileService
    {
        private readonly IDatabase _database;
        public UserProfileService(IDatabase database)
        {
            _database = database;
        }
        public DataTable GetUserProfile(string UsernameOrEmail, string UserId)
        {
            DataTable user;
            try
            {
                List<SqlParameter> param = new List<SqlParameter>();
                param.Add(new SqlParameter("@UsernameOrEmail", UsernameOrEmail));
                param.Add(new SqlParameter("@UserId", UserId));
                user = _database.SqlView($@"
SELECT a.referral_code, a.EmailOrUsername,a.USERID,b.CNIC,EMAIL,DISPLAYNAME,PHONE,COUNTRY,DOB,b.CREATEDON 
FROM TBL_USERS a INNER JOIN TBL_USERINFO b ON a.UserId = b.UserId AND a.UserNumber = b.UserNumber
WHERE a.EmailOrUsername = @UsernameOrEmail AND a.USERID = @UserId",param);
                if (user.Rows.Count > 0)
                {
                    return user;
                }
            }
            catch (Exception e)
            {
                return null;
            }
            return new DataTable();
        }

        public DataTable GetAllUserProfile()
        {
            DataTable user;
            try
            {
                List<SqlParameter> param = new List<SqlParameter>();
               
                user = _database.SqlView($@"
SELECT a.inActivedate, a.inActivedate, a.UserId, a.EmailOrUsername,a.USERID,b.CNIC,EMAIL,DISPLAYNAME,PHONE,COUNTRY,DOB,b.CREATEDON 
FROM TBL_USERS a INNER JOIN TBL_USERINFO b ON a.UserId = b.UserId AND a.UserNumber = b.UserNumber");
                if (user.Rows.Count > 0)
                {
                    return user;
                }
            }
            catch (Exception e)
            {
                return null;
            }
            return new DataTable();
        }

        public string GetUserReferral() {

            return "";
        }

      
        public UserFinanceData UserGridData(string _bearer_token)
        {
            UserFinanceData reponse = new UserFinanceData();
            string email = globalfunctions.DecodeToken(_bearer_token);
            DataTable user = _database.SqlView($"select * from tbl_useramountdetails where EmailOrUsername =  '{email}' ");
            DataTable sums = _database.SqlView($"select sum(TotalAmount) from tbl_useramountdetails where EmailOrUsername =  '{email}' ");
            if (user.Rows.Count > 0)
            {
                reponse.griddata = user;
            }


            return reponse;
        }


        public UserProfile_Response StoreUserProfile(UserProfile_Request request, Internal_JWT_Request jwt = null)
        {
            UserProfile_Response response = new UserProfile_Response();
            try
            {


                String Query = String.Empty;



                List<SqlParameter> sqlParameters = new List<SqlParameter>();
                sqlParameters.Add(new SqlParameter("@CNIC", request.CNIC)); //should be readonly
                sqlParameters.Add(new SqlParameter("@DISPLAYNAME", request.DISPLAYNAME));
                sqlParameters.Add(new SqlParameter("@PHONE", request.PHONE));
                sqlParameters.Add(new SqlParameter("@COUNTRY", request.COUNTRY));
                sqlParameters.Add(new SqlParameter("@DOB", request.DOB));
                string block = "";
                if (request.BlockNow)
                {
                    block = " ,INACTIVEDATE = SYSDATETIME() ";
                }
                


                //sqlParameters.Add(new SqlParameter("@EMAIL", request.Email));    //secondary Email

                //Logged In User
                sqlParameters.Add(new SqlParameter("@EmailOrUsername", jwt.Email));    
                sqlParameters.Add(new SqlParameter("@UserId", jwt.UserId));
          


                DataTable dt = GetUserProfile(jwt.Email,jwt.UserId);
                if (dt.Rows.Count == 0)  //measns first time user making profile
                {
                    DataTable user = _database.SqlView($"select UserNumber from tbl_users where userId = '{jwt.UserId}' and EmailOrUsername='{jwt.Email}'");
                        if (user.Rows.Count > 0)
                    {
                        string UserNumber = Convert.ToString(user.Rows[0]["UserNumber"]);
                        Query = $@"INSERT INTO tbl_UserInfo(CNIC,UserNumber,UserId,DisplayName,Phone,country,DOB) 
values(@CNIC ,{UserNumber},@UserId, @DISPLAYNAME, @PHONE, @COUNTRY , @DOB)";
                    }
                }
                else
                {
                    Query = $@"UPDATE tbl_UserInfo 
SET CNIC = @CNIC , DISPLAYNAME = @DISPLAYNAME, PHONE = @PHONE, COUNTRY = @COUNTRY , DOB = @DOB {block}
WHERE UserId = @UserId";
                }

                int affected = Query != null ? _database.ExecuteNonQuery(Query, sqlParameters) : 0;
                if (affected > 0)
                {
                    response.GoodResponse= true;
                    response.MessageBox = "Successfully Updated";
                }
            }
            catch (Exception e)
            {
                response.MessageBox = "exception due to " + e;
                return response;
            }
            response.GoodResponse = true;
            return response;
        }
    }
}
