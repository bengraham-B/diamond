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

    [HttpPost("")]
    public IActionResult AddDiamondTransaction([FromBody] Class.DiamondTransactionModel txn)
    {
        return Ok();
    }

    [HttpPut("")]
    public IActionResult UpdateDiamondTransaction([FromBody] Class.DiamondTransactionModel txn)
    {
        return Ok();
    }

    [HttpDelete("")]
    public IActionResult DeleteDiamondTransaction([FromBody] RequestParams requestParams)
    {
        return Ok();
    }
    
    
    
}