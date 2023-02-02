using pobject.Core.DatabaseEnvironment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace pobject.Core.AuthBase
{
    public interface IUserContext
    {
        string ClientID { get; }
        string UserID { get; }
        ClaimsPrincipal User { get; }
        IDatabase database { get; }
    }
}
