using MySqlConnector;
using Utils;

namespace DiamondTransaction;
using Class;
using MariaDB;

public class DiamondTransactionCRUD
{
    public static List<DiamondTransactionModel> GetDiamondTransaction(Conn conn, RequestParams req)
    {
        const string SQL = @"
           SELECT
               *
           FROM
               DIAMOND_TRANSACTION DT
           LEFT JOIN GL_ACCOUNT ON DT.GL_ACCOUNT_ID = GL_ACCOUNT.GL_ACCOUNT_ID
           LEFT JOIN MERCHANT ON DT.MERCHANT_ID = MERCHANT.MERCHANT_ID
           WHERE
               DT.ACCOUNT_ID=@ACCOUNT_ID
           ORDER BY DAY DESC

        ";

        using var connection = conn.Open();
        using var cmd = new MySqlCommand(SQL, connection);
        cmd.Parameters.Add("@ACCOUNT_ID", MySqlDbType.Guid).Value = req.ACCOUNT_ID;
        var reader = cmd.ExecuteReader();

        List<DiamondTransactionModel> diamondTransactions = new List<DiamondTransactionModel>();

        while (reader.Read())
        {
            diamondTransactions.Add(new DiamondTransactionModel
                {
                    ACCOUNT_ID = reader.GetGuid("ACCOUNT_ID"),
                    DIAMOND_TRANSACTION_ID = reader.GetGuid("DIAMOND_TRANSACTION_ID"),
                    AMOUNT = reader.GetDouble("AMOUNT"),
                    DETAILS = reader.GetString("DETAILS"),
                    
                    TXN_TYPE = reader.GetString("TXN_TYPE"),
                    SOURCE = reader.GetString("SOURCE"),
                    
                    DATE = reader.GetString("DATE"),
                    DAY = reader.GetInt32("DAY"),
                    DAY_OF_WEEK = reader.GetString("DAY_OF_WEEK"),
                    DAY_OF_YEAR = reader.GetInt32("DAY_OF_YEAR"),
                    MONTH = reader.GetInt32("MONTH"),
                    YEAR = reader.GetInt32("YEAR"),
                    
                    MERCHANT_ID = reader.IsDBNull(reader.GetOrdinal("MERCHANT_ID")) ? null : reader.GetGuid("ACCOUNT_ID"),
                    MERCHANT_NAME = reader.IsDBNull(reader.GetOrdinal("NAME")) ? null : reader.GetString("NAME"),

                    GL_ACCOUNT_ID = reader.IsDBNull(reader.GetOrdinal("GL_ACCOUNT_ID")) ? null : reader.GetGuid("GL_ACCOUNT_ID"),
                    GL_ACCOUNT_NAME = reader.IsDBNull(reader.GetOrdinal("GL_ACCOUNT_NAME")) ? null : reader.GetString("GL_ACCOUNT_NAME"),
                    GL_ACCOUNT_TYPE = reader.IsDBNull(reader.GetOrdinal("GL_ACCOUNT_TYPE")) ? null : reader.GetString("GL_ACCOUNT_TYPE"),
                }
            );
            
        }
        return diamondTransactions;
    }

    public static bool AddDiamondTransaction(Conn conn, DiamondTransactionModel txn)
    {
        try
        {
            const string SQL = @"
                INSERT INTO DIAMOND_TRANSACTION 
                    (DIAMOND_TRANSACTION_ID, ACCOUNT_ID, AMOUNT, DETAILS, SOURCE, TXN_TYPE, GL_ACCOUNT_ID, MERCHANT_ID, RECEIVABLE, DEBTOR_ID, DATE, DAY, DAY_OF_YEAR, DAY_OF_WEEK, WEEK, MONTH, YEAR) 
                VALUES 
                    (@DIAMOND_TRANSACTION_ID, @ACCOUNT_ID, @AMOUNT, @DETAILS, @SOURCE, @TXN_TYPE, @GL_ACCOUNT_ID, @MERCHANT_ID, @RECEIVABLE, @DEBTOR_ID, @DATE, @DAY, @DAY_OF_YEAR, @DAY_OF_WEEK, @WEEK, @MONTH, @YEAR) 

            ";

            using var connection = conn.Open();
            using var cmd = new MySqlCommand(SQL, connection);

            cmd.Parameters.AddWithValue("@DIAMOND_TRANSACTION_ID", txn.DIAMOND_TRANSACTION_ID == Guid.Empty ? Guid.NewGuid() : txn.DIAMOND_TRANSACTION_ID);
            cmd.Parameters.AddWithValue("@ACCOUNT_ID", txn.ACCOUNT_ID);
            cmd.Parameters.AddWithValue("@AMOUNT", txn.AMOUNT);
            cmd.Parameters.AddWithValue("@DETAILS", txn.DETAILS);
            cmd.Parameters.AddWithValue("@SOURCE", txn.SOURCE);
            cmd.Parameters.AddWithValue("@TXN_TYPE", txn.TXN_TYPE);
            cmd.Parameters.AddWithValue("@GL_ACCOUNT_ID", txn.GL_ACCOUNT_ID);
            cmd.Parameters.AddWithValue("@MERCHANT_ID", txn.MERCHANT_ID);
            cmd.Parameters.AddWithValue("@RECEIVABLE", txn.RECEIVABLE);
            cmd.Parameters.AddWithValue("@DEBTOR_ID", txn.DEBTOR_ID);

            DateBrokenDownModel pDate = DateUtils.BreakDownDate(txn.DATE);
            cmd.Parameters.AddWithValue("@DATE", txn.DATE);
            cmd.Parameters.AddWithValue("@DAY", pDate.day);
            cmd.Parameters.AddWithValue("@DAY_OF_WEEK", pDate.dayOfWeek);
            cmd.Parameters.AddWithValue("@DAY_OF_YEAR", pDate.dayOfYear);
            cmd.Parameters.AddWithValue("@WEEK", pDate.week);
            cmd.Parameters.AddWithValue("@MONTH", pDate.month);
            cmd.Parameters.AddWithValue("@YEAR", pDate.year);

            int rowsAffected = cmd.ExecuteNonQuery();
            return rowsAffected != 0;
        }
        catch (Exception e)
        {
            throw new Exception($"\nCould not [ADD] DIAMOND_TRANSACTION: \n{e}\n");
        }
    }

