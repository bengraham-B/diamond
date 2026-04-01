using Class;
using Diamond2026_Personal.Class;
using MariaDB; // DB Connection class
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MySqlConnector;

namespace Diamond2026_Personal.Controllers.Cash;

[Route("api/cash_txn")]
public class CashController: ControllerBase
{
    
    // DateBase Connection
    private readonly Conn _conn;
    
    // Constructor
    public CashController(Conn conn)
    {
        _conn = conn; // Injected
    }

    [HttpGet("test")]
    public IActionResult Test()
    {
        return Ok("Cash TXN Diamond2026_Personal Working [API] 2");
    }

    [HttpPost("get_cash_txn")]
    public IActionResult GetCashTXN([FromBody] RequestParams requestParams)
    {
        Guid accountID = requestParams.ACCOUNT_ID;
        // First make a DB call to get a flat List of TXN
        const string SQL = @"
            SELECT
                CASH_TXN.CASH_TXN_ID AS TRANSACTION_ID,
                CASH_TXN.ACCOUNT_id,
                CASH_TXN.DATE,
                CASH_TXN.DETAILS,
                CASH_TXN.AMOUNT,
                CASH_TXN.CREATED,
                CASH_TXN.MERCHANT_ID,

                CASH_TXN.RECEIVABLE,
                CASH_TXN.DEBTOR_ID,
                DEBTOR.NAME AS DEBTOR_NAME,

                CASH_TXN.DAY,
                CASH_TXN.DAY_OF_WEEK,
                CASH_TXN.WEEK,
                CASH_TXN.MONTH,
                CASH_TXN.MONTH_NAME,
                CASH_TXN.YEAR,

                MERCHANT.NAME AS 'MERCHANT_NAME',

                GL_HEADER.SOURCE_TYPE AS 'SOURCE',

                GL_ACCOUNT.GL_ACCOUNT_ID,
                GL_ACCOUNT.GL_ACCOUNT_NAME,
                GL_ACCOUNT.GL_ACCOUNT_TYPE,
                GL_ACCOUNT.GL_ACCOUNT_CODE,
                
                GL_LINE.GL_LINE_ID,
                GL_HEADER.GL_HEADER_ID

            FROM
                CASH_TXN

            LEFT JOIN GL_HEADER ON CASH_TXN.CASH_TXN_ID = GL_HEADER.TRANSACTION_ID
            LEFT JOIN GL_LINE ON GL_HEADER.GL_HEADER_ID = GL_LINE.GL_HEADER_ID
            LEFT JOIN GL_ACCOUNT ON GL_LINE.GL_ACCOUNT_ID = GL_ACCOUNT.GL_ACCOUNT_ID
            LEFT JOIN MERCHANT ON CASH_TXN.MERCHANT_ID = MERCHANT.MERCHANT_ID
            LEFT JOIN DEBTOR ON CASH_TXN.DEBTOR_ID = DEBTOR.DEBTOR_ID


            WHERE
                GL_HEADER.SOURCE_TYPE = 'CASH'
                AND GL_ACCOUNT.GL_ACCOUNT_TYPE <> 'ASSET'
                AND CASH_TXN.ACCOUNT_ID = @accountID
                

            UNION ALL

            SELECT
                CC.CREDIT_CARD_TXN_ID AS TRANSACTION_ID,
                CC.ACCOUNT_id,
                CC.DATE,
                CONCAT(CC.DETAILS, ' | CREDIT CARD REPAID'),
                CC.AMOUNT,
                CC.CREATED,
                CC.MERCHANT_ID,

                CC.RECEIVABLE,
                CC.DEBTOR_ID,
                DEBTOR.NAME AS DEBTOR_NAME,

                CC.DAY,
                CC.DAY_OF_WEEK,
                CC.WEEK,
                CC.MONTH,
                CC.MONTH_NAME,
                CC.YEAR,

                'Bank',

                GL_HEADER.SOURCE_TYPE AS 'SOURCE',

                GL_ACCOUNT.GL_ACCOUNT_ID,
                GL_ACCOUNT.GL_ACCOUNT_NAME,
                'CREDIT CARD',
                GL_ACCOUNT.GL_ACCOUNT_CODE,
                
                 GL_LINE.GL_LINE_ID,
                 GL_HEADER.GL_HEADER_ID

            FROM
                CREDIT_CARD_TXN CC

            LEFT JOIN GL_HEADER ON CC.CREDIT_CARD_TXN_ID = GL_HEADER.TRANSACTION_ID
            LEFT JOIN GL_LINE ON GL_HEADER.GL_HEADER_ID = GL_LINE.GL_HEADER_ID
            LEFT JOIN GL_ACCOUNT ON GL_LINE.GL_ACCOUNT_ID = GL_ACCOUNT.GL_ACCOUNT_ID
            LEFT JOIN MERCHANT ON CC.MERCHANT_ID = MERCHANT.MERCHANT_ID
            LEFT JOIN DEBTOR ON CC.DEBTOR_ID = DEBTOR.DEBTOR_ID

            WHERE
                GL_HEADER.SOURCE_TYPE = 'CREDIT_CARD' AND
                CC.ACCOUNT_ID=@accountID AND
                GL_ACCOUNT_TYPE = 'ASSET' AND GL_LINE.DEBIT_CREDIT = 'CREDIT' AND (GL_ACCOUNT_CODE =1000 OR GL_ACCOUNT_CODE BETWEEN 5000 AND 5999)

            ORDER BY
                DATE DESC
                ;
        ";
        
        using var connection = _conn.Open();
        using var cmd = new MySqlCommand(SQL, connection);
        cmd.Parameters.Add("@accountID", MySqlDbType.Guid).Value = requestParams.ACCOUNT_ID;
        // cmd.Parameters.Add("@MONTH", MySqlDbType.Int64).Value = requestParams.MONTH;
        using var reader = cmd.ExecuteReader();

        var txns = new List<Transaction>();
        while (reader.Read())
        {
            txns.Add(new Transaction
            {
                TRANSACTION_ID = reader.IsDBNull(reader.GetOrdinal("DAY")) ? null : reader.GetGuid("TRANSACTION_ID"),
                ACCOUNT_ID = reader.GetGuid("ACCOUNT_ID"),
                
                AMOUNT = reader.GetDecimal("AMOUNT"),
                DETAILS = reader.GetString("DETAILS"),
                TRANSACTION_SOURCE = TransactionTypeEnum.CASH,
                
                DATE = reader.GetString("DATE"),
                DAY = reader.IsDBNull(reader.GetOrdinal("DAY")) ? null : reader.GetInt32("DAY"),
                DAY_OF_WEEK = reader.IsDBNull(reader.GetOrdinal("DAY")) ? null : reader.GetString("DAY_OF_WEEK"),
                WEEK = reader.IsDBNull(reader.GetOrdinal("DAY")) ? null : reader.GetInt32("WEEK"),
                MONTH = reader.IsDBNull(reader.GetOrdinal("DAY")) ? null : reader.GetInt32("MONTH"),
                MONTH_NAME = reader.IsDBNull(reader.GetOrdinal("DAY")) ? null : reader.GetString("MONTH_NAME"),
                YEAR = reader.IsDBNull(reader.GetOrdinal("DAY")) ? null : reader.GetInt32("YEAR"),
                TYPE =  reader.GetString("GL_ACCOUNT_TYPE"),
                
                GL_LINE_ID = reader.GetGuid("GL_LINE_ID"),
                GL_HEADER_ID = reader.GetGuid("GL_HEADER_ID"),
                
                GL_ACCOUNT = new GL_ACCOUNT_MODEL
                {
                    GL_ACCOUNT_ID = reader.GetGuid("GL_ACCOUNT_ID"),
                    GL_ACCOUNT_NAME = reader.GetString("GL_ACCOUNT_NAME"),
                    GL_ACCOUNT_TYPE = reader.GetString("GL_ACCOUNT_TYPE"),
                    GL_ACCOUNT_CODE = reader.GetInt32("GL_ACCOUNT_CODE")
                },
                
                MERCHANT_ID = reader.IsDBNull(reader.GetOrdinal("MERCHANT_ID")) ? null : reader.GetGuid("MERCHANT_ID"),
                MERCHANT_NAME = reader.IsDBNull(reader.GetOrdinal("MERCHANT_NAME")) ? null : reader.GetString("MERCHANT_NAME"),
                
                RECEIVABLE = !reader.IsDBNull(reader.GetOrdinal("RECEIVABLE")) && reader.GetBoolean("RECEIVABLE"), // returns false if not a RECEIVABLE_TXN
                DEBTOR_ID =  reader.IsDBNull(reader.GetOrdinal("DEBTOR_ID")) ? null : reader.GetGuid("DEBTOR_ID"),
                DEBTOR_NAME =  reader.IsDBNull(reader.GetOrdinal("DEBTOR_NAME")) ? null : reader.GetString("DEBTOR_NAME"),
                CREATED = reader.GetDateTime("CREATED")
            });
        }

        return Ok(txns);
    }

