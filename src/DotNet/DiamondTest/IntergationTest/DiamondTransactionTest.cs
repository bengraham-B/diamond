using System.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;


using Class;
using DiamondTransaction;
using MariaDB;
using MySqlConnector;

namespace DiamondTest.IntergationTest.DiamondTransaction;

public class DiamondTransactionTest
{
    private readonly Conn _conn;
    private readonly RequestParams _req;
    private readonly DiamondTransactionCRUD _diamondTransactionCrud;

    public DiamondTransactionTest()
    {
        var configuration = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json")
            .Build();

        _conn = new Conn(configuration);
        
        _req = new RequestParams
        {
            ACCOUNT_ID = Guid.Parse("de58d6a9-1512-11f1-a3e0-ce6cdc3544e3") // real ACCOUNT_ID from your dev DB
        };
    }

    [Fact]
    public void GetAllDiamondTransactionsTest()
    {
        List<Class.DiamondTransactionModel> result = DiamondTransactionCRUD.GetDiamondTransaction(_conn, _req);

        Assert.NotEmpty(result);
    
        var first = result.First();
        Assert.NotEqual(Guid.Empty, first.ACCOUNT_ID);
        Assert.NotEqual(Guid.Empty, first.DIAMOND_TRANSACTION_ID);
        Assert.NotNull(first.DETAILS);
        Assert.NotNull(first.TXN_TYPE);
        Assert.NotNull(first.SOURCE);
        Assert.NotNull(first.DATE);

        // This will only show to the console when you debug the test
        foreach (var txn in result)
        {
            Debug.WriteLine(txn.ACCOUNT_ID);
            Debug.WriteLine(txn.AMOUNT);
            Debug.WriteLine(txn.DETAILS);
            Debug.WriteLine("---------------------------------------------------------");
            
        }
    }

    [Fact]
    public void AddDiamondTransactionTest()
    {
        
        // Test Transaction
        Class.DiamondTransactionModel txn = new Class.DiamondTransactionModel
        {
            ACCOUNT_ID = Guid.Parse("de58d6a9-1512-11f1-a3e0-ce6cdc3544e3"),
            DIAMOND_TRANSACTION_ID = Guid.NewGuid(),
            AMOUNT = 1000000,
            DETAILS = "TEST ADDING DIAMOND_TRANSACTION",
            DATE = "2026-04-12",
            TXN_TYPE = "INCOME",
            SOURCE = "CASH",
        };
        
        Assert.True(DiamondTransactionCRUD.AddDiamondTransaction(_conn, txn));


        RequestParams req = new RequestParams
        {
            ACCOUNT_ID = Guid.Parse("de58d6a9-1512-11f1-a3e0-ce6cdc3544e3"),
            TRANSACTION_ID = txn.DIAMOND_TRANSACTION_ID,
        };
        
        // Delete the TXN after
        DiamondTransactionCRUD.DeleteDiamondTransaction(conn:_conn, requestParams: req);
    }

