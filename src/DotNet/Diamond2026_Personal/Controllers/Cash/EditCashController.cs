using Class;
using MariaDB;
using Microsoft.AspNetCore.Mvc;

namespace Diamond2026_Personal.Controllers.Cash;

[Route("api/edit_cash_txn")]
public class EditCashController(Conn conn): ControllerBase
{
    // Database Connection
    private readonly Conn _conn = conn;
    
    [HttpPut("edit_full_cash_txn")]
    public IActionResult EditCategory([FromBody] Transaction transaction)
    {
        try
        {
            if (!ModelState.IsValid)
                throw new Exception("Transaction Model not Valid");
            
            string NOMINAL_DEBIT_CREDIT;
            string BALANCE_SHEET_DEBIT_CREDIT;

            using var connection = _conn.Open();
            using var dbTx = connection.BeginTransaction();
            using var cmd = connection.CreateCommand();

            cmd.Transaction = dbTx;
            
            /*
                DEBIT  -> BANK
                CREDIT -> INCOME ACCOUNT
                NOTE: 
                    The TRANSACTION_TYPE is retrieved from the GL_ACCOUNT_TYPE and added
                    to the CASH_TXN in the SELECT when the user GETs their TXNs. 
            */
            if (transaction.GL_ACCOUNT?.GL_ACCOUNT_TYPE == "INCOME")
            {
                NOMINAL_DEBIT_CREDIT = "CREDIT";
                BALANCE_SHEET_DEBIT_CREDIT = "DEBIT";
            }
            else if (transaction.GL_ACCOUNT?.GL_ACCOUNT_TYPE == "EXPENSE")
            {
                NOMINAL_DEBIT_CREDIT = "DEBIT";
                BALANCE_SHEET_DEBIT_CREDIT = "CREDIT";
            }
            else
            {
                throw new Exception($"NO valid GL_ACCOUNT_TYPE Provided has to be (INCOME | EXPENSE), provided: {transaction.GL_ACCOUNT?.GL_ACCOUNT_TYPE}");
            }

            cmd.CommandText = @"

                # UPDATE CASH_TXN ======================================================================================================================================
                UPDATE 
                    CASH_TXN
                SET
                    AMOUNT=@TXN_AMOUNT,
                    DETAILS=@TXN_DETAILS,
                    MERCHANT_ID=@TXN_MERCHANT_ID,
                    RECEIVABLE=@TXN_RECEIVABLE,
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

                # UPDATING THE NOMINAL GL_LINE (EXPENSE | INCOME) ========================================================================================================
                UPDATE
                    GL_LINE

                SET
                    DEBIT_CREDIT=@TXN_NOMINAL_DEBIT_CREDIT,
                    AMOUNT=@TXN_AMOUNT,
                    GL_ACCOUNT_ID=(SELECT GL_ACCOUNT_ID FROM GL_ACCOUNT WHERE GL_ACCOUNT.GL_ACCOUNT_CODE=@TXN_GL_ACCOUNT_CODE AND GL_ACCOUNT.ACCOUNT_ID=@TXN_ACCOUNT_ID)

                WHERE
                    GL_LINE.GL_HEADER_ID=@TXN_GL_HEADER_ID
                    #   WORKING
                    AND GL_ACCOUNT_ID=(SELECT GL_ACCOUNT.GL_ACCOUNT_ID FROM GL_LINE LEFT JOIN GL_ACCOUNT ON GL_LINE.GL_ACCOUNT_ID = GL_ACCOUNT.GL_ACCOUNT_ID WHERE GL_HEADER_ID=@TXN_GL_HEADER_ID AND  GL_ACCOUNT_TYPE IN ('INCOME', 'EXPENSE') AND GL_LINE.ACCOUNT_ID=@TXN_ACCOUNT_ID) # FIND THE LINE WHICH IS AN INCOME OR EXPENSE
                    AND GL_LINE.ACCOUNT_ID=@TXN_ACCOUNT_ID;

                # UPDATING THE BALANCE SHEET GL LINE (ASSET|LIABILITY) ========================================================================================================
                UPDATE
                    GL_LINE

                SET
                    DEBIT_CREDIT=@TXN_BALANCE_SHEET_DEBIT_CREDIT,
                    AMOUNT=@TXN_AMOUNT,
                    GL_ACCOUNT_ID=(SELECT GL_ACCOUNT_ID FROM GL_ACCOUNT WHERE GL_ACCOUNT.GL_ACCOUNT_CODE=1000 AND GL_ACCOUNT.ACCOUNT_ID=@TXN_ACCOUNT_ID) # SETTING THE USER'S BANK ACCOUNT

                WHERE
                    GL_LINE.GL_HEADER_ID=@TXN_GL_HEADER_ID

                    AND GL_ACCOUNT_ID=
                        (
                            SELECT
                                GL_ACCOUNT.GL_ACCOUNT_ID
                            FROM
                                GL_ACCOUNT
                            LEFT JOIN GL_LINE ON GL_ACCOUNT.GL_ACCOUNT_ID = GL_LINE.GL_ACCOUNT_ID
                            LEFT JOIN GL_HEADER ON GL_LINE.GL_HEADER_ID = GL_HEADER.GL_HEADER_ID
                            WHERE
                                GL_HEADER.GL_HEADER_ID=@TXN_GL_HEADER_ID AND
                                GL_ACCOUNT.GL_ACCOUNT_TYPE IN ('ASSET') AND
                                GL_ACCOUNT.ACCOUNT_ID=@TXN_ACCOUNT_ID
                        )

                    AND GL_LINE.ACCOUNT_ID=@TXN_ACCOUNT_ID;




";

            cmd.Parameters.AddWithValue("@TXN_GL_HEADER_ID", transaction.GL_HEADER_ID);
            cmd.Parameters.AddWithValue("@TXN_ACCOUNT_ID", transaction.ACCOUNT_ID);
            cmd.Parameters.AddWithValue("@TXN_ID", transaction.TRANSACTION_ID);
            
            cmd.Parameters.AddWithValue("@TXN_AMOUNT", transaction.AMOUNT);
            cmd.Parameters.AddWithValue("@TXN_DETAILS", transaction.DETAILS);
            
            DateBrokenDown pDate = DateBrokenDown.BreakDownDate(transaction.DATE);
            cmd.Parameters.AddWithValue("@TXN_DATE", transaction.DATE);
            cmd.Parameters.AddWithValue("@TXN_DAY", pDate.day);
            cmd.Parameters.AddWithValue("@TXN_DAY_OF_WEEK", pDate.dayOfWeek);
            cmd.Parameters.AddWithValue("@TXN_WEEK", pDate.week);
            cmd.Parameters.AddWithValue("@TXN_MONTH", pDate.month);
            cmd.Parameters.AddWithValue("@TXN_MONTH_NAME", pDate.monthName);
            cmd.Parameters.AddWithValue("@TXN_YEAR", pDate.year);
            
            cmd.Parameters.AddWithValue("@TXN_GL_ACCOUNT_CODE", transaction.GL_ACCOUNT.GL_ACCOUNT_CODE); // This is the GL_ACCOUNT_CODE the user choose to update to.
            cmd.Parameters.AddWithValue("@TXN_NOMINAL_DEBIT_CREDIT", NOMINAL_DEBIT_CREDIT);
            cmd.Parameters.AddWithValue("@TXN_BALANCE_SHEET_DEBIT_CREDIT", BALANCE_SHEET_DEBIT_CREDIT);

            cmd.Parameters.AddWithValue("@TXN_MERCHANT_ID", transaction.MERCHANT_ID);
            cmd.Parameters.AddWithValue("@TXN_RECEIVABLE", transaction.RECEIVABLE);
            cmd.Parameters.AddWithValue("@TXN_DEBTOR_ID", transaction.DEBTOR_ID);
            
            int rows = cmd.ExecuteNonQuery();
            
            if (rows == 0)
            {
                throw new Exception("No Rows Effected");
            }
            
            dbTx.Commit();

            return Ok(new
                {
                    message = "CASH_TXN update: ",
                    transactionID = transaction.TRANSACTION_ID
                });
        }
        catch (Exception e)
        {
            return StatusCode(500, new
            {
                error = $"Exception: Could not Update CASH_TXN",
                message = e.Message,
            });
        }
    }
    
}