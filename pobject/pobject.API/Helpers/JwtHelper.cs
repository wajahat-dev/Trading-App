using Microsoft.IdentityModel.Tokens;
using pobject.Core.Login;
using pobject.Core.Signup;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace pobject.API.Helpers
{
    public interface IJwtHelper
    {
        string GenerateToken(Login_Response user);
        string GenerateToken(Signup_Response user);

        string GenerateToken(string user);
        string? ValidateToken(string token);
          
        //1. If we send Token from Controller

        string? GetPhone_FromToken(string token);
        string? GetUserIdFromToken(string token);
        string? GetRoleFromToken(string token);


        //2. If we Use HttpContextAccessor Package to reterive Token from Http Request
        //We can also Put Properties in Interface to get Output ,Its Interesting and Learning 
        public string Phone { get; }
        public string UserId { get; }
        public string Role { get; }
        public string Email { get; }
    }
    public class JwtHelper : IJwtHelper
    {
        IConfiguration _config;
        public JwtHelper(IConfiguration config)
        {
            _config = config;
        }
        //NOTE:


        //[HttpContextAccessor] This is a package that will automatically reterive _http Request from pipline if found,
        //Therefor if http request is found then we reterive Token from 'Authorization' Key in Header

        HttpContextAccessor _httpContextAccessor = new HttpContextAccessor();

        public string Phone => throw new NotImplementedException();

        public string UserId => throw new NotImplementedException();

        public string Role => throw new NotImplementedException();

        public string Email => throw new NotImplementedException();

        public string GenerateToken(Login_Response user)
        {
            byte[] key = Convert.FromBase64String(_config["ApplicationSettings:SecretKey"]);
            // generate token that is valid for 7 days 
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Email, user.User.EmailOrUsername),
                    new Claim(ClaimTypes.Name,user.User.DisplayName),
                    new Claim(ClaimTypes.Sid,user.User.User_ID),
                    new Claim(ClaimTypes.GivenName,"pObject-PURPOSE"),
                }),
                Expires = DateTime.UtcNow.AddMinutes(10000),
                Issuer = _config["ApplicationSettings:ValidAudience"],
                Audience = _config["ApplicationSettings:ValidIssuer"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            JwtSecurityToken token = tokenHandler.CreateJwtSecurityToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public string GenerateToken(Signup_Response user)
        {
            byte[] key = Convert.FromBase64String(_config["ApplicationSettings:SecretKey"]);
            // generate token that is valid for 7 days
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Email, user.User.EmailOrUsername),
                    new Claim(ClaimTypes.Name,user.User.DisplayName),
                    new Claim(ClaimTypes.Sid,user.User.User_ID),
                    new Claim(ClaimTypes.GivenName,"pObject-PURPOSE"),
                }),
                Expires = DateTime.UtcNow.AddMinutes(10000),
                Issuer = _config["ApplicationSettings:ValidAudience"],
                Audience = _config["ApplicationSettings:ValidIssuer"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            JwtSecurityToken token = tokenHandler.CreateJwtSecurityToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
        public string GenerateToken(string user)
        {
            byte[] key = Convert.FromBase64String(_config["ApplicationSettings:SecretKey"]);
            user = "Lorem Sp-ICams Testing";  //Hard Code for Now
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Email, user),
                }),
                Expires = DateTime.UtcNow.AddMinutes(5),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            JwtSecurityToken token = tokenHandler.CreateJwtSecurityToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public string? GetPhone_FromToken(string token)
        {
            throw new NotImplementedException();
        }

        public string? GetRoleFromToken(string token)
        {
            throw new NotImplementedException();
        }

        public string? GetUserIdFromToken(string token)
        {
            throw new NotImplementedException();
        }
        public string? ValidateToken(string token)
        {
            if (token == null)
                return null;
            var tokenHandler = new JwtSecurityTokenHandler();
            byte[] key = Convert.FromBase64String(_config["ApplicationSettings:SecretKey"]);
            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    // set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                //var userId = int.Parse(jwtToken.Claims.First(x => x.Type == "id").Value);
                var userId = jwtToken.Claims.First(x => x.Type == "email").Value;

                // return user id from JWT token if validation successful
                return userId;
            }
            catch (Exception e)
            {
                // return null if validation fails
                return null;
            }
        }
    }

    //2. We can also Use Interface like  GetPhoe(string token)
    //In above, we just pass token from controller's Request's Objcet and reterive phone from in it.         
    //implementing property of Interface 
}
