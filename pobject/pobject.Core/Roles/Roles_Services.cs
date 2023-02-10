using pobject.Core.DatabaseEnvironment;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace pobject.Core.Roles
{
    public class Roles_Services : IRoles_Services
    {
        IDatabase _database;
        public Roles_Services(IDatabase database)
        {
            _database = database;
        }
        public RolesModels_Response GetAllRoles()
        {
            RolesModels_Response response = new RolesModels_Response();
            try
            {
                response.AllRoles = _database.SqlView($"select * from tbl_roles");
            }
            catch (Exception e)
            {
                response.MessageBox = "Excetion due to "+e;
                response.GoodResponse = false;
                return response;
            }
            response.GoodResponse = true;
            return response;
        }

        public RolesModels_Response StoreRole(RolesModels_Request request)
        {
            RolesModels_Response response = new RolesModels_Response();
            try
            {
                string query = $@"insert into tbl_roles(CODE,NAME,Description,IsActive) 
values('{request.Code}','{request.Name}','{request.Description}','{request.IsActive}')";
                int result = _database.ExecuteNonQuery(query);
                response.AllRoles = GetAllRoles().AllRoles;
            }
            catch (Exception e)
            {
                response.MessageBox = "Excetion due to " + e;
                response.GoodResponse = false;
                return response;
            }
            response.GoodResponse = true;
            return response;
        }
    }
}
