using Class;
using Microsoft.AspNetCore.Mvc;
using MariaDB;

namespace Diamond2026_Personal.Controllers.DiamondTransaction;

public class DiamondTransactionController(Conn conn): ControllerBase
{
    [HttpPost("get_diamond_transactions")]
    public IActionResult GetDiamondTransactionsController([FromBody] RequestParams req)
    {
        return Ok();
    }

    [HttpPost("add_diamond_transaction")]
    public IActionResult AddDiamondTransaction([FromBody] Class.DiamondTransactionModel txn)
    {
        return Ok();
    }

    [HttpPut("edit_diamond_transaction")]
    public IActionResult UpdateDiamondTransaction([FromBody] Class.DiamondTransactionModel txn)
    {
        return Ok();
    }

    [HttpDelete("delete_diamond_transaction")]
    public IActionResult DeleteDiamondTransaction([FromBody] RequestParams requestParams)
    {
        return Ok();
    }
    
    
    
}