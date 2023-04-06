﻿using pobject.Core.DatabaseEnvironment;
using pobject.Core.OtherServices;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using pobject.Core.CommonHelper;
using Microsoft.Net.Http.Headers;
using System.Collections;


namespace pobject.Core.Transactions
{

    public class TransactionsService : ITransactionsService
    {
        private readonly IDatabase _database;
        public TransactionsService(IDatabase database)
        {
            _database = database;
        }
        public StoreCode Withdrawl(Transaction_Withdrawl request)
        {
            StoreCode response = new StoreCode();
            try
            {
                List<SqlParameter> param = new List<SqlParameter>();
                param.Add(new SqlParameter("@UserId", request.Referred_UserId));
                string EdQuery = $"select UserNumber,EmailOrUsername,Referral_Code from tbl_users where User_Id = '{request.Referred_UserId}' and (InActiveDate == '' || InActiveDate is null)";
                DataTable Referred = _database.SqlView(EdQuery, param);
                if (Referred.Rows.Count > 0)
                {
                    //add 5 % Commission to referred Account
                }
                else
                {
                    //Continue to Simple Withdrwal
                }
            }
            catch (Exception e)
            {
                response.Success = false;
                response.MessageBox = "Exception due to " + e;
                return response;
            }
            response.Success = true;
            return response;
        }

