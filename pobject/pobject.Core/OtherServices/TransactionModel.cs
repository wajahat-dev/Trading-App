using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pobject.Core.OtherServices
{
    public class TransactionModel
    {
    }
    public class Transaction_Withdrawl
    {
        public string Referral_UserId { get; set; }
        public string Referred_UserId { get; set; }
        public string ReferralCode { get; set; }
        public string ReferralUsername { get; set; }
        public string ReferralCNIC { get; set; }
    }

    public class Transaction_Deposit
    {
        public string Referral_UserId { get; set; }
        
        public float amount { get; set; }
    }

}
