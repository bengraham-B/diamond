using Class;
using DiamondTransaction;
using MariaDB;
using Merchant;
using Microsoft.Extensions.Configuration;

namespace DiamondTest.IntergationTest;

public class MerchantTest
{
    private readonly Conn _conn;
    private readonly Guid _testAccountID = Guid.Parse("96e017ac-16b7-464d-93c2-653d396b609b"); // Use a fixed Test ID

    public MerchantTest()
    {
        var config = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json")
            .Build();

        _conn = new Conn(config);
    }

    [Fact]
    public void LifeCycle_Merchant()
    {
        // Unique Data for test
        Guid merchantID = Guid.NewGuid();
        MerchantModel newMerchant = new MerchantModel
        {
            MERCHANT_ID = merchantID,
            NAME = "Integration Test Merchant",
            TOWN = "Cape Town",
            SHOPPING_CENTER = "Test Mall",
            ACCOUNT_ID = _testAccountID
        };
        
        // Clean slate delete if happens to exist
        MerchantCRUD.DeleteMerchant(_conn, new RequestParams { MERCHANT_ID = merchantID, ACCOUNT_ID = _testAccountID });
        
        // ADD MERCHANT
        DiamondResponse addMerchant = MerchantCRUD.AddMerchant(_conn, newMerchant);
        Assert.True(addMerchant.Success);
        
        // GET MERCHANT
        DiamondResponse getResult = MerchantCRUD.GetMerchants(_conn, new RequestParams { ACCOUNT_ID = _testAccountID });
        MerchantModel foundMerchant = getResult.MerchantList.FirstOrDefault(m => m.MERCHANT_ID == merchantID);
        // Assert.NotNull(foundMerchant);
        Assert.Equal(newMerchant.NAME, foundMerchant.NAME);
        
        // UPDATE MERCHANT
        newMerchant.NAME = "UPDATED NAME";
        newMerchant.TOWN = "Harlem";
        newMerchant.SHOPPING_CENTER = "Red One Shopping Center";
        DiamondResponse updatedResult = MerchantCRUD.UpdateMerchant(_conn, newMerchant);
        Assert.True(updatedResult.Success);
        
        // GET UPDATED MERCHANT
        DiamondResponse getUpdatedMerchant = MerchantCRUD.GetMerchants(_conn, new RequestParams { ACCOUNT_ID = _testAccountID });
        MerchantModel foundUpdatedMerchant = getUpdatedMerchant.MerchantList.FirstOrDefault(m => m.MERCHANT_ID == merchantID);
        Assert.NotNull(foundUpdatedMerchant);
        Assert.Equal("UPDATED NAME", foundUpdatedMerchant.NAME);
        Assert.Equal("Harlem", foundUpdatedMerchant.TOWN);
        Assert.Equal("Red One Shopping Center", foundUpdatedMerchant.SHOPPING_CENTER);
        
        // DELETE MERCHANT
        DiamondResponse deleteResult = MerchantCRUD.DeleteMerchant(_conn, new RequestParams { ACCOUNT_ID = _testAccountID, MERCHANT_ID = merchantID });
        Assert.True(deleteResult.Success, "Could not Delete Merchant");
        
        // FINAL CHECK
        DiamondResponse finalMerchantList = MerchantCRUD.GetMerchants(_conn, new RequestParams { ACCOUNT_ID = _testAccountID });
        Assert.NotNull(finalMerchantList);
        Assert.DoesNotContain(finalMerchantList.MerchantList, m => m.MERCHANT_ID == merchantID);
    }
}