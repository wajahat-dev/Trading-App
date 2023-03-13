using Microsoft.Net.Http.Headers;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Net.Http.Headers;

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

        public static string DecodeToken(string _bearer_token)
        {
            var handler = new JwtSecurityTokenHandler();
            var jwtDecoded = handler.ReadToken(_bearer_token) as JwtSecurityToken;
            var email = jwtDecoded.Claims.FirstOrDefault(j => j.Type.EndsWith("email")).Value ?? "";
            return email;
        }

    }
}
