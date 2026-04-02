using Budget;
using Class;
using MariaDB;
using Microsoft.AspNetCore.Mvc;

namespace Diamond2026_Personal.Controllers.Budget;
[Route("api/actual_budget")]
public class ActualBudgetController(Conn conn): ControllerBase
{
    [HttpPost("get_actual_budgets")]
    public IActionResult GetActualBudgetController([FromBody] RequestParams req)
    {
        return Ok(ActualBudget.GetActualBudgets(conn, req));
    }
    
}