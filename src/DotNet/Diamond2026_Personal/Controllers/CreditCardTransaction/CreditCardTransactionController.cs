using Class;
using Class.CreditCard;
using MariaDB;
using Microsoft.AspNetCore.Mvc;
using MySqlConnector;

namespace Diamond2026_Personal.Controllers.CreditCardTransaction;

[Route("api/credit_card_txn")]
public class CreditCardTransactionController(Conn conn) : ControllerBase
{
    private readonly Conn _conn = conn;

    [HttpGet("test")]
    public IActionResult Test()
    {
        return Ok(new {message="Credit Card"});
    }

    [HttpPost("get_credit_card_txn")]
    public IActionResult GetCreditCardTXN([FromBody] RequestParams requestParams)
    {
        try
        {
            const string SQL = @"
                SELECT
                    CC.CREDIT_CARD_TXN_ID,
                    CC.DETAILS,
                    CC.AMOUNT,
                    CC.ACCOUNT_ID,
                    CC.DATE,
                    CC.RECEIVABLE,
                    CC.DEBTOR_ID,
                    CC.DAY,
                    CC.WEEK,
                    CC.MONTH,
                    CC.MONTH_NAME,
                    CC.DAY_OF_WEEK,
                    CC.YEAR,
                    CC.MERCHANT_ID,
                    CC.CREATED,
                    
                    MERCHANT.MERCHANT_ID,
                    MERCHANT.NAME AS MERCHANT_NAME,

                    GL_LINE.DEBIT_CREDIT,
                    
                    GL_HEADER.SOURCE_TYPE,
                    GL_HEADER.GL_HEADER_ID,

                    GL_ACCOUNT.GL_ACCOUNT_ID,
                    GL_ACCOUNT.GL_ACCOUNT_NAME,
                    GL_ACCOUNT.GL_ACCOUNT_CODE,
                    GL_ACCOUNT.GL_ACCOUNT_TYPE,

                    CASE

                        WHEN GL_ACCOUNT.GL_ACCOUNT_TYPE = 'EXPENSE'
                            AND GL_LINE.DEBIT_CREDIT = 'DEBIT'
                            AND (GL_ACCOUNT.GL_ACCOUNT_CODE BETWEEN 5000 AND 5999 OR GL_ACCOUNT.GL_ACCOUNT_CODE BETWEEN -5999 AND -5000)
                        THEN 'INCREASE'

                        WHEN GL_ACCOUNT.GL_ACCOUNT_TYPE = 'ASSET'
                            AND GL_LINE.DEBIT_CREDIT = 'CREDIT'
                            AND (GL_ACCOUNT.GL_ACCOUNT_CODE = 1000 OR GL_ACCOUNT.GL_ACCOUNT_CODE BETWEEN 5000 AND 5999 OR GL_ACCOUNT.GL_ACCOUNT_CODE BETWEEN -5999 AND -5000)
                        THEN 'REPAID'

                        ELSE 'NA'

                    END AS ACTION
                FROM
                    CREDIT_CARD_TXN CC
                
                LEFT JOIN MERCHANT ON CC.MERCHANT_ID = MERCHANT.MERCHANT_ID
                LEFT JOIN GL_HEADER ON CC.CREDIT_CARD_TXN_ID = GL_HEADER.TRANSACTION_ID
                LEFT JOIN GL_LINE ON GL_HEADER.GL_HEADER_ID = GL_LINE.GL_HEADER_ID
                LEFT JOIN GL_ACCOUNT ON GL_LINE.GL_ACCOUNT_ID = GL_ACCOUNT.GL_ACCOUNT_ID

            WHERE
                CC.ACCOUNT_ID = @ACCOUNT_ID AND
            (
                (
                    GL_ACCOUNT.GL_ACCOUNT_TYPE = 'EXPENSE'
                     AND GL_LINE.DEBIT_CREDIT = 'DEBIT'
                     AND 
                        (GL_ACCOUNT.GL_ACCOUNT_CODE BETWEEN 5000 AND 5999 OR GL_ACCOUNT.GL_ACCOUNT_CODE BETWEEN -5999 AND -5000)
                        # The negative numbers are included to ensure sundry txns also display.
                )

                OR

                (
                    GL_ACCOUNT.GL_ACCOUNT_TYPE = 'ASSET'
                     AND GL_LINE.DEBIT_CREDIT = 'CREDIT'
                     AND GL_ACCOUNT.GL_ACCOUNT_CODE = 1000
                )
            )
                
            ORDER BY CC.DATE DESC
            ";

            using var connection = _conn.Open();
            using var cmd = new MySqlCommand(SQL, connection);
            cmd.Parameters.Add("@ACCOUNT_ID", MySqlDbType.Guid).Value = requestParams.ACCOUNT_ID;
            // cmd.Parameters.Add("@MONTH", MySqlDbType.Int16).Value = requestParams.MONTH;

            using var reader = cmd.ExecuteReader();

            List<Transaction> creditCardTXNs = new List<Transaction>();
            while (reader.Read())
            {
                creditCardTXNs.Add(new Transaction
                {
                    ACCOUNT_ID = reader.GetGuid("ACCOUNT_ID"),
                    TRANSACTION_ID = reader.GetGuid("CREDIT_CARD_TXN_ID"),
                    TRANSACTION_SOURCE = TransactionTypeEnum.CREDIT_CARD,
                    TYPE = reader.GetString("ACTION"), // INCREASE | REPAID
                    AMOUNT = reader.GetDecimal("AMOUNT"),
                    DETAILS = reader.GetString("DETAILS"),
                    DATE = reader.GetString("DATE"),
                    RECEIVABLE = reader.GetBoolean("RECEIVABLE"),
                    DAY = reader.GetInt16("DAY"),
                    DAY_OF_WEEK = reader.GetString("DAY_OF_WEEK"),
                    WEEK = reader.GetInt16("WEEK"),
                    MONTH = reader.GetInt16("MONTH"),
                    MONTH_NAME = reader.GetString("MONTH_NAME"),
                    MERCHANT_ID = reader.IsDBNull(reader.GetOrdinal("MERCHANT_ID")) ? null : reader.GetGuid("MERCHANT_ID"),
                    MERCHANT_NAME = reader.IsDBNull(reader.GetOrdinal("MERCHANT_NAME")) ? null : reader.GetString("MERCHANT_NAME"),
                    DEBTOR_ID = reader.IsDBNull(reader.GetOrdinal("DEBTOR_ID")) ? null :  reader.GetGuid("DEBTOR_ID"),
                    GL_HEADER_ID = reader.IsDBNull(reader.GetOrdinal("GL_HEADER_ID")) ? null : reader.GetGuid("GL_HEADER_ID"),
                    GL_ACCOUNT = new GL_ACCOUNT
                    {
                        GL_ACCOUNT_NAME = reader.GetString("GL_ACCOUNT_NAME"),
                        GL_ACCOUNT_TYPE = reader.GetString("GL_ACCOUNT_TYPE"),
                        GL_ACCOUNT_CODE = reader.GetInt16("GL_ACCOUNT_CODE"),
                        GL_ACCOUNT_ID = reader.GetGuid("GL_ACCOUNT_ID")
                    },
                    CREATED = reader.GetDateTime("CREATED")
                });
            }
            
            return Ok(creditCardTXNs);
        }
        catch (Exception e)
        {
            return BadRequest(new {message=$"Could not GE CREDIT_CARD_TXN: \n \n {e}"});
        }
    }
    

