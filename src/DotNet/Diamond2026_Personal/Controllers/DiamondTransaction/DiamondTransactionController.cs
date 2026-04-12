using Class;
using Microsoft.AspNetCore.Mvc;
using MariaDB;

namespace Diamond2026_Personal.Controllers.DiamondTransaction;

public class DiamondTransactionController(Conn conn): ControllerBase
{
    [HttpPost("")]
    public IActionResult GetDiamondTransactionsController([FromBody] RequestParams req)
    {
        return Ok();
    }
    
    
    
    
    
}