    [HttpPost("add_cash_txn")]
    public IActionResult AddCashTXN([FromBody] Transaction transaction)
    {

        if (!ModelState.IsValid)
            return BadRequest(ModelState); // Returns an error if the TXN model is incomplete or incorrect.
        
        int DEBIT_GL_ACCOUNT_CODE; 
        int CREDIT_GL_ACCOUNT_CODE; 
        
        //Breaking Down Date
        DateBrokenDown pDate = DateBrokenDown.BreakDownDate(transaction.DATE);
        // return Ok(pDate.day);
        
        if (transaction.TYPE == "EXPENSE")
        {
            CREDIT_GL_ACCOUNT_CODE = 1000; // DECREASING BANK
            DEBIT_GL_ACCOUNT_CODE = -5000; // SUNDRY EXPENSE GL_CODE INCREASING
            
            if (transaction.GL_CODE != null)
                DEBIT_GL_ACCOUNT_CODE = transaction.GL_CODE ?? 0; // If the user specified a category it will insert the GL_ACCOUNT_CODE in the insert statement
        }
        
        else if(transaction.TYPE == "INCOME")
        {
            DEBIT_GL_ACCOUNT_CODE = 1000; // INCREASE BANK
            CREDIT_GL_ACCOUNT_CODE = -4000; // INCREASING SUNDRY INCOME ACCOUNT

            if (transaction.GL_CODE != null)
                CREDIT_GL_ACCOUNT_CODE = transaction.GL_CODE ?? 0; // INCREASING USER SPECIFIED INCOME ACCOUNT
        }

        else
        {
           return StatusCode(500, new
           {
               error = $"Exception: Could not ADD CASH_TXN: No TXN type provided"
           });
        }

        try
        { 
            
            // Defing UUID's for SQL_TRANSACTION
            Guid CASH_TXN_ID = Guid.NewGuid();
            Guid GL_HEADER_ID = Guid.NewGuid();

            using var connection = _conn.Open();
            using var dbTx = connection.BeginTransaction();
            using var cmd = connection.CreateCommand();
            
            int displayReceivableCashTXN = 0;
            if (transaction is { RECEIVABLE: true, DEBTOR_ID: not null })
            {
                displayReceivableCashTXN = 1;
            }

            cmd.Transaction = dbTx;
            cmd.CommandText = @"
                -- ============================================================ INSERT CASH_TXN 
                INSERT INTO CASH_TXN
                    (CASH_TXN_ID, TRANSACTION_SOURCE, DATE, DETAILS, AMOUNT, ACCOUNT_ID, MERCHANT_ID, RECEIVABLE, DAY, DAY_OF_WEEK, WEEK, MONTH, MONTH_NAME, YEAR)
                VALUES
                    (@CASH_TXN_ID, 'CASH', @TXN_DATE, @TXN_DESC, @TXN_AMOUNT,  @ACCOUNT_ID, @MERCHANT_ID, @RECEIVABLE, @DAY, @DAY_OF_WEEK, @WEEK, @MONTH, @MONTH_NAME, @YEAR);

                -- ============================================================= INSERT GL_HEADER 
                INSERT INTO GL_HEADER
                    (GL_HEADER_ID, SOURCE_TYPE, TRANSACTION_ID, DETAILS, ACCOUNT_ID)
                VALUES
                    (@GL_HEADER_ID, @SOURCE_TYPE, @CASH_TXN_ID, @TXN_DESC, @ACCOUNT_ID);

                -- ============================================================== INSERT GL_LINES
                INSERT INTO GL_LINE
                    (GL_LINE_ID, GL_ACCOUNT_ID, GL_HEADER_ID, DEBIT_CREDIT, AMOUNT, ACCOUNT_ID)
                VALUES
                    (UUID(), (SELECT GL_ACCOUNT_ID FROM GL_ACCOUNT WHERE GL_ACCOUNT_CODE=@DEBIT_GL_CODE AND ACCOUNT_ID=@ACCOUNT_ID), @GL_HEADER_ID, 'DEBIT', @TXN_AMOUNT, @ACCOUNT_ID),
                    (UUID(), (SELECT GL_ACCOUNT_ID FROM GL_ACCOUNT WHERE GL_ACCOUNT_CODE=@CREDIT_GL_CODE AND ACCOUNT_ID=@ACCOUNT_ID), @GL_HEADER_ID, 'CREDIT', @TXN_AMOUNT, @ACCOUNT_ID);
            ";

            // This sections handles adding RECEIVABLE_TXNS based on the TYPE of the CASH_TXN
            if (transaction.RECEIVABLE)
            {
                if (transaction.DEBTOR_ID == null)
                    throw new Exception("No DEBTOR_ID was provided for a RECEIVABLE_TXN");
                
                Guid RECEIVABLE_TXN_ID = Guid.NewGuid();
                cmd.CommandText += $@"
                    -- ============================================================== INSERT RECEIVABLE_TXN
                    INSERT INTO RECEIVABLE_TXN
                        (RECEIVABLE_TXN_ID, TRANSACTION_ID, TRANSACTION_SOURCE, TYPE, DEBTOR_ID, ACCOUNT_ID)
                    VALUES 
                        (@RECEIVABLE_TXN_ID, @TRANSACTION_ID, @TRANSACTION_SOURCE, @TYPE, @DEBTOR_ID, @ACCOUNT_ID)
                ";

                cmd.Parameters.AddWithValue("@RECEIVABLE_TXN_ID",RECEIVABLE_TXN_ID);
                cmd.Parameters.AddWithValue("@TRANSACTION_ID", CASH_TXN_ID);
                cmd.Parameters.AddWithValue("@TRANSACTION_SOURCE", "CASH");
                cmd.Parameters.AddWithValue("@TYPE", transaction.TYPE == "INCOME" ? "DECREASE" : "INCREASE");
                cmd.Parameters.AddWithValue("@DEBTOR_ID",transaction.DEBTOR_ID);
            }

            
            cmd.Parameters.AddWithValue("@ACCOUNT_ID", transaction.ACCOUNT_ID);
            cmd.Parameters.AddWithValue("@CASH_TXN_ID", CASH_TXN_ID);
            cmd.Parameters.AddWithValue("@GL_HEADER_ID", GL_HEADER_ID);
            
            cmd.Parameters.AddWithValue("@TXN_AMOUNT", transaction.AMOUNT);
            cmd.Parameters.AddWithValue("@TXN_DESC", transaction.DETAILS);
            cmd.Parameters.AddWithValue("@TXN_DATE", transaction.DATE);
            
            cmd.Parameters.AddWithValue("@TRANSACTION_SOURCE", displayReceivableCashTXN);
            cmd.Parameters.AddWithValue("@SOURCE_TYPE", "CASH");

            cmd.Parameters.AddWithValue("@MERCHANT_ID", transaction.MERCHANT_ID);
            cmd.Parameters.AddWithValue("@RECEIVABLE", transaction.RECEIVABLE);
            
            cmd.Parameters.AddWithValue("@DAY", pDate.day);
            cmd.Parameters.AddWithValue("@DAY_OF_WEEK", pDate.dayOfWeek);
            cmd.Parameters.AddWithValue("@WEEK", pDate.week);
            cmd.Parameters.AddWithValue("@MONTH", pDate.month);
            cmd.Parameters.AddWithValue("@MONTH_NAME", pDate.monthName);
            cmd.Parameters.AddWithValue("@YEAR", pDate.year);
            
            cmd.Parameters.AddWithValue("@DEBIT_GL_CODE", DEBIT_GL_ACCOUNT_CODE);
            cmd.Parameters.AddWithValue("@CREDIT_GL_CODE", CREDIT_GL_ACCOUNT_CODE);

            int rows = cmd.ExecuteNonQuery();
            if (rows == 0)
            {
                throw new Exception("No rows Effected");
            }
            
            dbTx.Commit();
          
            return Ok(200);

        }
        catch (Exception e)
        {
            return StatusCode(500, new
            {
                error = $"Exception: Could not ADD CASH_TXN (end): {e}",
                message = e.Message,
            });
        }
    }

