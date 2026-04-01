using System.Runtime.InteropServices;
using MariaDB;
using Class;

namespace Utils;

public class GL_ACCOUNT
{

    public static bool VerifyBaseGLAccounts(Conn conn, String ACCOUNT_ID)
    {
        // This function will verify that the user has all the standard accounts and will insert any missing ones.
        List<GL_ACCOUNT_MODEL> StandardGLAccounts = new List<GL_ACCOUNT_MODEL>
        {
            new GL_ACCOUNT_MODEL{GL_ACCOUNT_NAME = "BANK", GL_ACCOUNT_CODE = 1000, GL_ACCOUNT_TYPE = "ASSET"},
            new GL_ACCOUNT_MODEL{GL_ACCOUNT_NAME = "SUNDRY ASSET", GL_ACCOUNT_CODE = -1000, GL_ACCOUNT_TYPE = "ASSET"},
            
            new GL_ACCOUNT_MODEL{GL_ACCOUNT_NAME = "CREDIT_CARD", GL_ACCOUNT_CODE = 2000, GL_ACCOUNT_TYPE = "LIABILITY"},
            new GL_ACCOUNT_MODEL{GL_ACCOUNT_NAME = "SUNDRY LIABILITY", GL_ACCOUNT_CODE = -2000, GL_ACCOUNT_TYPE = "LIABILITY"},
            
            new GL_ACCOUNT_MODEL{GL_ACCOUNT_NAME = "BASE EQUITY", GL_ACCOUNT_CODE = 3000, GL_ACCOUNT_TYPE = "EQUITY"},
            new GL_ACCOUNT_MODEL{GL_ACCOUNT_NAME = "SUNDRY EQUITY", GL_ACCOUNT_CODE = -3000, GL_ACCOUNT_TYPE = "EQUITY"},
            
            new GL_ACCOUNT_MODEL{GL_ACCOUNT_NAME = "BASE INCOME", GL_ACCOUNT_CODE = 4000, GL_ACCOUNT_TYPE = "INCOME"},
            new GL_ACCOUNT_MODEL{GL_ACCOUNT_NAME = "SUNDRY INCOME", GL_ACCOUNT_CODE = -4000, GL_ACCOUNT_TYPE = "INCOME"},
            
            new GL_ACCOUNT_MODEL{GL_ACCOUNT_NAME = "BASE EXPENSE", GL_ACCOUNT_CODE = 5000, GL_ACCOUNT_TYPE = "EXPENSE"},
            new GL_ACCOUNT_MODEL{GL_ACCOUNT_NAME = "SUNDRY EXPENSE", GL_ACCOUNT_CODE = -5000, GL_ACCOUNT_TYPE = "EXPENSE"},
            new GL_ACCOUNT_MODEL{GL_ACCOUNT_NAME = "REPAID CREDIT_CARD", GL_ACCOUNT_CODE = -5001, GL_ACCOUNT_TYPE = "EXPENSE"},
        };
        try
        {
            const string SQL = "SELECT * FROM GL_ACCOUNT WHERE ACCOUNT_ID='@ACCOUNT_ID'";
            
            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
    
}