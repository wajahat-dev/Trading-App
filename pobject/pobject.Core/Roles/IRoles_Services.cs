using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pobject.Core.Roles
{
    public interface IRoles_Services
    {
        public RolesModels_Response GetAllRoles();
        public RolesModels_Response StoreRole(RolesModels_Request request);

    }
}
