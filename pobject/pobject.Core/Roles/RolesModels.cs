using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pobject.Core.Roles
{
    public class RolesModels_Request
    {
        public string  Code { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int IsActive { get; set; }
    }
    public class RolesModels_Response
    {
        public bool GoodResponse { get; set; }
        public string MessageBox { get; set; }
        public DataTable AllRoles { get; set; }
    }
}