    [HttpPut("edit_cash_txn")]
    public IActionResult EditCashTXN([FromBody] Transaction transaction)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            using var connection = _conn.Open();
            using var dbTx = connection.BeginTransaction();
            using var cmd = connection.CreateCommand();
            cmd.Transaction = dbTx;
            cmd.CommandText = @"
-- UPDATE CASH_TXN ===========================================================
                UPDATE CASH_TXN
                    SET
                        DETAILS=@TXN_DESC,
                        AMOUNT=@TXN_AMOUNT,
                        
                        DATE=@TXN_DATE,
                        DAY=@TXN_DAY,
                        DAY_OF_WEEK=@TXN_DAY_OF_WEEK,
                        WEEK=@TXN_WEEK,
                        MONTH=@TXN_MONTH,
                        MONTH_NAME=@TXN_MONTH_NAME,
                        YEAR=@TXN_YEAR

                WHERE
                    ACCOUNT_ID=@TXN_ACCOUNT_ID
                    AND CASH_TXN_ID=@TXN_ID;

-- UPDATE GL_HEADER =============================================================
                UPDATE GL_HEADER
                    SET
                        DETAILS=@TXN_DESC

                WHERE
                    ACCOUNT_ID=@TXN_ACCOUNT_ID
                    AND GL_HEADER_ID=(SELECT GL_HEADER_ID FROM GL_HEADER WHERE TRANSACTION_ID=@TXN_ID AND ACCOUNT_ID=@TXN_ACCOUNT_ID);

-- UPDATE GL_LINES  ==========================================================================

-- CHANGE CATEGORY
-- This is based on the GL_ACCOUNT submitted in the PUT request
                UPDATE
                    GL_LINE
                SET
                    GL_ACCOUNT_ID=@TXN_GL_ACCOUNT_ID,
                    AMOUNT=@TXN_AMOUNT,
                    DEBIT_CREDIT=(IF(@TXN_TRANSACTION_TYPE='INCOME', 'CREDIT', 'DEBIT')) # Specifies that the category is an income / expense

