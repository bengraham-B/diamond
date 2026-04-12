using System.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;


using Class;
using DiamondTransaction;
using MariaDB;

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
        List<Class.DiamondTransaction> result = DiamondTransactionCRUD.GetDiamondTransaction(_conn, _req);

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
}