using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pobject.Core.Models
{
    public class UserSuspendRequest
    {
        public string UserId { get; set; }
        public string AdminID { get; set; } //bcz, admin can suspend/unsuspend a user
        public bool IsSuspendAction { get; set; }
    }
}
