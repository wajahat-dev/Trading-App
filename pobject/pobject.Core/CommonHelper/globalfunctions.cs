using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pobject.Core.CommonHelper
{
    internal class globalfunctions
    {

        public static string GenerateReferralCode()
        {
            // Generate a random string of 10 characters
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var random = new Random();
            var referralCode = new string(Enumerable.Repeat(chars, 10)
               .Select(s => s[random.Next(s.Length)]).ToArray());

            return referralCode;
        }
    }
}