    [HttpPost("add_credit_card_txn")]
    public IActionResult AddCreditCardTXN([FromBody] CreditCardTXNModel creditCard)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            if(creditCard?.GL_ACCOUNT?.GL_ACCOUNT_TYPE == "INCOME")
                throw new Exception("Cannot Set Income Category (GL_ACCOUNT) for Credit Card TXN");

            int? DEBIT_GL_ACCOUNT_CODE;
            int? CREDIT_GL_ACCOUNT_CODE;
            
            // Breaking Down Date
            DateBrokenDown pDate = DateBrokenDown.BreakDownDate(creditCard.DATE);

            if (creditCard.TYPE == "INCREASE")
            {
                CREDIT_GL_ACCOUNT_CODE = 2000; // Increase Credit Card
                DEBIT_GL_ACCOUNT_CODE = -5000;
                if (creditCard.GL_ACCOUNT?.GL_ACCOUNT_CODE != null)
                    DEBIT_GL_ACCOUNT_CODE = creditCard.GL_ACCOUNT?.GL_ACCOUNT_CODE;

            }
            else if (creditCard.TYPE == "REPAID")
            {
                DEBIT_GL_ACCOUNT_CODE = 2000; // Decreasing Credit Card
                CREDIT_GL_ACCOUNT_CODE = 1000; // Decreasing Bank
            }
            else
            {
                throw new Exception("No Credit Card Type provided");
            }
            
