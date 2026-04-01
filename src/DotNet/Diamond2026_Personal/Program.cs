using MariaDB;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSingleton<Conn>(); // Register the connection provider. This allows it to be reused throughout the APP.

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy
            // .WithOrigins("http://Bens-MacBook-Air:4200") // DEV
            // .WithOrigins("http://192.168.101.41:4200") // DEV
            //.WithOrigins("http://localhost:4200") // DEV
             .WithOrigins("http://localhost:6900") // DEV NEW
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});


builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // Serlize Enums as strings
        options.JsonSerializerOptions.Converters.Add(
            new System.Text.Json.Serialization.JsonStringEnumConverter()
        );
        options.JsonSerializerOptions.PropertyNamingPolicy = null; // API Calls returns show CAPS where the Class is CAPS
    });

builder.WebHost.UseUrls("http://0.0.0:6700"); // This is required so pc's on the network can access the server.

var app = builder.Build();

// Use CORS
app.UseCors("AllowAngular");

// app.UseHttpsRedirection();
// app.UseAuthorization();
app.MapControllers();
app.Run();