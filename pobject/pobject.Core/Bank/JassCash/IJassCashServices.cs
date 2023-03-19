using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pobject.Core.Bank.JassCash
{
    public class JazzRequest
    {
        public string phoneNumber { get; set; }
        public string cnicNumber { get; set; }
        public string amount { get; set; }
        public string emailOrUsername { get; set; }
        public string id_Pk { get; set; }
    }

    public class JazzRespone
    {
        public string message { get; set; }
        public Boolean success { get; set; }
    }

    public class PaymentData
    {
        public string pp_Version { get; set; }
        public string pp_TxnType { get; set; }
        public string pp_Language { get; set; }
        public string pp_MerchantID { get; set; }
        public string pp_SubMerchantID { get; set; }
        public string pp_Password { get; set; }
        public string pp_BankID { get; set; }
        public string pp_ProductID { get; set; }
        public string pp_TxnRefNo { get; set; }
        public string pp_Amount { get; set; }
        public string pp_TxnCurrency { get; set; }
        public string pp_TxnDateTime { get; set; }
        public string pp_BillReference { get; set; }
        public string pp_Description { get; set; }
        public string pp_TxnExpiryDateTime { get; set; }
        public string pp_ReturnURL { get; set; }
        public string ppmpf_1 { get; set; }
        public string ppmpf_2 { get; set; }
        public string ppmpf_3 { get; set; }
        public string ppmpf_4 { get; set; }
        public string ppmpf_5 { get; set; }
        public string pp_SecureHash { get; set; }

    }
}