                WHERE
                    ACCOUNT_ID=@TXN_ACCOUNT_ID
                    AND GL_LINE_ID=(
                            SELECT
                                GL_LINE_ID

                            FROM
                                CASH_TXN

                            LEFT JOIN GL_HEADER ON CASH_TXN.CASH_TXN_ID = GL_HEADER.TRANSACTION_ID
                            LEFT JOIN GL_LINE ON GL_HEADER.GL_HEADER_ID = GL_LINE.GL_HEADER_ID
                            LEFT JOIN GL_ACCOUNT ON GL_LINE.GL_ACCOUNT_ID = GL_ACCOUNT.GL_ACCOUNT_ID

                            WHERE
                                GL_HEADER.TRANSACTION_ID=@TXN_ID

                                AND GL_ACCOUNT.GL_ACCOUNT_TYPE NOT IN ('ASSET', 'LIABILITY', 'EQUITY')
                                AND GL_LINE.ACCOUNT_ID=@TXN_ACCOUNT_ID
                        );

-- CHANGE TXN TYPE
-- This just changes it to an expense or income, thus debiting or crediting the bank account
                UPDATE
                    GL_LINE

                SET

                    AMOUNT=@TXN_AMOUNT,
                    DEBIT_CREDIT=(IF(@TXN_TRANSACTION_TYPE='INCOME', 'DEBIT', 'CREDIT')) # Specifies to increase or decrease bank


