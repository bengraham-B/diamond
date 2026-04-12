using Class;
using MariaDB;
using MySqlConnector;

namespace Budget;

public static class BudgetOperations
{

    public static bool AddBudget(Conn conn, BudgetModel budget)
    {
        try
        {
            using var connection = conn.Open();
            const string SQL = @"
                INSERT INTO BUDGET 
                    (BUDGET_ID, ACCOUNT_ID, GL_ACCOUNT_ID, BUDGET_AMOUNT, BUDGET_PERIOD)
                VALUES
                    (@BUDGET_ID, @ACCOUNT_ID, @GL_ACCOUNT_ID, @BUDGET_AMOUNT, 'MONTH')
            ";
            using var cmd = new MySqlCommand(SQL, connection);

            cmd.Parameters.Add("@BUDGET_ID", MySqlDbType.Guid).Value = Guid.NewGuid();
            cmd.Parameters.Add("@ACCOUNT_ID", MySqlDbType.Guid).Value = budget.ACCOUNT_ID;
            cmd.Parameters.Add("@GL_ACCOUNT_ID", MySqlDbType.Guid).Value = budget.GL_ACCOUNT_ID;
            cmd.Parameters.Add("@BUDGET_AMOUNT", MySqlDbType.Double).Value = budget.BUDGET_AMOUNT;

            int rowsAffected = cmd.ExecuteNonQuery();
            if (rowsAffected == 0)
                throw new Exception("Could not att Budge");

            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }

    public static List<BudgetModel> GetBudgets(Conn conn, RequestParams req)
    {
        try
        {
            const string SQL = @"
                SELECT 
                    * 
                FROM 
                    BUDGET
                LEFT JOIN GL_ACCOUNT ON BUDGET.GL_ACCOUNT_ID = GL_ACCOUNT.GL_ACCOUNT_ID
                WHERE 
                    BUDGET.ACCOUNT_ID=@ACCOUNT_ID
                ";
            using var connection = conn.Open();
            using var cmd = new MySqlCommand(SQL, connection);
            cmd.Parameters.Add("@ACCOUNT_ID", MySqlDbType.Guid).Value = req.ACCOUNT_ID;

            var reader = cmd.ExecuteReader();

            List<BudgetModel> returnBudgets = new List<BudgetModel>();
            while (reader.Read())
            {
                returnBudgets.Add(new BudgetModel
                {
                    ACCOUNT_ID = reader.GetGuid("ACCOUNT_ID"),
                    BUDGET_ID = reader.GetGuid("BUDGET_ID"),
                    BUDGET_AMOUNT = reader.GetDouble("BUDGET_AMOUNT"),
                    BUDGET_PERIOD = reader.GetString("BUDGET_PERIOD"),
                    GL_ACCOUNT_NAME = reader.GetString("GL_ACCOUNT_NAME"),
                    GL_ACCOUNT_ID = reader.GetGuid("GL_ACCOUNT_ID"),
                    GL_ACCOUNT_TYPE = reader.GetString("GL_ACCOUNT_TYPE")
                });
            }

            return returnBudgets;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}