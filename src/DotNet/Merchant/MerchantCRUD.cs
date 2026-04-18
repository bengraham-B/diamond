using Class;
using MariaDB;

namespace Merchant;

public class MerchantCRUD
{
    public DiamondResponse GetMerchants(Conn conn, RequestBody req)
    {
        const string SQL = @"";
        
        return new DiamondResponse
        {
            Success = true
        };
    }
    
    public DiamondResponse AddMerchant(Conn conn, MerchantModel model)
    {
        const string SQL = @"";
        return new DiamondResponse
        {
            Success = true
        };
    }
    
    public DiamondResponse UpdateMerchants(Conn conn, MerchantModel model)
    {
        const string SQL = @"";
        return new DiamondResponse
        {
            Success = true
        };
    }
    
    public DiamondResponse DeleteMerchants(Conn conn, RequestBody req)
    {
        const string SQL = @"DELETE FROM MERCHANT WHERE MERCHANT_ID=@MERCHANT_ID AND ACCOUNT_ID=@ACCOUNT_ID";
        return new DiamondResponse
        {
            Success = true
        };
    }
}