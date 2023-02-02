using pobject.Core.DatabaseEnvironment;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static pobject.Core.Signup.Signup_Service;

namespace pobject.Core.Signup
{
    public class Signup_Service : ISignup_Service
    {
        private readonly IDatabase _database;

        public Signup_Service(IDatabase database)
        {
            _database = database;
        }

        public DataTable GetUser()
        {
            StoreCode response = new StoreCode();
            try
            {
                int id = _database.ClientId;
                string Query = $@"SELECT * from tbl_Users where IsDeleted = 0 and Clientid = {id}";
                response.Information = _database.SqlView(Query);
            }
            catch (Exception e)
            {
                response.MessageBox = "Exception found due to " + e;
                response.Success = false;
                return null;
            }
            response.MessageBox = "";
            response.Success = true;
            return (DataTable)response.Information;
        }

        public Signup_Response SignupUser(Signup_Request request)
        {
            Signup_Response response = new Signup_Response();
            try
            {
                if (request != null)
                {
                    string username = request.UserNameOrEmail;
                    string pass = request.Password;
                    string Name = request.DisplayName;
                    {
                        string Query = $@"
declare @NewClientId  as int = (select (MAX(clientid)+1) from tbl_Users)
insert into tbl_Users(username,password,name,Clientid) 
values('{username}','{pass}','{Name}',@NewClientId) 
select * from tbl_Users where Clientid = @NewClientId";

                        //int User_id = request.User_Id;
                        Query = $@"UPDATE tbl_Users set 
                                        Username = '{username}',password = {pass},name = '{Name}'  
                                        where User_Id = {0} and Clientid = {_database.ClientId}";
                        int result = _database.ExecuteNonQuery(Query);
                        if (result > 0)
                        {
                            response.MessageBox = "Successfully Saved.";
                            response.Success = true;
                        }
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

        public StoreCode DeleteUser(int UserId)
        {
            StoreCode response = new StoreCode();
            try
            {

                int id = _database.ClientId;
                if (UserId != 0 && UserId > 0)
                {
                    string Query = $@"UPDATE tbl_Users set IsDeleted = 1  
                                      where User_Id = {id} and Clientid = {id}";
                    int result = _database.ExecuteNonQuery(Query);
                }
            }
            catch (Exception e)
            {
                response.MessageBox = "Exception found due to " + e;
                response.Success = false;
                return response;
            }
            response.MessageBox = "Successfully deleted";
            response.Success = true;
            return response;
        }
    }
}

