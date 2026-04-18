using System.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;


using Class;
using DiamondTransaction;
using MariaDB;
using MySqlConnector;
using Xunit.Sdk;

namespace DiamondTest.IntergationTest.DiamondTransaction;

public class DiamondTransactionTest
{
    private readonly Conn _conn;
    private readonly RequestParams _req;
    private readonly DiamondTransactionCRUD _diamondTransactionCrud;

    private DiamondTransactionModel testDiamondTransactionModel = new DiamondTransactionModel
    {
        DIAMOND_TRANSACTION_ID = Guid.Parse("428d53f2-ecdb-4eb9-82b0-523b1ceecd87"),
        ACCOUNT_ID = Guid.Parse("625d0169-9f3d-42fb-b861-9f05798ac7be"),
        DETAILS = "Test Transaction",
        AMOUNT = 6000000,
        MERCHANT_ID = Guid.Parse("da95a985-1dce-4ae4-85e5-4059aa685844"),
        DEBTOR_ID = Guid.Parse("d203ed4f-e3e5-44f9-8ed1-92c571e32468"),
        DATE = "2026-04-20",
        GL_ACCOUNT_ID = Guid.Parse("9afd74e8-f125-4b8b-a376-73f7886849c4"),
        TXN_TYPE = "INCOME",
        SOURCE = "CASH",
    };

    public DiamondTransactionTest()
    {
        var configuration = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json")
            .Build();

        _conn = new Conn(configuration);
        
        _req = new RequestParams
        {
            ACCOUNT_ID = Guid.Parse("625d0169-9f3d-42fb-b861-9f05798ac7be"), // real ACCOUNT_ID from your dev DB
            TRANSACTION_ID = Guid.Parse("428d53f2-ecdb-4eb9-82b0-523b1ceecd87"),
            
        };
    }

    [Fact]
    public void GetAllDiamondTransactionsTest()
    {
        Assert.True(DiamondTransactionCRUD.AddDiamondTransaction(_conn, testDiamondTransactionModel), "Could not add Test Diamond Transaction");
        List<DiamondTransactionModel> result = DiamondTransactionCRUD.GetDiamondTransaction(_conn, _req);

        Assert.NotEmpty(result);
    
        var first = result.First();
        Assert.NotEqual(Guid.Empty, first.ACCOUNT_ID);
        Assert.NotEqual(Guid.Empty, first.DIAMOND_TRANSACTION_ID);
        Assert.NotNull(first.DETAILS);
        Assert.NotNull(first.TXN_TYPE);
        Assert.NotNull(first.SOURCE);
        Assert.NotNull(first.DATE);
        
        Assert.True(DiamondTransactionCRUD.DeleteDiamondTransaction(conn: _conn, _req), "Could not Delete Transaction in [GetAllDiamondTransactionsTest]");
    }

    [Fact]
    public void AddDiamondTransactionTest()
    {

        Guid accountID = Guid.NewGuid();
        Guid diamondTransactionID = Guid.NewGuid();
        Guid merchantID = Guid.NewGuid();
        Guid debtorID = Guid.NewGuid();
        Guid glAccountID = Guid.NewGuid();
        DiamondTransactionModel addTxn = new DiamondTransactionModel
        {
            ACCOUNT_ID = accountID,
            DIAMOND_TRANSACTION_ID = diamondTransactionID,
            AMOUNT = 1000000,
            DETAILS = "TEST ADDING DIAMOND_TRANSACTION",
            MERCHANT_ID = merchantID,
            DEBTOR_ID = debtorID,
            GL_ACCOUNT_ID = glAccountID,
            DATE = "2026-04-12",
            TXN_TYPE = "INCOME",
            SOURCE = "CASH",
        };
        
        Assert.True(DiamondTransactionCRUD.AddDiamondTransaction(_conn, addTxn));

        DiamondTransactionModel expectedTxn = new DiamondTransactionModel
        {
            ACCOUNT_ID = accountID,
            DIAMOND_TRANSACTION_ID = diamondTransactionID,
            AMOUNT = 1000000,
            DETAILS = "TEST ADDING DIAMOND_TRANSACTION",
            MERCHANT_ID = merchantID,
            DEBTOR_ID = debtorID,
            GL_ACCOUNT_ID = glAccountID,
            DATE = "2026-04-12",
            TXN_TYPE = "INCOME",
            SOURCE = "CASH",
            
            DAY=12,
            DAY_OF_WEEK = "Sun",
            DAY_OF_YEAR = 102,
            WEEK = 15,
            MONTH = 4,
            YEAR = 2026,
        };

        DiamondTransactionModel? fetchedTxn = FetchSingleTXN(_conn, diamondTransactionID);
        if (fetchedTxn == null)
            throw new Exception("Could not Fetch Transaction");

        Assert.Multiple(
            () => Assert.Equal(expectedTxn.ACCOUNT_ID, fetchedTxn.ACCOUNT_ID),
            () => Assert.Equal(expectedTxn.ACCOUNT_ID, fetchedTxn.ACCOUNT_ID),
            () => Assert.Equal(expectedTxn.DIAMOND_TRANSACTION_ID, fetchedTxn.DIAMOND_TRANSACTION_ID),
            
            () =>  Assert.Equal(expectedTxn.AMOUNT, fetchedTxn.AMOUNT),
            () =>  Assert.Equal(expectedTxn.DETAILS, fetchedTxn.DETAILS),
            
            () => Assert.Equal(expectedTxn.MERCHANT_ID, fetchedTxn.MERCHANT_ID),
            () => Assert.Equal(expectedTxn.GL_ACCOUNT_ID, fetchedTxn.GL_ACCOUNT_ID),
            
            () =>  Assert.Equal(expectedTxn.DATE, fetchedTxn.DATE),
            () =>  Assert.Equal(expectedTxn.DAY, fetchedTxn.DAY),
            () =>  Assert.Equal(expectedTxn.DAY_OF_WEEK, fetchedTxn.DAY_OF_WEEK),
            () =>  Assert.Equal(expectedTxn.DAY_OF_YEAR, fetchedTxn.DAY_OF_YEAR),
            () =>  Assert.Equal(expectedTxn.WEEK, fetchedTxn.WEEK),
            () =>  Assert.Equal(expectedTxn.MONTH, fetchedTxn.MONTH),
            () =>  Assert.Equal(expectedTxn.YEAR, fetchedTxn.YEAR)
        );
        
        RequestParams req = new RequestParams
        {
            ACCOUNT_ID = accountID,
            TRANSACTION_ID = addTxn.DIAMOND_TRANSACTION_ID,
        };
        
        // Delete the TXN after
        Assert.True(DiamondTransactionCRUD.DeleteDiamondTransaction(conn:_conn, requestParams: req));
    }