            // Defining the UUIDs which will be used in the SQL_TRANSACTION
            Guid CREDIT_CARD_TXN_ID = Guid.NewGuid();
            Guid GL_HEADER_ID = Guid.NewGuid();

            using var connection = _conn.Open();
            using var dbTx = connection.BeginTransaction();
            using var cmd = connection.CreateCommand();
            
            int displayReceivableCashTXN = 0;
            if (creditCard is { RECEIVABLE: true, DEBTOR_ID: not null })
            {
                displayReceivableCashTXN = 1;
            }

            cmd.Transaction = dbTx;
            cmd.CommandText = @"
                    
                INSERT INTO CREDIT_CARD_TXN
                    (CREDIT_CARD_TXN_ID, ACCOUNT_ID, DETAILS, AMOUNT, DATE, TRANSACTION_SOURCE, MERCHANT_ID, RECEIVABLE, DEBTOR_ID, DAY, DAY_OF_WEEK, WEEK, MONTH, MONTH_NAME, YEAR)
                VALUES
                    (@CREDIT_CARD_TXN_ID, @ACCOUNT_ID, @DETAILS, @AMOUNT, @DATE, 'CREDIT_CARD', @MERCHANT_ID, @RECEIVABLE, @DEBTOR_ID, @DAY, @DAY_OF_WEEK, @WEEK, @MONTH, @MONTH_NAME, @YEAR);


                INSERT INTO GL_HEADER
                    (GL_HEADER_ID, TRANSACTION_ID, SOURCE_TYPE, DETAILS, ACCOUNT_ID)
                VALUES
                    (@GL_HEADER_ID, @CREDIT_CARD_TXN_ID, 'CREDIT_CARD', @DETAILS, @ACCOUNT_ID);


                INSERT INTO GL_LINE
                    (GL_LINE_ID, GL_ACCOUNT_ID, GL_HEADER_ID, DEBIT_CREDIT, ACCOUNT_ID, AMOUNT)
                values
                    (UUID(), (SELECT GL_ACCOUNT_ID FROM GL_ACCOUNT WHERE GL_ACCOUNT_CODE=@DEBIT_GL_ACCOUNT_CODE  AND ACCOUNT_ID=@ACCOUNT_ID), @GL_HEADER_ID, 'DEBIT',  @ACCOUNT_ID, @AMOUNT), -- DEBIT
                    (UUID(), (SELECT GL_ACCOUNT_ID FROM GL_ACCOUNT WHERE GL_ACCOUNT_CODE=@CREDIT_GL_ACCOUNT_CODE AND ACCOUNT_ID=@ACCOUNT_ID), @GL_HEADER_ID, 'CREDIT', @ACCOUNT_ID, @AMOUNT); -- CREDIT
            ";
            
            // This sections handles adding RECEIVABLE_TXNS based on the TYPE of the CASH_TXN
            if (creditCard.RECEIVABLE)
            {
                if (creditCard.DEBTOR_ID == null)
                    throw new Exception("No DEBTOR_ID was provided for a RECEIVABLE_TXN");
                
                Guid RECEIVABLE_TXN_ID = Guid.NewGuid();
                cmd.CommandText += $@"
                    -- ============================================================== INSERT GL_LINES
                    INSERT INTO RECEIVABLE_TXN
                        (RECEIVABLE_TXN_ID, TRANSACTION_ID, TRANSACTION_SOURCE, TYPE, DEBTOR_ID, ACCOUNT_ID)
                    VALUES 
                        (@RECEIVABLE_TXN_ID, @TRANSACTION_ID, 'CREDIT_CARD', @TYPE, @DEBTOR_ID, @ACCOUNT_ID)
                ";

                cmd.Parameters.AddWithValue("@RECEIVABLE_TXN_ID",RECEIVABLE_TXN_ID);
                cmd.Parameters.AddWithValue("@TRANSACTION_ID", CREDIT_CARD_TXN_ID);
                cmd.Parameters.AddWithValue("@TYPE", creditCard.TYPE == "INCREASE" ? "INCREASE" : "DECREASE");
                cmd.Parameters.AddWithValue("@DEBTOR_ID",creditCard.DEBTOR_ID);
            }
            
