using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace pobject.Core.Models;
public class ReferralLinks
{
}
public class ReferralLinkRequest
{
    public string ReferralCode { get; set; }        // can or generate from backend or frontEnd
    public string ReferredEmail { get; set; }       // can generate from backend 
    public string ReferredUserId { get; set; }      // can generate from backend 
    public string ReferrerEmail { get; set; }       //Will come from FrontEnd
    public string ReferrerUserId { get; set; }      //Will come from FrontEnd
    public double CommissionAmount { get; set; }    //Will come from FrontEnd or can work from backend
    public DateTime ReferralDate { get; set; }      //will fill auto in database
}
