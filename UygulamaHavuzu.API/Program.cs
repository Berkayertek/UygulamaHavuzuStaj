using Microsoft.EntityFrameworkCore;
using UygulamaHavuzu.Infrastructure.Data;

var builder = WebApplication.CreateBuilder(args);

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:4200")
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                      });
});

// ----- SERVİSLERİ EKLEME BÖLÜMÜ -----
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();

// HttpClient servisini buraya ekliyoruz
builder.Services.AddHttpClient(); 

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// ----- SERVİSLERİ EKLEME BÖLÜMÜ BİTİŞ -----

// BU SATIRDAN SONRA SERVİS EKLENMEZ
var app = builder.Build(); 

// ----- UYGULAMA YAPILANDIRMASI BÖLÜMÜ -----
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();
// ----- UYGULAMA YAPILANDIRMASI BÖLÜMÜ BİTİŞ -----

app.Run();