            cmd.Parameters.AddWithValue("@ACCOUNT_ID", creditCard.ACCOUNT_ID);
            cmd.Parameters.AddWithValue("@MERCHANT_ID", creditCard.MERCHANT_ID);
            cmd.Parameters.AddWithValue("@AMOUNT", creditCard.AMOUNT);
            cmd.Parameters.AddWithValue("@DETAILS", creditCard.DETAILS);
            
            cmd.Parameters.AddWithValue("@RECEIVABLE", displayReceivableCashTXN);
            cmd.Parameters.AddWithValue("@DEBTOR_ID", null);

            
            cmd.Parameters.AddWithValue("@DATE", creditCard.DATE);
            cmd.Parameters.AddWithValue("@DAY", pDate.day);
            cmd.Parameters.AddWithValue("@DAY_OF_WEEK", pDate.dayOfWeek);
            cmd.Parameters.AddWithValue("@WEEK", pDate.week);
            cmd.Parameters.AddWithValue("@MONTH_NAME", pDate.monthName);
            cmd.Parameters.AddWithValue("@MONTH", pDate.month);
            cmd.Parameters.AddWithValue("@YEAR", pDate.year);
            
            cmd.Parameters.AddWithValue("@DEBIT_GL_ACCOUNT_CODE", DEBIT_GL_ACCOUNT_CODE);
            cmd.Parameters.AddWithValue("@CREDIT_GL_ACCOUNT_CODE", CREDIT_GL_ACCOUNT_CODE);
            
            cmd.Parameters.AddWithValue("@CREDIT_CARD_TXN_ID", CREDIT_CARD_TXN_ID);
            cmd.Parameters.AddWithValue("@GL_HEADER_ID", GL_HEADER_ID);

            int rows = cmd.ExecuteNonQuery();
            
            if (rows == 0)
                throw new Exception("No rows affected in SQL_TRANSACTION");
            
            dbTx.Commit();
            return Ok(new { message="Added Credit Card TXN" });
        }
        catch (Exception e)
        {
            return BadRequest(new {
                message = $"Could not Add Credit Card TXN: \n \n{e}"
            });
        }
    }
    

    [HttpDelete("delete_credit_card_txn")]
    public IActionResult DeleteCreditCardTXN([FromBody] RequestParams requestParams)
    {
        try
        {
            using var connection = _conn.Open();
            using var dbTx = connection.BeginTransaction();
            using var cmd = connection.CreateCommand();

            cmd.Transaction = dbTx;

            cmd.CommandText = @"
                DELETE FROM GL_LINE WHERE GL_HEADER_ID=(SELECT GL_HEADER_ID FROM GL_HEADER WHERE TRANSACTION_ID=@TRANSACTION_ID AND ACCOUNT_ID=@ACCOUNT_ID) AND ACCOUNT_ID=@ACCOUNT_ID;
                DELETE FROM GL_HEADER WHERE TRANSACTION_ID=@TRANSACTION_ID AND ACCOUNT_ID=@ACCOUNT_ID;
                DELETE FROM CREDIT_CARD_TXN WHERE CREDIT_CARD_TXN_ID=@TRANSACTION_ID AND ACCOUNT_ID=@ACCOUNT_ID;
                DELETE FROM RECEIVABLE_TXN WHERE TRANSACTION_ID=@TRANSACTION_ID AND ACCOUNT_ID=@ACCOUNT_ID;
            ";

            cmd.Parameters.AddWithValue("@TRANSACTION_ID", requestParams.TRANSACTION_ID);
            cmd.Parameters.AddWithValue("@ACCOUNT_ID", requestParams.ACCOUNT_ID);

            int rows = cmd.ExecuteNonQuery();
            dbTx.Commit();

            if (rows == 0)
                throw new Exception("CREDIT_CARD_TXN Could not be Deleted");

            return Ok(new {
                message = $"CREDIT_CARD_TXN DELETED: {requestParams.TRANSACTION_ID}"
            });
        }
        catch (Exception e)
        {
            return BadRequest(new {
                message = $"Could not Delete Credit Card TXN: \n \n {e}"
            });
        }
    }
}