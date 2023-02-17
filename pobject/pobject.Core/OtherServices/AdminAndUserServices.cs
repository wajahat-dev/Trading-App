using pobject.Core.DatabaseEnvironment;
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
    }
}