        public int updateamount(string Referral_UserId,float amount, string adminEmail)
        {
           
            DataTable senderTransaction_Admin = _database.SqlView($"select * from tbl_useramountdetails where EmailOrUsername = '{adminEmail}'");
            DataTable receiverTransaction = _database.SqlView($"select * from tbl_useramountdetails where UserId = '{Referral_UserId}'");

            if (receiverTransaction.Rows.Count == 0 || senderTransaction_Admin.Rows.Count == 0)
            {
                return 0;
            }

          

                
                if (amount > Convert.ToDouble(senderTransaction_Admin.Rows[0]["Totalamount"]))
                {
                    return 2;
                }

            DataTable receiverSenior = _database.SqlView($@"select * from tbl_Referrals where ReferrerEmail='{receiverTransaction.Rows[0]["EmailOrUsername"]}'");
            
            


            float totatAmount = (float)Convert.ToDouble(receiverTransaction.Rows[0]["Totalamount"]); 
                float commissionvalue = ((float)10 / (float)100) * amount; // receiver's senior
                float basevalue = totatAmount + amount; // current user


 
                DataTable addReceiver = _database.SqlView($@"UPDATE tbl_useramountdetails SET 
                        TotalAmount= '{basevalue}', 
                        Date = '{DateTime.Now}',
                        Investment= Investment + '{amount}'                      



                        WHERE UserId = '{Referral_UserId}'");


            Boolean isReceiverSeniorExist = receiverSenior.Rows.Count > 0 ? true : false;
            if (!isReceiverSeniorExist)
            {
                commissionvalue = 0;
            }

            DataTable deductSender = _database.SqlView($@"UPDATE [dbo].[tbl_useramountdetails] SET [TotalAmount]
                    = TotalAmount - '{amount + commissionvalue}', Investment = Investment - '{amount}' WHERE [EmailOrUsername] = '{adminEmail}'");

            if (isReceiverSeniorExist)
            {
                // only give commision to totalamount , since investment is for withdraw and deposit
                string referredUseruserquery = $@"UPDATE tbl_useramountdetails SET 
                    TotalAmount = TotalAmount +  '{commissionvalue}'       ,
Commission = Commission +  '{commissionvalue}'


                        WHERE EmailOrUsername = '{receiverSenior.Rows[0]["ReferredEmail"].ToString()}'";
                _database.SqlView(referredUseruserquery);
            }

            return 1;

        }


        public StoreCode deposit(Transaction_Deposit request, string _bearer_token)
        {
            StoreCode response = new StoreCode();
            try
            {

                if (request.amount <= 0 )
                {
                    response.MessageBox = "Amount Can't less then or euqal to zero";
                    response.Success = true;
                    return response;
                }

                string email = globalfunctions.DecodeToken(_bearer_token);
                int isAdded = updateamount(request.Referral_UserId, request.amount, email);
 
                 if (isAdded == 1)
                {
                    response.MessageBox = "Updated User Amount";
                    response.Success = true;
                    return response;
                }
                else if (isAdded == 2)
                {
                    response.MessageBox = "Your Balance Amount can'not be less than your entered amount";
                    response.Success = false;
                    return response;
                }
            }
            catch (Exception e)
            {
                response.Success = false;
                response.MessageBox = "Exception due to " + e;
                return response;
            }
            response.MessageBox = "Either Sender or Receiver Doesn't Exists";
            response.Success = true;
            return response;

        }

        public StoreCode sentamount(SetAmount request, string useremail)
        {
            StoreCode response = new StoreCode();
            try
            {


                DataTable sender = _database.SqlView($@"select * from tbl_users where EmailOrUsername='{useremail}'");  // sender
                DataTable receiver = _database.SqlView($@"select * from tbl_users where EmailOrUsername='{request.UserEmail}'"); // receiver


                if (request.Amount <= 0)
                {
                    response.MessageBox = "Your Amount Can't be less than or equal to zero";
                    response.Success = false;
                    return response;
                }

                if (sender.Rows.Count == 0 || receiver.Rows.Count == 0)
                {
                    response.MessageBox = "Either User don\'t exists";
                    response.Success = false;
                    return response;
                }

                if (useremail == request.UserEmail)
                {
                    response.MessageBox = "Sender or Receiver can't be same";
                    response.Success = false;
                    return response;
                }


                Boolean isSenderAdmin = sender.Rows[0]["RoleCode"].ToString() == "A" ? true : false;
                Boolean isReceiverAdmin = receiver.Rows[0]["RoleCode"].ToString() == "A" ? true : false;

                DataTable senderTransaction = _database.SqlView($@"select * from tbl_useramountdetails where EmailOrUsername='{useremail}'");  // sender
                DataTable receiverTransaction = _database.SqlView($@"select * from tbl_useramountdetails where EmailOrUsername='{request.UserEmail}'"); // receiver


             
                float totatAmount = (float)Convert.ToDouble(senderTransaction.Rows[0]["Totalamount"]);
                float investment = (float)Convert.ToDouble(senderTransaction.Rows[0]["Investment"]);
                float profit = (float)Convert.ToDouble(senderTransaction.Rows[0]["Profit"]);
                float commission = (float)Convert.ToDouble(senderTransaction.Rows[0]["Commission"]);

                if (request.Amount > totatAmount)
                {
                    response.MessageBox = "Can't Transaction since user's balance is less than his withdrawal amount";
                    response.Success = false;
                    return response;
                }


                float totalTmp = investment - request.Amount;
                float profitTmp = profit;
                float commissionTmp = commission;


                if (isSenderAdmin)
                {
                    // sender (Admin) can sent all money
                    if (Math.Round(request.Amount) > Math.Round((float)Convert.ToDouble(senderTransaction.Rows[0]["TotalAmount"])))
                    {
                        response.MessageBox = "Your Balance amount is less than you current amount";
                        response.Success = false;
                        return response;
                    }
                }
                else
                {
                    if (Convert.ToDouble(senderTransaction.Rows[0]["Totalamount"]) >= (Convert.ToDouble(senderTransaction.Rows[0]["Investment"]) * 2.00))
                    {
                        // sender can sent all money
                        Double total = (Convert.ToDouble(senderTransaction.Rows[0]["Investment"]) + Convert.ToDouble(senderTransaction.Rows[0]["Commission"]) + Convert.ToDouble(senderTransaction.Rows[0]["Profit"]));
                        if (Math.Round(Convert.ToDouble(request.Amount)) > total)
                        {
                            response.MessageBox = "Your Profit amount is less than you current amount";
                            response.Success = false;
                            return response;
                        }
                    }
                    else
                    {
                        // sender only sent profit money
                        Double total = (Convert.ToDouble(senderTransaction.Rows[0]["Commission"]) + Convert.ToDouble(senderTransaction.Rows[0]["Profit"]));

                        if (Math.Round(Convert.ToDouble(request.Amount)) > total)
                        //if ( Math.Round(Convert.ToDouble(request.amount)) > Math.Abs((differceAmount - Convert.ToDouble(sumOfPendingWithdraws.Rows[0]["withdrawal_amount"]))))
                        {
                            response.MessageBox = "Your Profit amount is less than you current amount";
                            response.Success = false;
                            return response;
                        }
                    }
             

                }

                if (totalTmp < 0)
                {
                    profitTmp = profitTmp + totalTmp;
                    totalTmp = 0;
                    if (profitTmp < 0)
                    {
                        commissionTmp = commissionTmp + profitTmp;
                        profitTmp = 0;
                    }
                }


                DataTable deductsender = _database.SqlView($@"UPDATE [dbo].[tbl_useramountdetails] SET [TotalAmount] =  '{totalTmp + profitTmp + commissionTmp}', Investment = '{totalTmp}',
Commission= '{commissionTmp}', Profit= '{profitTmp}',  WHERE [EmailOrUsername] = '{useremail}'");
                DataTable addreceiver = _database.SqlView($@"UPDATE [dbo].[tbl_useramountdetails] SET [TotalAmount] = TotalAmount + {request.Amount}, Investment = Investment + '{request.Amount}' WHERE [EmailOrUsername] = '{request.UserEmail}'");


            }
            catch (Exception e)
            {
                response.Success = false;
                response.MessageBox = "Exception due to " + e;
                return response;
            }
            response.MessageBox = $@"Amount {request.Amount} Send to {request.UserEmail}";
            response.Success = true;
            return response;
        }

    }
}
