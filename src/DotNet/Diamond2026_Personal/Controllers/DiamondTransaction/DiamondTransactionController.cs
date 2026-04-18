using Class;
using DiamondTransaction;
using Microsoft.AspNetCore.Mvc;
using MariaDB;

namespace Diamond2026_Personal.Controllers.DiamondTransaction;
[Route("api/diamond_transaction")]

public class DiamondTransactionController(Conn conn): ControllerBase
{
    [HttpPost("get_diamond_transactions")]
    public IActionResult GetDiamondTransactionsController([FromBody] RequestParams req)
    {
        List<DiamondTransactionModel> txns = DiamondTransactionCRUD.GetDiamondTransaction(conn, req);
        return Ok(txns);
    }

    [HttpPost("add_diamond_transaction")]
    public IActionResult AddDiamondTransaction([FromBody] DiamondTransactionModel txn)
    {
        return Ok(DiamondTransactionCRUD.AddDiamondTransaction(conn, txn));
    }

    [HttpPut("edit_diamond_transaction")]
    public IActionResult UpdateDiamondTransaction([FromBody] DiamondTransactionModel txn)
    {
        return Ok(DiamondTransactionCRUD.UpdateDiamondTransaction(conn, txn));
    }

    [HttpDelete("delete_diamond_transaction")]
    public IActionResult DeleteDiamondTransaction([FromBody] RequestParams requestParams)
    {
        return Ok(DiamondTransactionCRUD.DeleteDiamondTransaction(conn, requestParams));
    }
}