    private DiamondTransactionModel? FetchSingleTXN(Conn conn, Guid pDIAMOND_TRANSACTION_ID)
    {
        const string SQL = "SELECT * FROM DIAMOND_TRANSACTION WHERE DIAMOND_TRANSACTION_ID=@DIAMOND_TRANSACTION_ID";
        using var connection = conn.Open();
        using var cmd = new MySqlCommand(SQL, connection);
        cmd.Parameters.AddWithValue("@DIAMOND_TRANSACTION_ID", pDIAMOND_TRANSACTION_ID);
        var reader = cmd.ExecuteReader();

        if (!reader.Read()) return null;

        return new DiamondTransactionModel
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
            WEEK = reader.GetInt32("WEEK"),
            MONTH = reader.GetInt32("MONTH"),
            YEAR = reader.GetInt32("YEAR"),
                
            MERCHANT_ID = reader.IsDBNull(reader.GetOrdinal("MERCHANT_ID")) ? null : reader.GetGuid("MERCHANT_ID"),
            DEBTOR_ID = reader.IsDBNull(reader.GetOrdinal("DEBTOR_ID")) ? null : reader.GetGuid("DEBTOR_ID"),

            GL_ACCOUNT_ID = reader.IsDBNull(reader.GetOrdinal("GL_ACCOUNT_ID")) ? null : reader.GetGuid("GL_ACCOUNT_ID"),
        };
            
        
    }

    [Fact]
    public void UpdateDiamondTransactionTest()
    {
        Guid TransactionID = Guid.NewGuid();
        Guid MerchantID = Guid.Parse("7d4655f1-d2ff-463c-8aa9-ee6eb778d760");
        Guid DebtorID = Guid.NewGuid();
        Guid GLAccountID = Guid.NewGuid();
        Guid AccountID = Guid.NewGuid();
        
        DiamondTransactionModel orginalTXN = new DiamondTransactionModel
        {
            ACCOUNT_ID = AccountID,
            DIAMOND_TRANSACTION_ID = TransactionID,
            AMOUNT = 1000000,
            DETAILS = "TEST ADDING DIAMOND_TRANSACTION",
            DATE = "2026-04-12",
            TXN_TYPE = "INCOME",
            SOURCE = "CASH",
        };
        
        Assert.True(DiamondTransactionCRUD.AddDiamondTransaction(_conn,  orginalTXN), "Could not Add TXN");

        DiamondTransactionModel updatedTXN = new DiamondTransactionModel()
        {
            ACCOUNT_ID = AccountID,
            DIAMOND_TRANSACTION_ID = TransactionID,
            AMOUNT = 2000000,
            DETAILS = "Updated TXN",
            TXN_TYPE = "INCOME",
            SOURCE = "CASH",
            MERCHANT_ID = MerchantID,
            DEBTOR_ID = DebtorID,
            RECEIVABLE = true,
            GL_ACCOUNT_ID = GLAccountID,
            
            DATE = "2026-05-08",
            DAY = 8,
            DAY_OF_WEEK = "Fri",
            DAY_OF_YEAR = 128,
            WEEK = 19,
            MONTH = 5,
            YEAR = 2026
        };
        
        try
        {
            Assert.True(DiamondTransactionCRUD.UpdateDiamondTransaction(_conn, updatedTXN), "Could not Update TXN");
        }
        catch (Exception e)
        {
            Assert.Fail($"Update threw an exception: {e.Message}");
            Debug.WriteLine(e);
            throw;
        }
        
        RequestParams req = new RequestParams
        {
            ACCOUNT_ID = AccountID,
            TRANSACTION_ID = TransactionID
        };
        DiamondTransactionModel? compareTXN = FetchSingleTXN(_conn, TransactionID);
        if (compareTXN == null)
        {
            Assert.True(DiamondTransactionCRUD.DeleteDiamondTransaction(_conn, req), "Could not Delete TXN After comparing TXNs");
            throw new Exception("Could not get TXN from update");
        }
        
        // UpdatedTXN == CompareTXN
        
        Assert.Equal(updatedTXN.ACCOUNT_ID, compareTXN.ACCOUNT_ID);
        Assert.Equal(updatedTXN.DIAMOND_TRANSACTION_ID, compareTXN.DIAMOND_TRANSACTION_ID);
        
        Assert.Equal(updatedTXN.AMOUNT, compareTXN.AMOUNT);
        Assert.Equal(updatedTXN.DETAILS, compareTXN.DETAILS);
        
        // Assert.Equal(updatedTXN.MERCHANT_ID, compareTXN.MERCHANT_ID);
        Assert.Equal(updatedTXN.GL_ACCOUNT_ID, compareTXN.GL_ACCOUNT_ID);
        
        Assert.Equal(updatedTXN.DATE, compareTXN.DATE);
        Assert.Equal(updatedTXN.DAY, compareTXN.DAY);
        Assert.Equal(updatedTXN.DAY_OF_WEEK, compareTXN.DAY_OF_WEEK);
        Assert.Equal(updatedTXN.DAY_OF_YEAR, compareTXN.DAY_OF_YEAR);
        Assert.Equal(updatedTXN.WEEK, compareTXN.WEEK);
        Assert.Equal(updatedTXN.MONTH, compareTXN.MONTH);
        
        Assert.True(DiamondTransactionCRUD.DeleteDiamondTransaction(_conn, req), "Could not Delete TXN After comparing TXNs");
    }
}