using Microsoft.Extensions.Configuration;

using Class;
using MariaDB;
using Budget;

namespace DiamondTest.IntergationTest.DiamondTransaction;

public class BudgetTest
{
    private readonly Conn _conn;
    private readonly RequestParams _requestParams;
    
    public BudgetTest()
    {
        var config = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json")
            .Build();

        _conn = new Conn(config);
        _requestParams = new RequestParams
        {
            ACCOUNT_ID = Guid.Parse("de58d6a9-1512-11f1-a3e0-ce6cdc3544e3")
        };
    }
    
    [Fact]
    public void BudgetFieldsAreNotNull()
    {
        var result = BudgetOperations.GetBudgets(_conn, _requestParams);
        
        Assert.NotEmpty(result);

        var first = result.First();
        Assert.NotEqual(Guid.Empty, first.ACCOUNT_ID);
        Assert.NotEqual(Guid.Empty, first.BUDGET_ID);
        Assert.NotEqual(Guid.Empty, first.GL_ACCOUNT_ID);
        
        Assert.NotEqual(0, first.BUDGET_AMOUNT);
        Assert.NotNull(first.GL_ACCOUNT_NAME);
        Assert.NotNull(first.GL_ACCOUNT_TYPE);
    }

    [Fact]
    public void BudgetCorrectFields()
    {
        var result = BudgetOperations.GetBudgets(_conn, _requestParams);
        
        Assert.NotEmpty(result);

        var first = result.First();
        
        // Fields we expected to be returned
        var expectedFields = new HashSet<string>
        {
            "ACCOUNT_ID",
            "BUDGET_ID",
            "GL_ACCOUNT_ID",
            "BUDGET_AMOUNT",
            "BUDGET_PERIOD",
            "GL_ACCOUNT_NAME",
            "GL_ACCOUNT_TYPE"
        };
        
        // Get all fields which actually have values using reflection
        var actualFields = typeof(BudgetModel)
            .GetProperties()
            .Where(B => B.GetValue(first) != null)
            .Select(P => P.Name)
            .ToHashSet();
        
        // Fail if there are any additional fields
        var extraFields = actualFields.Except(expectedFields);
        Assert.Empty(extraFields); // If no extra fields it will pass!
    }
    
}