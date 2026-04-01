using Class;
using Microsoft.AspNetCore.Mvc;
using MariaDB;
using MySqlConnector;

namespace Diamond2026_Personal.Controllers.Budget;
[Route("api/budget")]
public class BudgetController(Conn conn): ControllerBase
{

    [HttpPost("add_budget")]
    public IActionResult AddBudget([FromBody] BudgetController budgetController)
    {
        return Ok( new { message = "Budget Created" } );
    }

    [HttpPost("get_budgets")]
    public IActionResult GetBudgets([FromBody] RequestParams requestParams)
    {
        try
        {
            const string SQL = @"

                SELECT
                    BUDGET.BUDGET_ID,
                    GL_ACCOUNT.GL_ACCOUNT_NAME AS GL_ACCOUNT_NAME,
                    GL_ACCOUNT.GL_ACCOUNT_TYPE AS GL_ACCOUNT_TYPE,
                    GL_ACCOUNT.GL_ACCOUNT_ID,
                    BUDGET.AMOUNT AS BUDGET_AMOUNT,
                    SUM(CASH.AMOUNT) AS ACTUAL_AMOUNT,
                    GL_HEADER.SOURCE_TYPE,
                    CASH.WEEK,
                    BUDGET.BUDGET_PERIOD
                
                FROM BUDGET
                    
                LEFT JOIN GL_ACCOUNT ON BUDGET.GL_ACCOUNT_ID = GL_ACCOUNT.GL_ACCOUNT_ID
                LEFT JOIN GL_LINE ON GL_LINE.GL_ACCOUNT_ID = GL_ACCOUNT.GL_ACCOUNT_ID
                LEFT JOIN GL_HEADER ON GL_LINE.GL_HEADER_ID = GL_HEADER.GL_HEADER_ID
                LEFT JOIN CASH_TXN CASH ON CASH.CASH_TXN_ID = GL_HEADER.TRANSACTION_ID

                WHERE
                    BUDGET.ACCOUNT_ID=@ACCOUNT_ID
                    AND GL_ACCOUNT.GL_ACCOUNT_TYPE <> 'ASSET'
                    AND GL_HEADER.SOURCE_TYPE='CASH'

                GROUP BY
                    GL_ACCOUNT.GL_ACCOUNT_NAME,
                    GL_ACCOUNT.GL_ACCOUNT_TYPE,
                    BUDGET.AMOUNT,
                    CASH.DETAILS,
                    GL_HEADER.SOURCE_TYPE
                
            ";

            using var connection = conn.Open();
            using var cmd = new MySqlCommand(SQL, connection);
            cmd.Parameters.Add("@ACCOUNT_ID", MySqlDbType.Guid).Value = requestParams.ACCOUNT_ID;

            using var reader = cmd.ExecuteReader();
            List<BudgetModel> USER_BUDGETS = new List<BudgetModel>();

            while (reader.Read())
            {
                USER_BUDGETS.Add(new BudgetModel
                {
                    ACCOUNT_ID = requestParams.ACCOUNT_ID,
                    GL_ACCOUNT_ID = reader.GetGuid("GL_ACCOUNT_ID"),
                    BUDGET_ID = reader.GetGuid("BUDGET_ID"),
                    BUDGET_AMOUNT = reader.GetDouble("BUDGET_AMOUNT"),
                    ACTUAL_AMOUNT = reader.GetDouble("ACTUAL_AMOUNT"),
                    GL_ACCOUNT_NAME = reader.GetString("GL_ACCOUNT_NAME"),
                    GL_ACCOUNT_TYPE = reader.GetString("GL_ACCOUNT_TYPE"),
                    BUDGET_PERIOD = reader.GetString("BUDGET_PERIOD")
                });
            }
            
            return Ok(USER_BUDGETS);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, new { message = $"Could not Get Budgets: {e}" });
        }
    }
    
    

}