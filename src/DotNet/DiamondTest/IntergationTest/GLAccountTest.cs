using MariaDB;
using Class;
using GL_ACCOUNT;
using Microsoft.Extensions.Configuration;

namespace DiamondTest.UnitTest;

public class GLAccountTest
{

    private readonly Conn _conn;
    private readonly RequestParams _req;
    private readonly GLAccountCRUD CRUD;

    private static Guid GLAccountID = Guid.NewGuid();

    private GLAccountModel testGLAccount = new GLAccountModel
    {
        GL_ACCOUNT_ID = GLAccountID,
        GL_ACCOUNT_CODE = 0,
        GL_ACCOUNT_NAME = "TEST GL ACCOUNT",
        GL_ACCOUNT_TYPE = "EXPENSE",
        ACCOUNT_ID = Guid.Parse("96e017ac-16b7-464d-93c2-653d396b609b"),
    };

    private GLAccountModel expectedGLAccount = new GLAccountModel
    {
        GL_ACCOUNT_ID = GLAccountID,
        GL_ACCOUNT_CODE = 5001,
        GL_ACCOUNT_NAME = "TEST GL ACCOUNT",
        GL_ACCOUNT_TYPE = "EXPENSE",
        ACCOUNT_ID = Guid.Parse("96e017ac-16b7-464d-93c2-653d396b609b"),
    };

    private GLAccountModel updatedGLAccount = new GLAccountModel
    {
        GL_ACCOUNT_ID = GLAccountID,
        GL_ACCOUNT_CODE = 5001,
        GL_ACCOUNT_NAME = "UPDATED GL ACCOUNT",
        GL_ACCOUNT_TYPE = "EXPENSE",
        ACCOUNT_ID = Guid.Parse("96e017ac-16b7-464d-93c2-653d396b609b"),
    };
    
    

    public GLAccountTest()
    {
        var config = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json")
            .Build();

        _conn = new Conn(config);

        _req = new RequestParams
        {
            ACCOUNT_ID = Guid.Parse("96e017ac-16b7-464d-93c2-653d396b609b"), // real ACCOUNT_ID from your dev DB
            GL_ACCOUNT_ID = GLAccountID
        };
    }
    
    [Fact]
    public void TestLifeCycle_GLAccount()
    {
        // ADD GL_ACCOUNT
        DiamondResponse AddGlAccount = GLAccountCRUD.AddGLAccount(_conn, testGLAccount);
        Assert.True(AddGlAccount.Success, "Could not add GL_ACCOUNT");
        
        // GET GL_ACCOUNT
        DiamondResponse result = GLAccountCRUD.GetGLAccounts(_conn, _req);
        Assert.NotNull(result.GLAccountList);
        
        GLAccountModel first = result.GLAccountList.First();
        Assert.Equal(expectedGLAccount.GL_ACCOUNT_ID, result.GLAccountList.First().GL_ACCOUNT_ID);
        Assert.Equal(expectedGLAccount.GL_ACCOUNT_CODE, result.GLAccountList.First().GL_ACCOUNT_CODE);
        Assert.Equal(expectedGLAccount.GL_ACCOUNT_NAME, result.GLAccountList.First().GL_ACCOUNT_NAME);
        Assert.Equal(expectedGLAccount.GL_ACCOUNT_TYPE, result.GLAccountList.First().GL_ACCOUNT_TYPE);
        Assert.Equal(expectedGLAccount.ACCOUNT_ID, result.GLAccountList.First().ACCOUNT_ID);
        
        // UPDATE GL_ACCOUNT
        DiamondResponse updatedGlAccount = GLAccountCRUD.UpdateGLAccount(_conn, updatedGLAccount);
        Assert.True(updatedGlAccount.Success, "Could not Update GL_ACCOUNT");
        
        // GET UPDATED GL_ACCOUNT
        DiamondResponse retrievedGLAccount = GLAccountCRUD.GetGLAccounts(_conn, _req);
        Assert.NotNull(retrievedGLAccount.GLAccountList);
        Assert.Equal(GLAccountID, retrievedGLAccount.GLAccountList.First().GL_ACCOUNT_ID);
        Assert.Equal(5001, retrievedGLAccount.GLAccountList.First().GL_ACCOUNT_CODE);
        Assert.Equal("UPDATED GL ACCOUNT", retrievedGLAccount.GLAccountList.First().GL_ACCOUNT_NAME);
        Assert.Equal("EXPENSE", retrievedGLAccount.GLAccountList.First().GL_ACCOUNT_TYPE);
        Assert.Equal(Guid.Parse("96e017ac-16b7-464d-93c2-653d396b609b"), retrievedGLAccount.GLAccountList.First().ACCOUNT_ID);
        
        // DELETE GL_ACCOUNT
        DiamondResponse deletedGlAccount = GLAccountCRUD.DeleteGLAccount(_conn, _req);
        Assert.True(deletedGlAccount.Success, "Could not Delete GL_ACCOUNT");

    }

    [Fact]
    public void GetGLAccounts()
    {
        DiamondResponse DR = GLAccountCRUD.GetGLAccounts(_conn, _req);
        Assert.True(DR.GLAccountList.Count > 0, "Could not get GL_ACCOUNTS");
    }
}