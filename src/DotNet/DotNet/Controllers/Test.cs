using Microsoft.AspNetCore.Mvc;

namespace DotNet.Controllers;

[ApiController]
[Route("api/test")]
public class Test: ControllerBase
{
    private readonly DateTime _timestamp = DateTime.UtcNow;
    
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new
        {
                message = "Diamond2026 Dotnet API 💖💖💖",
                _timestamp
        });
    }

    [HttpPost]
    public IActionResult Post([FromBody] object payload)
    {
        return Ok(new
        {
                message = payload,
                _timestamp
        });
    }
}