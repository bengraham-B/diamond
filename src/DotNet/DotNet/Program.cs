var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen()

var app = builder.Build();

// app.UseX() --> MiddleWare
app.UseHttpsRedirection();
app.UseAuthorization();

// app.MapX() --> Routing
app.MapControllers();

app.Run();