using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Net.Http.Headers;
using Newtonsoft.Json.Linq;
using pobject.Core.CommonHelper;
using pobject.Core.DatabaseEnvironment;
using pobject.Core.Signup;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Reflection;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Net.Mail;
using System.Net;
using System.Data.SqlTypes;
using pobject.Core.CommonHelper;

namespace pobject.Core.Login
{
    public class LoginService : ILoginService
    {
        private readonly IDatabase _database;
        private readonly IConfiguration _configuration;
        public LoginService(IDatabase database, IConfiguration configuration)
        {
            _database = database;
            _configuration = configuration;
        }

        public Login_Response DoLogin(Login_Request request)
        {
            //This should Make new APICLIENT or SEPERATE APICLIENT_AUTHENTICATING_DATABASE
            Login_Response response = new Login_Response();
            try
            {
                if (request != null)
                {
                    string username = request.Username;
                    string pass = request.Password; 
                    string Query = $@"select * from tbl_Users 
                                      Where username = '{username}' and password = '{pass}' ";
                    DataTable result = _database.SqlView(Query);
                    if (result.Rows.Count > 0)
                    {
                        response.ClientId = Convert.ToInt32(result.Rows[0]["Clientid"]);
                        //response.User = result;
                        response.Success = true;
                        response.Token = Guid.NewGuid().ToString();
                        response.MessageBox = "successfully Logged In...";
                    }
                    else
                    {
                        response.User = null;
                        response.Success = false;
                        response.MessageBox = "Incorrect username or password";
                    }
                }
            }
            catch (Exception e)
            {
                response.MessageBox = "Exception found due to " + e.Message;
                response.Success = false;
                return response;
            }
            return response;
        }


        public Login_Response LOGIN(Login_Request request)
        {
            Login_Response response = new Login_Response();
            try
            {
                string connectionString = _configuration["ConnectionStrings:DefaultConnection"];  
                string username = request.Username;
                string password = request.Password.Trim();
                
                string Query = $@"select * from tbl_users Where EmailOrUsername = '{username}' and password = '{password}' and password2='{password}' ";
                
                
                DataTable result = _database.SqlView(Query, connectionString);
                if (result.Rows.Count > 0)
                {
               

                bool IsFound = false;
                    #region SECUTITY
                    // Retrieve the salt and hash from the database and compare to the entered password
                    //byte[] retrievedSalt = (byte[])result.Rows[0]["salt"];
                    //byte[] retrievedHash = (byte[])result.Rows[0]["hash"];
                    //using (var sha256 = SHA256.Create())
                    //{
                    //    byte[] enteredHash = sha256.ComputeHash(mycrpto.Combine(retrievedSalt, Encoding.UTF8.GetBytes(password)));
                    //    if (mycrpto.Compare(enteredHash, retrievedHash))
                    //    {
                    //        IsFound = true;     //Password is correct.
                    //    }
                    //    else
                    //    {
                    //        IsFound = false;        //Password is Incorrect.
                    //    }
                    //}
                    #endregion
                    IsFound = true;
                    if (IsFound)
                    {
                        response.User = SqlRow<CreatedUser>(result.Rows[0]);
                        //X measne End Users
                        //A Means Main Admin [Creator]
                        //B Means Sub-Admins
                        if (Convert.ToString(result.Rows[0]["RoleCode"]) == "A")
                        {
                            response.User.IsAdmin = true;
                        }
                        else if (Convert.ToString(result.Rows[0]["RoleCode"]) == "B")
                        {
                            response.User.IsSubAdmin = true;
                        }
                        else
                        {
                            //End User
                            response.User.IsEndUser = true;   
                        }

                        response.User.User_ID = Convert.ToString(result.Rows[0]["UserId"]);
                        response.User.DisplayName = response.User.EmailOrUsername.Length > 5 ? response.User.EmailOrUsername.Substring(0, 5) : response.User.EmailOrUsername;
                        if (response.User.InActiveDate==DateTime.MinValue || response.User.InActiveDate.Year == 1900)
                        {
                            response.IsActiveUser = true;
                        }
                        else
                        {
                            response.IsActiveUser = false;   //suspened user
                        }
                        response.Success = true;
                        response.MessageBox = "successfully Logged In...";
                    }
                    else
                    {
                        response.User = null;
                        response.Success = false;
                        response.MessageBox = "Incorrect password.";
                    }  
                }
                else
                {
                    response.User = null;
                    response.Success = false;
                    response.MessageBox = "Incorrect username or password";
                }
            }
            catch (Exception e)
            {
                response.MessageBox = "Exception found due to " + e.Message;
                response.Success = false;
                return response;
            }
            return response;
        }

