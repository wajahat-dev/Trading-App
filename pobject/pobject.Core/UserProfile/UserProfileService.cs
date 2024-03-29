﻿using pobject.Core.DatabaseEnvironment;
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
           
            try
            {

              
                DataTable user = _database.SqlView($@"
SELECT COALESCE(c.TotalAmount, 0) AS TotalAmount,a.RoleCode, a.inActivedate, a.inActivedate, a.UserId, a.EmailOrUsername, a.USERID, b.CNIC, b.EMAIL, b.DISPLAYNAME, b.PHONE, b.COUNTRY, b.DOB, b.CREATEDON
                FROM TBL_USERS a
                INNER JOIN TBL_USERINFO b ON a.UserId = b.UserId AND a.UserNumber = b.UserNumber AND a.RoleCode = 'X'               
                LEFT JOIN tbl_useramountdetails c ON a.UserId = c.UserId order by CreatedOn desc

                    ");



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
            DataTable user = _database.SqlView($"select * from tbl_useramountdetails where EmailOrUsername =  '{email}'  ORDER BY date asc");
            DataTable userInfo = _database.SqlView($"select * from tbl_users where EmailOrUsername =  '{email}'");
            DataTable historydata = _database.SqlView($"select * from tbl_useramountdetailshistory where EmailOrUsername =  '{email}'  ORDER BY date asc");
            DataTable latestRecord = _database.SqlView($@"select top 1* from tbl_useramountdetailshistory where EmailOrUsername = '{user.Rows[0]["EmailOrUsername"]}' order by Date DESC");
            try
            {
                if (user.Rows.Count > 0)
                {


                    if (userInfo.Rows[0]["RoleCode"].ToString() == "X")
                    {
                        if (historydata.Rows.Count == 0) // new created amount and have one transaction
                        {

                        //    string query = $@" INSERT INTO tbl_useramountdetailshistory (EmailOrUsername, UserId, TotalAmount, Date)
                        //values ('{user.Rows[0]["EmailOrUsername"]}','{user.Rows[0]["UserId"]}',{user.Rows[0]["TotalAmount"]} ,GETDATE() )";
                        //    _database.SqlView(query);
                        }
                        else
                        {


                           Double totalAmount  = Convert.ToDouble(user.Rows[0]["Totalamount"]); // As per, Profit should be percent of investment amount
                            Double profit = 0.00;
                            DataTable maxdate = _database.SqlView($@"SELECT COALESCE(MAX(Date), GETDATE()) as Date FROM tbl_useramountdetailshistory WHERE [EmailOrUsername] = '{user.Rows[0]["EmailOrUsername"]}'");
                            DateTime dateChecked = DateTime.Parse(maxdate.Rows[0]["Date"].ToString());


                            float totatAmount = (float)Convert.ToDouble(user.Rows[0]["Totalamount"]);
                            float investment = (float)Convert.ToDouble(user.Rows[0]["Investment"]);
                            float profitTmp = (float)Convert.ToDouble(user.Rows[0]["Profit"]);
                            float commission = (float)Convert.ToDouble(user.Rows[0]["Commission"]);
                            //DataTable crurrentdate = _database.SqlView($@"select GETDATE() as Date");
                            // dateChecked1 = DateTime.Parse(maxdate.Rows[0]["Date"].ToString());

                            if (dateChecked < DateTime.Now.Date)
                            {
                                while (dateChecked < DateTime.Now.Date)
                                {
                                    dateChecked = dateChecked.AddDays(1);
                                    if (investment >= 5 && investment < 100)
                                        profit = (Double)(investment * 0.03);
                                    else if (investment >= 100 && investment < 200)
                                        profit = (Double)(investment * 0.03);
                                    else if (investment >= 200 && investment < 1000)
                                        profit = (Double)(investment * 0.04);
                                    else if (investment >= 1000 && investment < 2000)
                                        profit = (Double)(investment * 0.055);
                                    else if (investment >= 2000 && investment < 50000)
                                        profit = (Double)(investment * 0.06);
                                    else if (investment >= 50000 && investment < 50001)
                                        profit = (Double)(investment * 0.065);
                                    else
                                        profit = 0;
                                    totalAmount += profit;
                                    _database.SqlView($@"INSERT INTO tbl_useramountdetailshistory (EmailOrUsername, UserId, TotalAmount, Date) 
VALUES ('{user.Rows[0]["EmailOrUsername"]}','{user.Rows[0]["UserId"]}', {totalAmount}, '{dateChecked}')");

                                }
                                latestRecord = _database.SqlView($@"select top 1* from tbl_useramountdetailshistory where EmailOrUsername = '{user.Rows[0]["EmailOrUsername"]}' order by Date DESC");
                                if (latestRecord.Rows.Count > 0)
                                {
                                    Double _profit = Convert.ToDouble(latestRecord.Rows[0]["TotalAmount"].ToString()) - (Convert.ToDouble(user.Rows[0]["Investment"].ToString()) + Convert.ToDouble(user.Rows[0]["Commission"].ToString()));
                                    if (_profit < 0)
                                    {
                                        _profit = 0.0;
                                    }
                                    DataTable updateRecord = _database.SqlView($@"UPDATE tbl_useramountdetails SET [TotalAmount] = '{latestRecord.Rows[0]["TotalAmount"]}', 
Profit = '{_profit}'
WHERE [EmailOrUsername] = '{user.Rows[0]["EmailOrUsername"]}'");

                                }
                            }
                            else
                            {
                                DataTable updateRecord = _database.SqlView($@"UPDATE tbl_useramountdetailshistory SET [TotalAmount] = '{investment + profitTmp + commission}'
                                WHERE [EmailOrUsername] = '{user.Rows[0]["EmailOrUsername"]}' AND id_Pk= '{latestRecord.Rows[0]["id_Pk"].ToString()}'");
                            }  
                        }
                    }
                    user = _database.SqlView($"select * from tbl_useramountdetails where EmailOrUsername =  '{email}'  ORDER BY date asc");
                    reponse.griddata = user;
                    reponse.totalamount = (float)Convert.ToDouble(user.Rows[0]["TotalAmount"]);
                    reponse.profit = (float)Convert.ToDouble(user.Rows[0]["Profit"]);
                    reponse.commission = (float)Convert.ToDouble(user.Rows[0]["commission"]);
                    reponse.investment = (float)Convert.ToDouble(user.Rows[0]["Investment"]);
                    reponse.historydata = _database.SqlView($"select * from tbl_useramountdetailshistory where EmailOrUsername =  '{email}'  ORDER BY date asc"); ;

                }
            }
            catch (Exception e)
            {

            }

            return reponse;
        }

        public UserFinanceData HistoryData(string _bearer_token)
        {
            UserFinanceData reponse = new UserFinanceData();
            string email = globalfunctions.DecodeToken(_bearer_token);
            DataTable user = _database.SqlView($"select * from tbl_useramountdetailshistory where EmailOrUsername =  '{email}'  ORDER BY date asc");
            if (user.Rows.Count > 0)
            {
                reponse.griddata = user;
            }
            else
            {
                reponse.griddata = new DataTable();
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
