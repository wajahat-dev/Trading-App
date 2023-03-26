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

        public static bool VerifyPassword(string enteredPassword, byte[] salt, string passwordHashed)
        {
            
            // Combine the entered password with the salt
            byte[] passwordBytes = Encoding.UTF8.GetBytes(enteredPassword);
            byte[] combinedBytes = new byte[passwordBytes.Length + salt.Length];
            Buffer.BlockCopy(passwordBytes, 0, combinedBytes, 0, passwordBytes.Length);
            Buffer.BlockCopy(salt, 0, combinedBytes, passwordBytes.Length, salt.Length);

            // Hash the combined bytes using SHA-256 algorithm
            using (var sha256 = SHA256.Create())
            {
                byte[] hashedBytes = sha256.ComputeHash(combinedBytes);
                string hashedPassword = Convert.ToBase64String(hashedBytes);

                // Compare the computed hash with the original hash
                return hashedPassword == passwordHashed;
            }
        }

        public static Tuple<byte[], byte[]> SaltAndHash(string password)
        {
            string pass = password; //always compare with first password, 
            byte[] salt;
            byte[] hash;
            using (var sha256 = SHA256.Create())
            {
                salt = mycrpto.GenerateSalt();
                hash = sha256.ComputeHash(mycrpto.Combine(salt, Encoding.UTF8.GetBytes(password)));
                //now hash is the password
                return Tuple.Create(salt, hash);
            }
        }

        //public static Tuple<byte[], byte[]> Decryption(string salt, string hash)
        //{
        //    Retrieve the salt and hash from the database and compare to the entered password
        //    byte[] retrievedSalt = (byte[])salt;
        //    byte[] retrievedHash = (byte[])hash;
        //    using (var sha256 = SHA256.Create())
        //    {
        //        byte[] enteredHash = sha256.ComputeHash(mycrpto.Combine(retrievedSalt, Encoding.UTF8.GetBytes(password)));
        //        if (mycrpto.Compare(enteredHash, retrievedHash))
        //        {
        //            IsFound = true;     //Password is correct.
        //        }
        //        else
        //        {
        //            IsFound = false;        //Password is Incorrect.
        //        }
        //    }
        //}


    }
}
