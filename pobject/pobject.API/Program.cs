using Microsoft.OpenApi.Models;
using pobject.Core.DatabaseEnvironment;
using pobject.Core.Login;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using pobject.Core.Signup;
using pobject.API.Helpers;
using pobject.Core.UserProfile;
using pobject.API.Middlewares;
using pobject.Core.Roles;
using pobject.Core.OtherServices;
using pobject.Core.Transactions;
using Quartz;
using Quartz.Impl;
using static Quartz.Logging.OperationName;
using pobject.Core.Quartz;
using Quartz.Spi;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Quartz.DependencyInjection;

using Quartz;

//using Quartz.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


//your class interfaces 
builder.Services.AddScoped<IDatabase, Database>();
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
builder.Services.AddSingleton<IJwtHelper, JwtHelper>();
builder.Services.AddTransient<ILoginService, LoginService>();
builder.Services.AddTransient<ISignup_Service, Signup_Service>();
builder.Services.AddTransient<IUserProfileService, UserProfileService>();
builder.Services.AddTransient<IRoles_Services, Roles_Services>();
builder.Services.AddTransient<IJazzCash_Services, JazzCash_Services>();
builder.Services.AddTransient<ITransactionsService, TransactionsService>();

builder.Services.AddTransient<IAdminAndUserServices, AdminAndUserServices>();
//builder.Services.AddTransient<IExpenseService, ExpenseService>();
//builder.Services.AddSingleton<IEmailService, EmailService>();

// schedular 

//builder.Services.AddQuartz(q =>
//{
//q.UseMicrosoftDependencyInjectionJobFactory();

//var jobKey = new JobKey("my-job");
//q.AddJob<MyJob>(j => j.WithIdentity(jobKey));

//q.AddTrigger(t => t
//    .WithIdentity("my-trigger")
//    .ForJob(jobKey)
//   .WithCronSchedule("0/5 * * * * ?")); // every five second
//    .WithCronSchedule("5 0 0 * * ?"));   // 12:00:05 Am

//});



//builder.Services.AddQuartzHostedService(
//    q => q.WaitForJobsToComplete = true);






//for sending Datatables Data, [not applicable for minimal API]
builder.Services.AddControllersWithViews().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.WriteIndented = true;
    options.JsonSerializerOptions.Converters.Add(new DataTableJsonConverter());
});

//CORS
builder.Services.AddCors(
    options => {
        options.AddPolicy("AllowSpecificOrigin",
        //options.AddPolicy("AllowAll",
        builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
    });


//default
builder.Services.AddControllers();





//Configure



builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//swagger Authentication [A.B]
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "P Object", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "Jwt Authorization",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                         new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id= "Bearer"
                        }
                         },
                    new string[]{}
        }
    });
});

//JWT 
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    //x =>
    //{
    //    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    //    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    // })
    .AddJwtBearer(x =>
    {
        x.RequireHttpsMetadata = false;
        //x.SaveToken = true;
        byte[] SigningKey = Convert.FromBase64String(builder.Configuration["ApplicationSettings:SecretKey"]);
        x.TokenValidationParameters = new TokenValidationParameters
        {
            //ValidateIssuerSigningKey = true, 
            IssuerSigningKey = new SymmetricSecurityKey(SigningKey),
            ValidAudiences = builder.Configuration["ApplicationSettings:ValidAudience"].Split(','),
            ValidIssuer = builder.Configuration["ApplicationSettings:ValidIssuer"],
            ValidateIssuer = true,
            ValidateAudience = true,
            RequireSignedTokens = true,
            RequireExpirationTime = true,
            ValidateLifetime = true,
            //For Checking Time Expiration
            //ClockSkew = TimeSpan.Zero,
        };
    });


 

var app = builder.Build();



// Configure the HTTP request pipeline.


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//order really matters
app.UseHttpsRedirection();
app.UseRouting();
app.UseCors("AllowSpecificOrigin");
//app.UseCors("AllowAll");


app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();

//class MyJob : IJob
//{
//    public Task Execute(IJobExecutionContext context)
//    {
//        // Do the job here
//        Console.WriteLine("Nice");
//        return Task.CompletedTask;
//    }
//};