    public static bool UpdateDiamondTransaction(Conn conn, DiamondTransactionModel txn)
    {
        const string SQL = @"
            UPDATE
                DIAMOND_TRANSACTION
            SET
                AMOUNT=@AMOUNT,
                DETAILS=@DETAILS,
                TXN_TYPE=@TXN_TYPE,
                SOURCE=@SOURCE,
                GL_ACCOUNT_ID=@GL_ACCOUNT_ID,
                MERCHANT_ID=@MERCHANT_ID,
                RECEIVABLE=@RECEIVABLE,
                DEBTOR_ID=@DEBTOR_ID,
                DATE=@DATE,
                DAY=@DAY,
                DAY_OF_WEEK=@DAY_OF_WEEK,
                DAY_OF_YEAR=@DAY_OF_YEAR,
                WEEK=@WEEK,
                MONTH=@MONTH,
                YEAR=@YEAR
            WHERE
                DIAMOND_TRANSACTION_ID=@DIAMOND_TRANSACTION_ID
                AND ACCOUNT_ID=@ACCOUNT_ID

";
        try
        {
            using var connection = conn.Open();
            using var cmd = new MySqlCommand(SQL, connection);

            cmd.Parameters.AddWithValue("@DIAMOND_TRANSACTION_ID", txn.DIAMOND_TRANSACTION_ID == Guid.Empty ? Guid.NewGuid() : txn.DIAMOND_TRANSACTION_ID);
            cmd.Parameters.AddWithValue("@ACCOUNT_ID", txn.ACCOUNT_ID);
            cmd.Parameters.AddWithValue("@AMOUNT", txn.AMOUNT);
            cmd.Parameters.AddWithValue("@DETAILS", txn.DETAILS);
            cmd.Parameters.AddWithValue("@SOURCE", txn.SOURCE);
            cmd.Parameters.AddWithValue("@TXN_TYPE", txn.TXN_TYPE);
            cmd.Parameters.AddWithValue("@GL_ACCOUNT_ID", txn.GL_ACCOUNT_ID);
            cmd.Parameters.AddWithValue("@MERCHANT_ID", txn.MERCHANT_ID);
            cmd.Parameters.AddWithValue("@RECEIVABLE", txn.RECEIVABLE);
            cmd.Parameters.AddWithValue("@DEBTOR_ID", txn.DEBTOR_ID);

            DateBrokenDownModel pDate = DateUtils.BreakDownDate(txn.DATE);
            cmd.Parameters.AddWithValue("@DATE", txn.DATE);
            cmd.Parameters.AddWithValue("@DAY", pDate.day);
            cmd.Parameters.AddWithValue("@DAY_OF_WEEK", pDate.dayOfWeek);
            cmd.Parameters.AddWithValue("@DAY_OF_YEAR", pDate.dayOfYear);
            cmd.Parameters.AddWithValue("@WEEK", pDate.week);
            cmd.Parameters.AddWithValue("@MONTH", pDate.month);
            cmd.Parameters.AddWithValue("@MONTH_NAME", pDate.monthName);
            cmd.Parameters.AddWithValue("@YEAR", pDate.year);

            int result = cmd.ExecuteNonQuery();
            return result != 0;
        }
        catch (Exception e)
        {
            throw new Exception($"\nCould not [UPDATE] DIAMOND_TRANSACTION: \n{e}\n");
        }
    }

    public static bool DeleteDiamondTransaction(Conn conn, RequestParams requestParams)
    {
        try
        {
            const string SQL = @"
                DELETE FROM DIAMOND_TRANSACTION WHERE ACCOUNT_ID=@ACCOUNT_ID AND DIAMOND_TRANSACTION_ID=@DIAMOND_TRANSACTION_ID;
            ";

            using var connection = conn.Open();
            using var cmd = new MySqlCommand(SQL, connection);
            cmd.Parameters.AddWithValue("@ACCOUNT_ID", requestParams.ACCOUNT_ID);
            cmd.Parameters.AddWithValue("@DIAMOND_TRANSACTION_ID", requestParams.DIAMOND_TRANSACTION_ID);

            int rowsEffected = cmd.ExecuteNonQuery();
            return rowsEffected != 0;
        }
        catch (Exception e)
        {
            throw new Exception($"\nCould not [DELETE] DIAMOND_TRANSACTION: \n{e}\n");
        }
    }
}