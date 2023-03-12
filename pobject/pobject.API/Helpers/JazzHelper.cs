using System.Text;
using System.Security.Cryptography;
using System.Reflection;

namespace pobject.API.Helpers
{
    public class JazzHelper
    {

        JazzHelper()
        {

        }
        public static string GenerateSecureHash(Dictionary<string, string> data, string key)
        {
            var ordered = data.OrderBy(x => x.Key);
            var hash = new StringBuilder();
            foreach (var pair in ordered)
            {
                if (!string.IsNullOrEmpty(pair.Value))
                {
                    hash.Append("&").Append(pair.Value);
                }
            }
            string message = key + hash.ToString();

            byte[] keyBytes = Encoding.UTF8.GetBytes(key);
            byte[] messageBytes = Encoding.UTF8.GetBytes(message);
            byte[] hashBytes = ComputeHmacSHA256(message, key);

            return Convert.ToBase64String(hashBytes);
        }
        public static Dictionary<string, string> ObjectToDictionary(object obj)
        {
            Dictionary<string, string> ret = new Dictionary<string, string>();

            foreach (PropertyInfo prop in obj.GetType().GetProperties())
            {
                //string propName = prop.Name;
                //var val = obj.GetType().GetProperty(propName).GetValue(obj, null);
                //if (val != null)
                //{
                //    ret.Add(propName, val);
                //}
                //else
                //{
                //    ret.Add(propName, null);
                //}
            }

            return ret;
        }

        public static byte[] ComputeHmacSHA256(string message, string key)
        {
            byte[] keyBytes = Encoding.UTF8.GetBytes(key);
            using (var hmac = new HMACSHA256(keyBytes))
            {
                return hmac.ComputeHash(Encoding.UTF8.GetBytes(message));
            }
        }
        public static string GetTransactionDateTime()
        {
            var now = DateTime.Now;
            var year = now.Year.ToString();
            var month = now.Month.ToString().PadLeft(2, '0');
            var day = now.Day.ToString().PadLeft(2, '0');
            var hours = now.Hour.ToString().PadLeft(2, '0');
            var minutes = now.Minute.ToString().PadLeft(2, '0');
            var seconds = now.Second.ToString().PadLeft(2, '0');
            return year + month + day + hours + minutes + seconds;
        }

        public static string GetTransactionExpiry(int expiryMinutes)
        {
            var now = DateTime.Now;
            var expiryDate = now.AddMinutes(expiryMinutes);
            var year = expiryDate.Year.ToString();
            var month = expiryDate.Month.ToString().PadLeft(2, '0');
            var day = expiryDate.Day.ToString().PadLeft(2, '0');
            var hours = expiryDate.Hour.ToString().PadLeft(2, '0');
            var minutes = expiryDate.Minute.ToString().PadLeft(2, '0');
            var seconds = expiryDate.Second.ToString().PadLeft(2, '0');
            return year + month + day + hours + minutes + seconds;
        }

    }
}
