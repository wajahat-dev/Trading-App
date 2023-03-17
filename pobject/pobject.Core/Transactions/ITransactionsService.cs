using pobject.Core.OtherServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pobject.Core.Transactions
{
    public interface ITransactionsService
    {
        public StoreCode Withdrawl(Transaction_Withdrawl request);

        public StoreCode deposit(Transaction_Deposit request);


    }
}
