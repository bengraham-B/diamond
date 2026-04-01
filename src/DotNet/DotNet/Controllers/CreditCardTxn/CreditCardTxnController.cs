using Class;
using Class.CreditCard;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Npgsql;
using PostgresConn;

namespace DotNet.Controllers.CreditCardTxn;
[Route("api/credit_card_txn")]
public class CreditCardTxnController : ControllerBase
{
    // Database Connection
    private readonly Conn _db;

    public CreditCardTxnController(IConfiguration configuration)
    {
        // Check if there is a connection String
        var connectionString = configuration.GetConnectionString("DefaultConnectionString");
        if (string.IsNullOrEmpty(connectionString))
            throw new Exception("Connection String not Found");
        _db = new Conn(configuration);
    }
    
   [HttpPost("add_credit_card_txn")]
public IActionResult AddCreditCardTxn([FromBody] CreditCardTXNModel txn)
{
    if (!ModelState.IsValid)
        return BadRequest(ModelState); // 400 - if required fields are missing

    using var conn = _db.GetConn();

    const string SQL = @"
        INSERT INTO credit_card_txn (
            account_id, 
            details, 
            amount, 
            credit_card_type, 
            category_id, 
            supplier_id, 
            time, 
            date, 
            day, 
            day_of_week, 
            week, 
            month,
            month_name, 
            year
        ) VALUES (
            @account_id, 
            @details, 
            @amount, 
            @credit_card_type, 
            @category_id, 
            @supplier_id, 
            @time, 
            @date, 
            @day, 
            @day_of_week, 
            @week, 
            @month, 
            @month_name, 
            @year
        )
        RETURNING row_to_json(credit_card_txn);
    ";

    using var cmd = new NpgsqlCommand(SQL, conn);

    // Break Down Date
    // DateBrokenDown pDate = DateBrokenDown.BreakDownDate(txn.date);

    // Add parameters (nullable UUIDs handled safely)
    // cmd.Parameters.AddWithValue("@account_id", txn.accountID);
    // cmd.Parameters.AddWithValue("@amount", txn.amount);
    // cmd.Parameters.AddWithValue("@details", txn.details ?? (object)DBNull.Value);
    // cmd.Parameters.AddWithValue("@credit_card_type", txn.creditCardType ?? (object)DBNull.Value);
    // cmd.Parameters.AddWithValue("@category_id", txn.categoryID ?? (object)DBNull.Value);
    // cmd.Parameters.AddWithValue("@supplier_id", txn. ?? (object)DBNull.Value);
    // cmd.Parameters.AddWithValue("@time", txn.TIME ?? (object)DBNull.Value);
    // cmd.Parameters.AddWithValue("@date", txn.DATE);
    // cmd.Parameters.AddWithValue("@day", pDate.day);
    // cmd.Parameters.AddWithValue("@day_of_week", pDate.dayOfWeek);
    // cmd.Parameters.AddWithValue("@week", pDate.week);
    // cmd.Parameters.AddWithValue("@month", pDate.month);
    // cmd.Parameters.AddWithValue("@month_name", pDate.monthName);
    // cmd.Parameters.AddWithValue("@year", pDate.year); // <-- previously you used week, fixed

    // Execute and get the JSON result
    using var reader = cmd.ExecuteReader();

    if (!reader.Read())
        return StatusCode(500, "Could not add CREDIT_CARD_TXN");

    string insertedJson = reader.GetString(0); // row_to_json returns a single JSON string

    return Ok(insertedJson); // returns JSON of the inserted row
}