        public Login_Response resetpassword(ResetPasswordRequest request) {
            Login_Response response = new Login_Response();

            DataTable user = _database.SqlView($@"select * from tbl_users Where EmailOrUsername = '{request.Email}' ");
            if (user.Rows.Count == 0)
            {
                response.Success = false;
                response.MessageBox = "This User Don't Exist";
                return response;
            }

            string smtpuser = _configuration["ApplicationSettings:smtpuser"];
            string smptpassword = _configuration["ApplicationSettings:smptpassword"];
            string token = Guid.NewGuid().ToString();
            string baseurl = _configuration["ApplicationSettings:React_APP_BASEURLPARTIAL"] + $@"?token={token}";



            DataTable savetoken = _database.SqlView($@"INSERT INTO tbl_ResetPassword ([UsernameOrEmail] ,[UserId] ,[Token] ,[ExpirationDate]) VALUES ('{request.Email}','','{token}', DATEADD(day, 2, GETDATE())) ");

            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(smtpuser, smptpassword),
                EnableSsl = true,
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress(smtpuser),
                To = { request.Email },
                Subject = "Password Reset",
                Body = $"Dear User,<br><br>Please click on the following link to reset your password: {baseurl}"
            };
            mailMessage.IsBodyHtml = true;

            try
            {
                smtpClient.Send(mailMessage);
                response.Success = true;
                response.MessageBox = "Password was reset";
                return response;
            }
            catch (Exception ex)
            {
                // handle exception
            }
            response.Success = false;
            response.MessageBox = "Can't Reset your password";
            return response;
        }

        public Login_Response verifyResetLink(string token, ResetPasswordVerfiyRequest request)
        {
                Login_Response response = new Login_Response();

            try
            {
                if  (String.IsNullOrEmpty(request.password) || String.IsNullOrEmpty(request.confirmpassword) || request.password != request.confirmpassword ) {
                    response.Success = false;
                    response.MessageBox = ""; // password not match
                    return response;
                }

                DataTable identifyuser = _database.SqlView($@"select * from tbl_ResetPassword where Token = '{token}' ");
                if (identifyuser.Rows.Count == 0)
                {
                    response.Success = false;
                    response.MessageBox = "User not found";
                    return response;
                }

                int result = DateTime.Compare(DateTime.Now, (DateTime)identifyuser.Rows[0]["ExpirationDate"]);

                if (result < 0)
                {
                    //Console.WriteLine("SQL date is later than current time.");
                }
                //else if (result == 0)
                //{
                //   // Console.WriteLine("SQL date is the same as current time.");
                //}
                else
                {
                    // Console.WriteLine("SQL date is earlier than current time.");
                    response.Success = false;
                    response.MessageBox = "Token has been expired";
                    return response;
                }


                Tuple <byte[], string> saltAndhash =  globalfunctions.GenerateSaltAndHash(request.password);

                response.Success = true;
                response.MessageBox = "Password was reset";
                return response;
            }
            catch (Exception ex)
            {
                // handle exception
            }
            response.Success = false;
            response.MessageBox = "Can't Reset your password";
            return response;
        }


        public Login_Response GetLoginInfo(string _bearer_token)
        {
            Login_Response response = new Login_Response();
           
            try
            {
                var handler = new JwtSecurityTokenHandler();
                var jwtDecoded = handler.ReadToken(_bearer_token) as JwtSecurityToken;
                var email = jwtDecoded.Claims.FirstOrDefault(j => j.Type.EndsWith("email")).Value ?? "";
                response.Token = $@"{_bearer_token}";
                string Query = $@"select * from tbl_users Where EmailOrUsername = '{email}' ";

                DataTable result = _database.SqlView(Query);
                if (result.Rows.Count > 0)
                {
                    bool IsFound = false;

                    IsFound = true;
                    if (IsFound)
                    {
                        response.User = SqlRow<CreatedUser>(result.Rows[0]);

                        //X measne End Users
                        //A Means Main Admin [Creator]
                        //B Means Sub-Admins
                        if (Convert.ToString(result.Rows[0]["RoleCode"]) == "A")
                        {
                            response.User.IsAdmin = true;
                        }
                        else if (Convert.ToString(result.Rows[0]["RoleCode"]) == "B")
                        {
                            response.User.IsSubAdmin = true;
                        }
                        else
                        {
                            //End User
                            response.User.IsEndUser = true;
                        }

                        response.User.User_ID = Convert.ToString(result.Rows[0]["UserId"]);
                        response.User.DisplayName = response.User.EmailOrUsername.Length > 5 ? response.User.EmailOrUsername.Substring(0, 5) : response.User.EmailOrUsername;
                        if (response.User.InActiveDate == DateTime.MinValue || response.User.InActiveDate.Year == 1900)
                        {
                            response.IsActiveUser = true;
                        }
                        else
                        {
                            response.IsActiveUser = false;   //suspened user
                        }
                        response.Success = true;
                        response.MessageBox = "";
                    }
                    else
                    {
                        response.User = null;
                        response.Success = false;
                        response.MessageBox = "Unauthorized";
                    }
                }
            }
            catch (Exception ex)
            {
                
            }

            return response;
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
        private static void SetSqlRow<T>(T item, DataRow row) where T : new()
        {
            // go through each column
            foreach (DataColumn c in row.Table.Columns)
            { 
                PropertyInfo p = item.GetType().GetProperty(c.ColumnName, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);

                // if exists, set the value
                if (p != null && row[c] != DBNull.Value)
                {
                    p.SetValue(item, row[c], null);
                }
            }
        }
    }
}
