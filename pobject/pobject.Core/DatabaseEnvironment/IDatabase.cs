using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pobject.Core.Signup;
using pobject.Core.UserProfile;

namespace pobject.Core.DatabaseEnvironment
{
    public interface IDatabase
    {
        public void InitConnection(string clientCode, string userID);
        public string connectionString { get; }
        public int ClientId { get; }
        public int ExecuteNonQuery(string sqlCommand, List<SqlParameter> parameter = null);
        public DataTable SqlView(string sqlCommand);
        public DataTable SqlView(string sqlCommand,List<SqlParameter> param);
        public DataTable SqlView(string sqlCommand, string ConnectionString = "");
        public Signup_Response CreateNewUser(Signup_Request request,string RoleCodeIfLoggedInAsAdmin=null);
        public Boolean RegisterReferral(Signup_Request request, string userid);

        public Boolean UpdateUserAmount(Signup_Request request, String userid);

    }
}
