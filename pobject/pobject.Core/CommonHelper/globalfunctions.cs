using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Security.Cryptography;


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

        public static Tuple<byte[], string> GenerateSaltAndHash(string password)
        {
            // Generate a random salt value
            byte[] salt = new byte[32];
            using (var rng = new RNGCryptoServiceProvider())
            {
                rng.GetBytes(salt);
            }

            // Combine the password and salt
            byte[] passwordBytes = Encoding.UTF8.GetBytes(password);
            byte[] combinedBytes = new byte[passwordBytes.Length + salt.Length];
            Buffer.BlockCopy(passwordBytes, 0, combinedBytes, 0, passwordBytes.Length);
            Buffer.BlockCopy(salt, 0, combinedBytes, passwordBytes.Length, salt.Length);

            // Hash the combined bytes using SHA-256 algorithm
            using (var sha256 = SHA256.Create())
            {
                byte[] hashedBytes = sha256.ComputeHash(combinedBytes);
                string hashedPassword = Convert.ToBase64String(hashedBytes);

                return Tuple.Create(salt, hashedPassword);
            }
        }


    }
}
