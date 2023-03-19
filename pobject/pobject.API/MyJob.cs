
using pobject.Core.DatabaseEnvironment;
using Quartz;
using System.Collections.Generic;
using System.Data;

namespace pobject.Core.Quartz
{
    class MyJob : IJob
    {

        private readonly IDatabase _database;
        public MyJob(IDatabase database)
        {
            _database = database;
        }

        public Task Execute(IJobExecutionContext context)
        {
            // Do the job here

            //string Query = $@"select * from tbl_users Where EmailOrUsername = '{email}' ";

            DataTable historydata = _database.SqlView($@"SELECT * FROM tbl_useramountdetailshistory");
            if (historydata.Rows.Count == 0)
            {

            }
            else
            {

            }
            DataTable populateolddata = _database.SqlView($@" INSERT INTO tbl_useramountdetailshistory (EmailOrUsername, UserId, TotalAmount, Date)
            SELECT EmailOrUsername, UserId, 
                CASE 
                    WHEN TotalAmount >= 5 THEN TotalAmount + (TotalAmount * 0.03)
                    WHEN TotalAmount >= 100 THEN TotalAmount + (TotalAmount * 0.03) 
                    WHEN TotalAmount >= 200 THEN TotalAmount + (TotalAmount * 0.04)
                    WHEN TotalAmount >= 1000 THEN TotalAmount + (TotalAmount * 0.055) 
                    WHEN TotalAmount >= 2000 THEN TotalAmount + (TotalAmount *  0.06)
                    WHEN TotalAmount >= 50000 THEN TotalAmount + (TotalAmount * 0.065) 
                    ELSE 0
                END,
                GETDATE() AS Date
            FROM tbl_useramountdetails ");
            //Console.WriteLine("WoW");
            return Task.CompletedTask;
        }
    };

}
