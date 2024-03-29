﻿using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using pobject.Core.CommonHelper;
using pobject.Core.Signup;
using pobject.Core.UserProfile;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace pobject.Core.DatabaseEnvironment
{
    public class Database : IDatabase
    {
        //Initialize Database Factory class

        private SqlConnection connection;
        private string connectionString { get; set; }
        private CustomerConfiguration clientConfig;
        string IDatabase.connectionString { get => connectionString; }

        public int ClientId { get => clientConfig.ID; }    //will generate dynamic

        private readonly IConfiguration _configuration;

        public Database(IConfiguration configuration, string pConnectionString = "")
        {
            _configuration = configuration;
            connectionString = pConnectionString;
            if (string.IsNullOrEmpty(pConnectionString))
            {
                connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            }
            connection = new SqlConnection(connectionString);
        }
        public int ExecuteNonQuery(string sqlCommand, List<SqlParameter> parameter = null)
        {
            int rowsAffected = 0;
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand(sqlCommand, con))
                    {
                        cmd.CommandType = CommandType.Text;
                        if (parameter != null)
                        {
                            foreach (SqlParameter item in parameter)
                            {
                                cmd.Parameters.Add(item);
                            }
                        }
                        con.Open();
                        rowsAffected = cmd.ExecuteNonQuery();
                        con.Close();
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
            return rowsAffected;
        }

        public DataTable SqlView(string sqlCommand)
        {
            DataTable dt = new DataTable();
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand(sqlCommand, con))
                    {
                        cmd.CommandType = CommandType.Text;
                        using (SqlDataAdapter sda = new SqlDataAdapter(cmd))
                        {
                            sda.Fill(dt);
                        }
                    }
                }
            }
            catch (Exception e)
            {
                throw;
            }
            return dt;
        }
        public DataTable SqlView(string sqlCommand, List<SqlParameter> param)
        {
            DataTable dt = new DataTable();
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand(sqlCommand, con))
                    {
                        cmd.CommandType = CommandType.Text;
                        foreach (SqlParameter item in param)
                        {
                            cmd.Parameters.Add(item);
                        }
                        using (SqlDataAdapter sda = new SqlDataAdapter(cmd))
                        {
                            sda.Fill(dt);
                        }
                    }
                }
            }
            catch (Exception e)
            {
                throw;
            }
            return dt;
        }
        private static void SetSqlRow<T>(T item, DataRow row) where T : new()
        {
            // go through each column
            foreach (DataColumn c in row.Table.Columns)
            {
                // find the property for the column
                PropertyInfo p = item.GetType().GetProperty(c.ColumnName, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);

                // if exists, set the value
                if (p != null && row[c] != DBNull.Value)
                {
                    p.SetValue(item, row[c], null);
                }
            }
        }
        public T SqlRow<T>(DataRow row) where T : new()
        {
            // create a new object
            T item = new T();

            // set the item
            SetSqlRow(item, row);

            // return 
            return item;
        }
        public void InitConnection(string UserId, string EmailOrUsername)
        {
            connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            connection = new SqlConnection(connectionString);
            List<SqlParameter> parameters = new List<SqlParameter>();
            parameters.Add(new SqlParameter("@EmailOrUsername", EmailOrUsername));
            parameters.Add(new SqlParameter("@UserId", UserId));
            DataTable ClientConfiguration = SqlView($"SELECT * FROM tbl_Users WHERE UserId = @UserId and  EmailOrUsername = @EmailOrUsername", parameters);

            if (ClientConfiguration.Rows.Count > 0)
            {
                //CustomerConfiguration cc = SqlRow<CustomerConfiguration>(ClientConfiguration.Rows[0]);
                //if (cc != null)
                //{
                //    clientConfig = cc;
                //    //connectionString = cc.DatabaseConnection;
                //    connection = new SqlConnection(connectionString);
                //}
            }
        }

        public Boolean RegisterReferral(Signup_Request request, string userid)
        {
            try
            {
                String Query = string.Empty;


                DataTable userdate = SqlView($@"select * from tbl_Users where referral_code = '{request.referral_code}'");
                if (userdate.Rows.Count > 0)
                {


                    Query = $@"INSERT INTO tbl_Referrals(ReferralCode,ReferredUserId,ReferredEmail, ReferrerUserId,ReferralDate,ReferrerEmail,CommissionAmount) 
                values('{request.referral_code}','{userdate.Rows[0]["UserId"]}', '{userdate.Rows[0]["EmailOrUsername"]}' , '{userid}', '{DateTime.Today}', '{request.UserNameOrEmail}' , 10)";

                    DataTable result1 = SqlView(Query);
                    return true;
                }
            }
            catch (Exception e)
            {

            }
            return false;
        }

        public Boolean addCommisionToSenior(String currentuserEmail, String Senior_ReferalCode, float pct)
        {
            try
            {
                DataTable senioruser = SqlView($@" SELECT * FROM tbl_users JOIN tbl_useramountdetails ON tbl_users.userid = tbl_useramountdetails.UserId WHERE tbl_users.referral_code =  '{Senior_ReferalCode}'");

                DataTable currentuser = SqlView($@"select * from tbl_useramountdetails where EmailOrUsername='{currentuserEmail}'");
                if (currentuser.Rows.Count > 0 & senioruser.Rows.Count > 0)
                {

                    if (Convert.ToInt32(currentuser.Rows[0]["TotalAmount"]) > 0)
                    {
                        //float commissionvalue = (pct / 100) * (float)Convert.ToDouble(currentuser.Rows[0]["TotalAmount"]);
                        //TotalAmount = TotalAmount + (TotalAmount * '{pct}')
                        string senioruserquery = $@"UPDATE tbl_useramountdetails SET 
                            TotalAmount = TotalAmount + (TotalAmount * '{pct}')
                            WHERE UserId = '{senioruser.Rows[0]["userid"]}'";
                        SqlView(senioruserquery);
                        return true;
                    }
                }
            }
            catch (Exception e)
            {

            }
            return false;
        }

        public Signup_filds_data GetSignUpData()
        {
            Signup_filds_data respone = new Signup_filds_data();
            try
            {
                DataTable countries = SqlView($@"select * from tbl_countries");
                respone.countries = countries;
            }
            catch (Exception e)
            {

            }
            return respone;
        }


        public Boolean UpdateUserAmount(Signup_Request request, String userid)
        {
            try
            {
                String Query = string.Empty;
                Query = $@"INSERT INTO tbl_useramountdetails (EmailOrUsername, UserId, TotalAmount, Date,Investment)
                    VALUES('{request.UserNameOrEmail}', '{userid}', 0, '{DateTime.Now}',0)";
                DataTable result1 = SqlView(Query);
                Boolean isGiveCommision = addCommisionToSenior(request.UserNameOrEmail, request.referral_code, 10);
                if (isGiveCommision)
                {
                    return true;
                }
            }
            catch (Exception e)
            {

            }
            return false;
        }

        public Signup_Response CreateNewUser(Signup_Request request, string RoleCodeIfLoggedInAsAdmin)
        {
            Signup_Response response = new Signup_Response();
            DataTable User = new DataTable();
            connectionString = _configuration["ConnectionStrings:DefaultConnection"];
            connection = new SqlConnection(connectionString);
            try
            {

                string Username = request.UserNameOrEmail;
                string password = request.Password;
                string password2 = request.ConfirmPassword;
                if (!string.IsNullOrEmpty(request.UserNameOrEmail) && !string.IsNullOrEmpty(request.Password) && !string.IsNullOrEmpty(request.ConfirmPassword))
                {
                    if (request.Password.Equals(request.ConfirmPassword))
                    {

                        string QueryForIdentification = $"select* from tbl_users where  EmailOrUsername = '{Username}'";
                        DataTable result1 = SqlView(QueryForIdentification);
                        if (result1.Rows.Count > 0)
                        {
                            response.MessageBox = "Email Already Exists";
                            response.Success = false;
                            return response;
                        }

                        string QueryForCNIC = $"select * from tbl_userinfo where cnic = '{request.cnic}'";
                        DataTable result2 = SqlView(QueryForCNIC);
                        if (result2.Rows.Count > 0)
                        {
                            response.MessageBox = "CNIC Already Exists";
                            response.Success = false;
                            return response;
                        }

                        string RoleCode = string.IsNullOrEmpty(RoleCodeIfLoggedInAsAdmin) ? "X" : RoleCodeIfLoggedInAsAdmin;

                        #region SECURITY
                        // Hash the password using SHA256
                        string pass = password; //always compare with first password, 
                        byte[] salt;
                        byte[] hash;
                        using (var sha256 = SHA256.Create())
                        {
                            salt = mycrpto.GenerateSalt();
                            hash = sha256.ComputeHash(mycrpto.Combine(salt, Encoding.UTF8.GetBytes(password)));
                            //now hash is the password
                        }
                        #endregion

                        response.referral_code = globalfunctions.GenerateReferralCode();

                        string Query = $@"
                        declare @UserNumber  as int = (select isnull((MAX(UserNumber)+1),1) from [tbl_users])
                        insert into tbl_users(UserNumber,UserId,EmailOrUsername,Password,Password2,Salt,RoleCode, referral_code) 
                        values(@UserNumber,NEWID(),@EmailOrUsername,@Password,@Password2,@salt,'{RoleCode}', '{response.referral_code}') 
                        select UserNumber,EmailOrUsername,UserId,InActiveDate,createdOn,RoleCode from tbl_users where UserNumber = @UserNumber and EmailOrUsername = @EmailOrUsername";
                        List<SqlParameter> param = new List<SqlParameter>();
                        param.Add(new SqlParameter("@EmailOrUsername", Username));
                        //param.Add(new SqlParameter("@Password",hash));
                        //param.Add(new SqlParameter("@Password2", hash));
                        param.Add(new SqlParameter("@Password", password));
                        param.Add(new SqlParameter("@Password2", password2));
                        param.Add(new SqlParameter("@Salt", salt));
                        User = SqlView(Query, param);


                        if (User.Rows.Count > 0)
                        {
                            // add amount
                            Boolean isInserted = UpdateUserAmount(request, User.Rows[0]["UserId"].ToString());
                            // add refferal code
                            if (!String.IsNullOrEmpty(request.referral_code) && request.referral_code != "N")
                            {
                                Boolean isRegistered = RegisterReferral(request, User.Rows[0]["UserId"].ToString());
                                if (!isRegistered)
                                {
                                    response.MessageBox = "Can't referred";
                                    response.Success = true;
                                    return response;
                                }

                            }

                            response.User = SqlRow<CreatedUser>(User.Rows[0]);

                            if (Convert.ToString(User.Rows[0]["RoleCode"]) == "X")
                            {
                                response.User.IsEndUser = true;
                            }
                            else if (Convert.ToString(User.Rows[0]["RoleCode"]) == "B")
                            {
                                response.User.IsSubAdmin = true;
                            }
                            else if (Convert.ToString(User.Rows[0]["RoleCode"]) == "A")
                            {
                                response.User.IsAdmin = true;
                            }

                            //changing column Names for sending frontEnd 
                            response.User.User_ID = User.Rows[0]["UserId"].ToString();
                            response.User.DisplayName = request.DisplayName;
                            response.MessageBox = "successfully created.";
                            response.Success = true;
                        }
                    }
                    else
                    {
                        response.MessageBox = "Both password must match.";
                    }
                }
                else
                {
                    response.MessageBox = "Username or Password is required to continue.";
                }
            }
            catch (Exception e)
            {
                response.Success = false;
                response.MessageBox = "Exception found due to " + e.Message;
                return response;
            }
            return response;
        }
        private CreatedUser AttachClient_To_Configured_Database(string username, string password, string Name)
        {
            CreatedUser user = null;
            string Query = $@"
                            insert into tbl_Users(username,userpassword,displayname,Clientid) 
                            values('{username}','{password}','{Name}',{ClientId}) 
                            select [USERID], USERNAME, [displayname], CreatedOn, CLIENTID 
                            FROM tbl_Users WHERE Clientid = {ClientId}";
            DataTable result = SqlView(Query);
            if (result.Rows.Count > 0)
            {
                user = SqlRow<CreatedUser>(result.Rows[0]);
            }
            return user;
        }


        public DataTable SqlView(string sqlCommand, string ConnectionString = "")
        {
            DataTable dt = new DataTable();
            try
            {
                if (!string.IsNullOrEmpty(ConnectionString))
                {
                    connectionString = ConnectionString;
                }
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    using (SqlCommand cmd = new SqlCommand(sqlCommand, con))
                    {
                        cmd.CommandType = CommandType.Text;
                        using (SqlDataAdapter sda = new SqlDataAdapter(cmd))
                        {
                            sda.Fill(dt);
                        }
                    }
                }
            }
            catch (Exception e)
            {
                throw;
            }
            return dt;
        }


    }
}
