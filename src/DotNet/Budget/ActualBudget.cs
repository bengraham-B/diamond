using Class;
using MariaDB;
using MySqlConnector;

namespace Budget;

public class ActualBudget
{
    public static List<BudgetModel> GetActualBudgets(Conn conn, RequestParams req)
    {

        string SQL = @"
            SELECT
                GL_ACCOUNT.GL_ACCOUNT_TYPE,
                GL_ACCOUNT.GL_ACCOUNT_NAME,
                GL_ACCOUNT.GL_ACCOUNT_ID,
                D.ACCOUNT_ID AS ACCOUNT_ID,
                BUDGET.BUDGET_ID,
                BUDGET.BUDGET_PERIOD,
                (BUDGET.BUDGET_AMOUNT * 12) AS BUDGET_YEAR_AMOUNT,
(BUDGET.BUDGET_AMOUNT * 12) - SUM(D.AMOUNT) AS BUDGET_VARIANCE,
        ";


        List<string> monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"];
        for (int i = 0; i < monthNames.Count; i++)
        {
            SQL += @$"
                SUM(
                    CASE
                        WHEN D.TXN_TYPE='EXPENSE' AND SOURCE='CASH' AND GL_ACCOUNT_TYPE='EXPENSE'  AND MONTH='{i+1}' THEN D.AMOUNT
                        WHEN D.TXN_TYPE='INCOME'  AND SOURCE='CASH' AND GL_ACCOUNT_TYPE='EXPENSE' AND MONTH='{i+1}' THEN -D.AMOUNT

                        WHEN D.TXN_TYPE='INCOME'  AND SOURCE='CASH' AND GL_ACCOUNT_TYPE='INCOME' AND MONTH='{i+1}' THEN D.AMOUNT

                        WHEN D.TXN_TYPE='INCREASE' AND SOURCE='CREDIT_CARD' AND GL_ACCOUNT_TYPE='EXPENSE' AND MONTH='{i+1}' THEN D.AMOUNT
                        ELSE 0
                    END
                ) AS ACTUAL_{monthNames[i]},
            ";

        }

        SQL += "BUDGET.BUDGET_AMOUNT"; // Putting this year else having a comma after DEC will throw an error.

        SQL += @"
            FROM
                BUDGET

            LEFT JOIN GL_ACCOUNT ON BUDGET.GL_ACCOUNT_ID = GL_ACCOUNT.GL_ACCOUNT_ID
            LEFT JOIN DIAMOND_TRANSACTION D ON D.GL_ACCOUNT_ID = BUDGET.GL_ACCOUNT_ID AND D.ACCOUNT_ID = @ACCOUNT_ID

            WHERE 
                BUDGET.ACCOUNT_ID=@ACCOUNT_ID

            GROUP BY
                GL_ACCOUNT.GL_ACCOUNT_TYPE,
                GL_ACCOUNT.GL_ACCOUNT_NAME,
                GL_ACCOUNT.GL_ACCOUNT_ID,
                BUDGET.BUDGET_ID,
                BUDGET.BUDGET_AMOUNT,
                BUDGET.BUDGET_PERIOD,
                BUDGET.ACCOUNT_ID
            
            ORDER BY
                GL_ACCOUNT.GL_ACCOUNT_TYPE DESC,
                GL_ACCOUNT.GL_ACCOUNT_NAME ASC
        ";

        using var connection = conn.Open();
        using var cmd = new MySqlCommand(SQL, connection);
        cmd.Parameters.Add("@ACCOUNT_ID", MySqlDbType.Guid).Value = req.ACCOUNT_ID;
        var reader = cmd.ExecuteReader();

        List<BudgetModel> budgets = new List<BudgetModel>();
        
        while (reader.Read())
        {
            budgets.Add(new BudgetModel
            {
                ACCOUNT_ID = reader.IsDBNull(reader.GetOrdinal("ACCOUNT_ID")) ? null : reader.GetGuid("ACCOUNT_ID"),
                
                BUDGET_ID = reader.IsDBNull(reader.GetOrdinal("BUDGET_ID")) ? null : reader.GetGuid("BUDGET_ID"),
                BUDGET_AMOUNT = reader.IsDBNull(reader.GetOrdinal("BUDGET_AMOUNT")) ? 0 : reader.GetDouble("BUDGET_AMOUNT"),
                BUDGET_PERIOD = reader.GetString("BUDGET_PERIOD"),
                BUDGET_VARIANCE = reader.IsDBNull(reader.GetOrdinal("BUDGET_VARIANCE")) ? 0 : reader.GetDouble("BUDGET_VARIANCE"),
                BUDGET_YEAR_AMOUNT = reader.IsDBNull(reader.GetOrdinal("BUDGET_YEAR_AMOUNT")) ? 0 : reader.GetDouble("BUDGET_YEAR_AMOUNT"),
               
                GL_ACCOUNT_ID = reader.IsDBNull(reader.GetOrdinal("GL_ACCOUNT_ID")) ? null : reader.GetGuid("GL_ACCOUNT_ID"),
                GL_ACCOUNT_NAME = reader.GetString("GL_ACCOUNT_NAME"),
                GL_ACCOUNT_TYPE = reader.GetString("GL_ACCOUNT_TYPE"),
                
                JAN = reader.GetDouble("ACTUAL_JAN"),
                FEB = reader.GetDouble("ACTUAL_FEB"),
                MAR = reader.GetDouble("ACTUAL_MAR"),
                APR = reader.GetDouble("ACTUAL_APR"),
                MAY = reader.GetDouble("ACTUAL_MAY"),
                JUN = reader.GetDouble("ACTUAL_JUN"),
                JUL = reader.GetDouble("ACTUAL_JUL"),
                AUG = reader.GetDouble("ACTUAL_AUG"),
                SEPT = reader.GetDouble("ACTUAL_SEPT"),
                OCT = reader.GetDouble("ACTUAL_OCT"),
                NOV = reader.GetDouble("ACTUAL_NOV"),
                DEC = reader.GetDouble("ACTUAL_DEC")
            });
        }
        return budgets;
    }
}