using Budget;
using Class;
using Microsoft.AspNetCore.Mvc;
using MariaDB;

using MySqlConnector;

namespace Diamond2026_Personal.Controllers.Budget;
[Route("api/budget")]
public class BudgetController(Conn conn): ControllerBase
{

    [HttpPost("add_budget")]
    public IActionResult AddBudgetController([FromBody] BudgetModel budget)
    {
        BudgetOperations.AddBudget(conn, budget);
        return Ok( new { message = "Budget Created" } );
    }

    [HttpPost("get_budgets")]
    public IActionResult GetBudgetsController([FromBody] RequestParams requestParams)
    {
        return Ok(BudgetOperations.GetBudgets(conn, requestParams));
    }
}