
using Quartz;

namespace pobject.Core.Quartz
{
    class MyJob : IJob
    {
        public Task Execute(IJobExecutionContext context)
        {
            // Do the job here
            return Task.CompletedTask;
        }
    };

}