                WHERE
                    ACCOUNT_ID=@TXN_ACCOUNT_ID
                    AND GL_ACCOUNT_ID=(SELECT GL_ACCOUNT_ID FROM GL_ACCOUNT WHERE GL_ACCOUNT.GL_ACCOUNT_CODE=1000 AND ACCOUNT_ID=@TXN_ACCOUNT_ID); -- This remains 1000 as it is a CASH_TXN;
            ";
            cmd.Parameters.AddWithValue("@TXN_ID", transaction.TRANSACTION_ID);
            cmd.Parameters.AddWithValue("@TXN_ACCOUNT_ID", transaction.ACCOUNT_ID);
            
            cmd.Parameters.AddWithValue("@TXN_AMOUNT", transaction.AMOUNT);
            cmd.Parameters.AddWithValue("@TXN_DESC", transaction.DETAILS);
            
            cmd.Parameters.AddWithValue("@TXN_DATE", transaction.DATE);
            DateBrokenDown pDate = DateBrokenDown.BreakDownDate(transaction.DATE);
            cmd.Parameters.AddWithValue("@TXN_DAY", pDate.day);
            cmd.Parameters.AddWithValue("@TXN_DAY_OF_WEEK", pDate.dayOfWeek);
            cmd.Parameters.AddWithValue("@TXN_WEEK", pDate.week);
            cmd.Parameters.AddWithValue("@TXN_MONTH", pDate.month);
            cmd.Parameters.AddWithValue("@TXN_MONTH_NAME", pDate.monthName);
            cmd.Parameters.AddWithValue("@TXN_YEAR", pDate.year);
            
