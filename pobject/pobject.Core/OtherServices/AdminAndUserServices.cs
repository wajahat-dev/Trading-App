using pobject.Core.DatabaseEnvironment;
using pobject.Core.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pobject.Core.OtherServices
{ 
    public interface IAdminAndUserServices
    {
        public StoreCodeDT GetUserList();
        public StoreCodeDT GetSubAdminList();
        public StoreCodeDT GetListOf(string RoleCode);
        public StoreCode SuspendAUser(UserSuspendRequest request);

    }
    public class AdminAndUserServices : IAdminAndUserServices
    {
        private readonly IDatabase _database;
        public AdminAndUserServices(IDatabase database)
        {
            _database= database;
        }
        public StoreCodeDT GetSubAdminList()
        {
            StoreCodeDT response = new StoreCodeDT();
            try
            {
                DataTable Users = _database.SqlView($"select * from tbl_Users where RoleCode = 'B' order by Id_pk desc");
                response.Information = Users;
            }
            catch (Exception e)
            {
                response.GoodResponse = false;
                response.MessageBox = "exception due to " + e;
                return response;
            }
            return response;
        }
       
        public StoreCodeDT GetListOf(string RoleCode)
        {
            StoreCodeDT response = new StoreCodeDT();
            try
            {
                DataTable Users = _database.SqlView($"select * from tbl_Users where RoleCode = '{RoleCode}' order by Id_pk desc");
                response.Information = Users;
            }
            catch (Exception e)
            {
                response.GoodResponse = false;
                response.MessageBox = "exception due to " + e;
                return response;
            }
            return response;
        }

        public StoreCodeDT GetUserList()
        {
            StoreCodeDT response = new StoreCodeDT();
            try
            {
                DataTable Users = _database.SqlView($"select * from tbl_Users where RoleCode = 'X' order by Id_pk desc");
                response.Information = Users;
            }
            catch (Exception e)
            {
                response.GoodResponse = false;
                response.MessageBox = "exception due to " + e;
                return response;
            }
            return response;
        }

        public StoreCode SuspendAUser(UserSuspendRequest request)
        {
            StoreCode response = new StoreCode();
            try
            {
                if (request.IsSuspendAction)
                {
                    int affect = _database.ExecuteNonQuery($"UPDATE tbl_UserInfo SET INACTIVEDATE = SYSDATETIME() where UserId = '{request.UserId}'");
                    affect = _database.ExecuteNonQuery($"UPDATE tbl_Users SET INACTIVEDATE = SYSDATETIME() where UserId = '{request.UserId}'");
                    if(affect > 0 )
                        response.MessageBox = "Successfully Suspended";
                }
                else
                {
                    int affect = _database.ExecuteNonQuery($"UPDATE tbl_UserInfo SET INACTIVEDATE = NULL where UserId = '{request.UserId}'");
                    affect = _database.ExecuteNonQuery($"UPDATE tbl_Users SET INACTIVEDATE = NULL where UserId = '{request.UserId}'");
                    if (affect > 0)
                        response.MessageBox = "Successfully Un-Suspended";
                }

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
