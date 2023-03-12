using pobject.Core.DatabaseEnvironment;
using pobject.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace pobject.Core.OtherServices;
public interface IReferralServices
{
    public string GenerateReferralCode();
    public StoreCode SaveInDatabase(ReferralLinkRequest request);
}
public class ReferralServices : IReferralServices
{
    private readonly IDatabase _database;
    public ReferralServices(IDatabase database)
    {
        _database= database;
    }
    public StoreCode SaveInDatabase(ReferralLinkRequest request)
    {
        StoreCode response= new StoreCode();
        try
        {

        }
        catch (Exception e)
        {
            response.Success= false;
            response.MessageBox = "exception due to " + e;
            return response;
        }
        response.Success = true;
        return response;
    }
    public string GenerateReferralCode()
    {
        // Generate a random string of 10 characters
        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var random = new Random();
        var referralCode = new string(Enumerable.Repeat(chars, 10)
            .Select(s => s[random.Next(s.Length)]).ToArray());
        return referralCode;
    }

}