            cmd.Parameters.AddWithValue("@TXN_MERCHANT_ID", transaction.MERCHANT_ID);
            
            cmd.Parameters.AddWithValue("@TXN_RECEIVABLE", transaction.RECEIVABLE);
            cmd.Parameters.AddWithValue("@TXN_DEBTOR_ID", transaction.DEBTOR_ID);
            
            cmd.Parameters.AddWithValue("@TXN_TRANSACTION_TYPE", transaction.TYPE);
            
            cmd.Parameters.AddWithValue("@TXN_GL_ACCOUNT_ID", transaction.GL_ACCOUNT?.GL_ACCOUNT_ID);
            

            int rows = cmd.ExecuteNonQuery();
            if (rows == 0)
            {
                throw new Exception("No Rows Effected");
            }
            
            dbTx.Commit();
            
            return Ok(new {message = $"CASH_TXN EDITED: {transaction.TRANSACTION_ID}"});
            
        }
        catch (Exception e)
        {
            return StatusCode(500, new { message = $"Could not Update Cash TXN: {e}" });
        }
    }

    [HttpDelete("delete_cash_txn")]
    public IActionResult DeleteCashTXN([FromBody] Transaction transaction)
    {
        try
        {

            using var connection = _conn.Open();
            using var dbTx = connection.BeginTransaction();
            using var cmd = connection.CreateCommand();

            cmd.Transaction = dbTx;

            cmd.CommandText = @"
                DELETE FROM GL_LINE WHERE GL_HEADER_ID=(SELECT GL_HEADER_ID FROM GL_HEADER WHERE TRANSACTION_ID=@TXN_ID AND ACCOUNT_ID=@ACCOUNT_ID) AND ACCOUNT_ID=@ACCOUNT_ID;
                DELETE FROM GL_HEADER WHERE TRANSACTION_ID=@TXN_ID AND ACCOUNT_ID=@ACCOUNT_ID;
                DELETE FROM CASH_TXN WHERE CASH_TXN_ID=@TXN_ID AND ACCOUNT_ID=@ACCOUNT_ID;
                DELETE FROM RECEIVABLE_TXN WHERE TRANSACTION_ID=@TXN_ID AND ACCOUNT_ID=@ACCOUNT_ID;
                DELETE FROM RECEIVABLE_TXN WHERE TRANSACTION_ID=@TXN_ID AND ACCOUNT_ID=@ACCOUNT_ID;
            ";

            cmd.Parameters.AddWithValue("@ACCOUNT_ID", transaction.ACCOUNT_ID);
            cmd.Parameters.AddWithValue("@TXN_ID", transaction.TRANSACTION_ID);

            int rows = cmd.ExecuteNonQuery();
            dbTx.Commit();

            if (rows == 0)
                throw new Exception($"No Rows Effected: {transaction.TRANSACTION_ID}");
            
            return Ok(new {message = $"CASH_TXN DELETED:{transaction.TRANSACTION_ID}"});
        }
        catch (Exception e)
        {
            return StatusCode(500, new { message = $"Could not Delete CASH_TXN: {transaction.TRANSACTION_ID} \n \n {e}" });
        }
    }
}