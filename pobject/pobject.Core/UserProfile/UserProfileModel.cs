﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace pobject.Core.UserProfile;
public class UserProfileModel { }
public class UserProfile_Request
{
    //public string EmailOrUsername { get; set; }
    //public string USERID { get; set; }
    public string CNIC { get; set; }
    //public string EMAIL { get; set; }
    public string DISPLAYNAME { get; set; }
    public string PHONE { get; set; }
    public string COUNTRY { get; set; }
    public string DOB { get; set; } 
    public bool BlockNow { get; set; }

}
public class UserProfile_Response
{
    public bool GoodResponse { get; set; }
    public string MessageBox { get; set; }
}
public class Internal_JWT_Request
{
    public string Email { get; set; }
    public string Phone { get; set; }
    public string UserId { get; set; }
}