    [HttpPost("get_credit_card_txns")]
    public IActionResult GetCreditCardTXNs([FromBody] RequestBody reqBody)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState); // This ensures that all the required fields are present
        
        // Get List of User Credit Card TXN's.
        // const string SQL = "SELECT * FROM credit_card_txn LEFT JOIN supplier ON credit_card_txn.supplier_id = supplier.id WHERE account_id=@accountID AND month=@month AND year=@year";
        const string SQL = """
                           SELECT
                               credit_card_txn.id,
                               credit_card_txn.amount,
                               credit_card_txn.details,
                               credit_card_txn.credit_card_type,
                           
                               credit_card_txn.time,
                               credit_card_txn.date,
                               credit_card_txn.day,
                               credit_card_txn.day_of_week,
                               credit_card_txn.week,
                               credit_card_txn.month,
                               credit_card_txn.month_name,
                               credit_card_txn.year,
                           
                               credit_card_txn.category_id AS category_id,
                               category.name AS category_name,
                           
                               credit_card_txn.supplier_id AS supplier_id,
                               supplier.name AS supplier_name,
                               'CREDIT_CARD_TXN' AS source
                           
                           
                           FROM
                               credit_card_txn
                           
                           LEFT JOIN category ON credit_card_txn.category_id = category.id
                           LEFT JOIN supplier ON credit_card_txn.supplier_id = supplier.id
                           
                           WHERE
                               credit_card_txn.account_id=@accountID
                               AND credit_card_txn.month=@month
                               AND credit_card_txn.year=@year
                           
                           UNION ALL
                           
                           SELECT
                               debtor_transaction.id,
                               debtor_transaction.amount,
                               debtor_transaction.details,
                               debtor_transaction.credit_card_type,
                           
                               debtor_transaction.time,
                               debtor_transaction.date,
                               debtor_transaction.day,
                               debtor_transaction.day_of_week,
                               debtor_transaction.week,
                               debtor_transaction.month,
                               debtor_transaction.month_name,
                               debtor_transaction.year,
                           
                               debtor_transaction.category_id AS category_id,
                               category.name AS category_name,
                           
                               debtor_transaction.supplier_id AS supplier_id,
                               supplier.name AS supplier_name,
                               'DEBTOR_TXN' AS source
                           
                           FROM
                               debtor_transaction
                           
                           LEFT JOIN category ON debtor_transaction.category_id = category.id
                           LEFT JOIN supplier ON debtor_transaction.supplier_id = supplier.id
                           
                           WHERE
                               debtor_transaction.credit_card_txn = 'true'
                               AND debtor_transaction.account_id=@accountID
                               AND debtor_transaction.month=@month
                               AND debtor_transaction.year=@year
                           
                           UNION ALL
                           
                           SELECT
                               cash.id,
                               cash.amount,
                               cash.details,
                               cash.credit_card_type,
                           
                               cash.time,
                               cash.date,
                               cash.day,
                               cash.day_of_week,
                               cash.week,
                               cash.month,
                               cash.month_name,
                               cash.year,
                           
                               cash.category_id AS category_id,
                               category.name AS category_name,
                           
                               cash.supplier_id AS supplier_id,
                               supplier.name AS supplier_name,
                               
                               'CASH' AS source
                           
                           FROM
                               cash
                           
                           LEFT JOIN category ON cash.category_id = category.id
                           LEFT JOIN supplier ON cash.supplier_id = supplier.id
                           
                           WHERE
                               cash.credit_card_txn = 'true'
                               AND cash.account_id=@accountID
                               AND cash.month=@month
                               AND cash.year=@year
                           
                           
                           ORDER BY date DESC, time DESC;
                                 
                            
                           
                           
                           
                           """;
        // List<Class.CreditCardTxn> creditCardTxns = new List<Class.CreditCardTxn>();

        using var db = _db.GetConn();
        using var cmd = new NpgsqlCommand(SQL, db);

        cmd.Parameters.AddWithValue("@accountID", reqBody.accountID);
        cmd.Parameters.AddWithValue("@month", reqBody.month);
        cmd.Parameters.AddWithValue("@year", reqBody.year);

        using var reader = cmd.ExecuteReader();
        
        // while (reader.Read())
        // {
        //     creditCardTxns.Add(new Class.CreditCardTxn()
        //     {
        //             /* NOTE
        //              * Only credit_credit_type is used when get all credit_card_txn's (using UNION ALL)
        //              * type is used when getting cash_txn | debtor_txn | creditor_txn.
        //              * ---------------------------
        //              * All the non required values are checked if they are NULL.
        //              */
        //             id = reader.GetGuid(reader.GetOrdinal("id")),
        //             accountID = reqBody.accountID,
        //             details = reader.GetString(reader.GetOrdinal("details")),
        //             amount = reader.GetDouble(reader.GetOrdinal("amount")),
        //             creditCardType = reader.GetString(reader.GetOrdinal("credit_card_type")),
        //             
        //             categoryID = reader.IsDBNull(reader.GetOrdinal("category_id"))? null : reader.GetGuid(reader.GetOrdinal(("category_id"))),
        //             categoryName = reader.IsDBNull(reader.GetOrdinal("category_name")) ? null : reader.GetString(reader.GetOrdinal(("category_name"))),
        //             
        //             supplierID = reader.IsDBNull(reader.GetOrdinal("supplier_id")) ? null : reader.GetGuid(reader.GetOrdinal("supplier_id")), // This checks if there is a NULL value
        //             supplierName = reader.IsDBNull(reader.GetOrdinal("supplier_name")) ? null : reader.GetString(reader.GetOrdinal("supplier_name")),
        //             
        //             source = reader.GetString(reader.GetOrdinal("source")), // The source is added in the UNION to identify which DB table the TXN is from
        //             
        //             time = reader.IsDBNull(reader.GetOrdinal("time")) ? null: reader.GetString(reader.GetOrdinal("time")),
        //             date = reader.GetString(reader.GetOrdinal("date")),
        //             day = reader.GetInt32(reader.GetOrdinal("day")),
        //             dayOfWeek = reader.GetString(reader.GetOrdinal("day_of_week")),
        //             week = reader.GetInt32(reader.GetOrdinal("week")),
        //             month = reader.GetInt32(reader.GetOrdinal("month")),
        //             monthName = reader.GetString(reader.GetOrdinal("month_name")),
        //             year = reader.GetInt32(reader.GetOrdinal("year")),
        //             
        //     });
        // }
        //
        // return Ok(creditCardTxns);
    }

    [HttpPut("update_credit_card_txn")] // PUT is used to replace the entire resource
    public IActionResult UpdateCreditCardTxn([FromBody] Class.CreditCardTxn txn)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        
        const string SQL =
                """
                    UPDATE 
                        credit_card_txn 
                    SET 
                        details=@details, 
                        amount=@amount, 
                        credit_card_type=@creditCardType, 
                        category_id=@categoryID, 
                        supplier_id=@supplierID,
                        time=@time, 
                        date=@date, 
                        day=@day, 
                        week=@week, 
                        day_of_week=@dayOfWeek, 
                        month=@month, 
                        month_name=@monthName, 
                        year=@year 
                    WHERE 
                        account_id=@accountID
                        AND id=@transactionID
                    RETURNING *
                """;
        using var db = _db.GetConn();
        using var cmd = new NpgsqlCommand(SQL, db);
        
        // Break Down Date
        DateBrokenDown pDate = DateBrokenDown.BreakDownDate(txn.date);

        cmd.Parameters.AddWithValue("@amount", txn.amount);
        cmd.Parameters.AddWithValue("@details", txn.details);
        cmd.Parameters.AddWithValue("@creditCardType", txn.creditCardType);
        cmd.Parameters.AddWithValue("@categoryID", txn.categoryID ?? (object)DBNull.Value);
        cmd.Parameters.AddWithValue("@supplierID", txn.supplierID ?? (object)DBNull.Value);
        cmd.Parameters.AddWithValue("@time", txn.time ?? (object)DBNull.Value);
        
        cmd.Parameters.AddWithValue("@date", txn.date);
        cmd.Parameters.AddWithValue("@day", pDate.day);
        cmd.Parameters.AddWithValue("@week",  pDate.week);
        cmd.Parameters.AddWithValue("@dayOfWeek",  pDate.dayOfWeek);
        cmd.Parameters.AddWithValue("@month",  pDate.month);
        cmd.Parameters.AddWithValue("@monthName",  pDate.monthName);
        cmd.Parameters.AddWithValue("@year",  pDate.year);
        
        cmd.Parameters.AddWithValue("@accountID", txn.accountID);
        cmd.Parameters.AddWithValue("@transactionID", txn.id);

        using var reader = cmd.ExecuteReader();

        if (!reader.Read())
            return NotFound("TXN not Found");
        
        Class.CreditCardTxn updatedTxn = new Class.CreditCardTxn
        {
                id = reader.GetGuid(reader.GetOrdinal("id")),
                accountID = reader.GetGuid(reader.GetOrdinal("account_id")),
                details = reader.GetString(reader.GetOrdinal("details")),
                amount = reader.GetDouble(reader.GetOrdinal("amount")),
                creditCardType = reader.GetString(reader.GetOrdinal("credit_card_type")),
                categoryID = reader.IsDBNull(reader.GetOrdinal("category_id")) ? null : reader.GetGuid(reader.GetOrdinal("category_id")),
                supplierID = reader.IsDBNull(reader.GetOrdinal("supplier_id")) ? null : reader.GetGuid(reader.GetOrdinal("supplier_id")),
                time = reader.IsDBNull(reader.GetOrdinal("time")) ? null : reader.GetString(reader.GetOrdinal("time")),
                date = reader.GetString(reader.GetOrdinal("date"))
                // add other fields if needed
        };

        return Ok(updatedTxn);
    }

    [HttpDelete("delete_credit_card_txn")]
    public IActionResult DeleteCreditCardTXN([FromBody] RequestBody reqBody)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);


        string SQL = "DELETE FROM credit_card_txn WHERE id=@transactionID AND account_id=@accountID";
        using var db = _db.GetConn();
        using var cmd = new NpgsqlCommand(SQL, db);

        cmd.Parameters.AddWithValue("@transactionID", reqBody.transactionID);
        cmd.Parameters.AddWithValue("@accountID", reqBody.accountID);

        int rowsAffected = cmd.ExecuteNonQuery();

        if (rowsAffected == 0)
            return NotFound("Could not Delete TXN");

        return Ok(new { DeletedRows = rowsAffected });
    }
}