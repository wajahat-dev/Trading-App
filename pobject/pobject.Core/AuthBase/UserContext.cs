using Microsoft.AspNetCore.Http;
using pobject.Core.DatabaseEnvironment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace pobject.Core.AuthBase
{ 
    public class UserContext :IUserContext
    {
        private readonly string _clientId;
        private readonly string _userId;
        private readonly ClaimsPrincipal _user;
        private readonly IDatabase _database;
        public UserContext(IHttpContextAccessor httpContextAccessor, IDatabase database)
        {
            _database = database;
            _user = httpContextAccessor.HttpContext!.User;
            var items = httpContextAccessor!.HttpContext!.Items;
            _clientId = items["cid"] != null ? items["cid"]!.ToString() : null;
            _userId = items["uid"] != null ? items["uid"]!.ToString() : null;
        }
        public string ClientID
        {
            get
            {
                return _clientId;
            }
        }

        public string UserID
        {
            get
            {
                return _userId;
            }
        }

        public ClaimsPrincipal User
        {
            get
            {
                return _user;
            }
        }

        public IDatabase database
        {
            get
            {
                return _database;
            }
        }
    }
}