    private static DiamondTransactionModel? FetchSingleTXN(Conn conn, Guid pDIAMOND_TRANSACTION_ID)
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
        
        Assert.Equal(updatedTXN.ACCOUNT_ID, compareTXN.ACCOUNT_ID);
        Assert.Equal(updatedTXN.DIAMOND_TRANSACTION_ID, compareTXN.DIAMOND_TRANSACTION_ID);
        
        Assert.Equal(updatedTXN.AMOUNT, compareTXN.AMOUNT);
        Assert.Equal(updatedTXN.DETAILS, compareTXN.DETAILS);
        
        Assert.Equal(updatedTXN.MERCHANT_ID, compareTXN.MERCHANT_ID);
        Assert.Equal(updatedTXN.GL_ACCOUNT_ID, compareTXN.GL_ACCOUNT_ID);
        
        Assert.Equal(updatedTXN.DATE, compareTXN.DATE);
        Assert.Equal(updatedTXN.DAY, compareTXN.DAY);
        Assert.Equal(updatedTXN.DAY_OF_WEEK, compareTXN.DAY_OF_WEEK);
        Assert.Equal(updatedTXN.DAY_OF_YEAR, compareTXN.DAY_OF_YEAR);
        Assert.Equal(updatedTXN.WEEK, compareTXN.WEEK);
        Assert.Equal(updatedTXN.MONTH, compareTXN.MONTH);
        
        Assert.True(DiamondTransactionCRUD.DeleteDiamondTransaction(_conn, req), "Could not Delete TXN After comparing TXNs");
    }

    [Fact]
    public void DeleteDiamondTransactionTest()
    {
        Guid diamondTransactionID = Guid.NewGuid();
        Guid merchantID = Guid.NewGuid();
        Guid debtorID = Guid.NewGuid();
        Guid glAccountID = Guid.NewGuid();
        Guid accountID = Guid.NewGuid();
        
        DiamondTransactionModel txn = new DiamondTransactionModel
        {
            ACCOUNT_ID = accountID,
            DIAMOND_TRANSACTION_ID = diamondTransactionID,
            AMOUNT = 1000000,
            DETAILS = "TEST ADDING DIAMOND_TRANSACTION",
            MERCHANT_ID = merchantID,
            DEBTOR_ID = debtorID,
            GL_ACCOUNT_ID = glAccountID,
            DATE = "2026-04-12",
            TXN_TYPE = "INCOME",
            SOURCE = "CASH",
        };
        Assert.True(DiamondTransactionCRUD.AddDiamondTransaction(_conn, txn));
        
        RequestParams req = new RequestParams
        {
            ACCOUNT_ID = accountID,
            TRANSACTION_ID = txn.DIAMOND_TRANSACTION_ID,
        };
        
        // Delete the TXN after
        Assert.True(DiamondTransactionCRUD.DeleteDiamondTransaction(conn:_conn, requestParams: req));
        
        
    }
}