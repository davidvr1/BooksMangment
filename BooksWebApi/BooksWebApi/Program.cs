using BooksManagment.BL;
using BooksManagment.DAL;
using BooksManagment.DAL.DB;
using BooksManagment.DataObjects.interfaces;
using Confluent.Kafka;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Prometheus;
using Swashbuckle.AspNetCore.Filters;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(option =>
{
    option.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        In= ParameterLocation.Header,
        Name="Authorization",
        Type= SecuritySchemeType.ApiKey       
    });
    option.OperationFilter<SecurityRequirementsOperationFilter>();
});
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlServer(connectionString);
});
builder.Services.AddDbContext<BookDbContext>(options =>
{
    options.UseSqlServer(connectionString);
});

builder.Services.AddTransient<IBooksDal, BooksDal>();
builder.Services.AddTransient<IBooksService, BooksService>();

builder.Services.AddCors((option) =>
{
    option.AddPolicy("all", builder =>
    {
        builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});
builder.Services.AddIdentityApiEndpoints<IdentityUser>()
    .AddEntityFrameworkStores<DataContext>()
    .AddApiEndpoints();
builder.Services.Configure<ProducerConfig>(
    builder.Configuration.GetSection("Kafka")
    );

var app = builder.Build();
app.UseMetricServer();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.MapIdentityApi<IdentityUser>();
app.UseCors("all");
app.UseAuthorization();
app.UseHttpMetrics(options =>
{
    options.AddCustomLabel("host", context => context.Request.Host.Host);
});

app.MapControllers();

app.Run();
