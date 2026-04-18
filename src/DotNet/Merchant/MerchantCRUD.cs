using Class;
using MariaDB;

namespace Merchant;

public class MerchantCRUD
{
    public void GetMerchants(Conn conn, RequestBody req)
    {
        const string SQL = @"";
    }
    
    public void AddMerchant(Conn conn, MerchantModel model)
    {
        const string SQL = @"";
    }
    
    public void UpdateMerchants(Conn conn, MerchantModel model)
    {
        const string SQL = @"";
    }
    
    public void DeleteMerchants(Conn conn, RequestBody req)
    {
        const string SQL = @"DELETE FROM MERCHANT WHERE MERCHANT_ID=@MERCHANT_ID AND ACCOUNT_ID=@ACCOUNT_ID";
    }
}