using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pobject.Core.UserProfile
{
    public interface IUserProfileService
    {
        public DataTable GetUserProfile(string UsernameOrEmail, string UserId);
        public DataTable GetAllUserProfile();
        public string GetUserReferral();
        public UserFinanceData UserGridData(String token);

        public UserProfile_Response StoreUserProfile(UserProfile_Request request, Internal_JWT_Request jwt = null);



    }
}
