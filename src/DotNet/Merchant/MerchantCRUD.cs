using Class;
using MariaDB;
using MySqlConnector;

namespace Merchant;

public class MerchantCRUD
{
    public static DiamondResponse GetMerchants(Conn conn, RequestParams req)
    {
        const string SQL = @"SELECT * FROM MERCHANT WHERE ACCOUNT_ID=@ACCOUNT_ID ORDER BY NAME";
        using var connection = conn.Open();
        using var cmd = new MySqlCommand(SQL, connection);
        cmd.Parameters.AddWithValue("ACCOUNT_ID", req.ACCOUNT_ID);

        var reader = cmd.ExecuteReader();
            
        List<MerchantModel> merchants = new List<MerchantModel>();
        while (reader.Read())
        {
            merchants.Add(new MerchantModel
            {
                MERCHANT_ID = reader.GetGuid("MERCHANT_ID"),
                NAME = reader.GetString("NAME"),
                TOWN = reader.GetString("TOWN")
            });
        }
        
        return new DiamondResponse
        {
            Success = true,
            MerchantList = merchants
        };
    }
    
    public static DiamondResponse AddMerchant(Conn conn, MerchantModel merchant)
    {
        const string SQL = @"
            INSERT INTO MERCHANT
                (MERCHANT_ID, NAME, TOWN, SHOPPING_CENTER, ACCOUNT_ID)
            VALUES
                (@MERCHANT_ID, @NAME, @TOWN, @SHOPPING_CENTER, @ACCOUNT_ID);
        ";
            
        Guid merchantID = Guid.NewGuid();
        using var connection = conn.Open();
        using var cmd = new MySqlCommand(SQL, connection);
            
        cmd.Parameters.Add("@ACCOUNT_ID", MySqlDbType.Guid).Value = merchant.ACCOUNT_ID;
        cmd.Parameters.Add("@MERCHANT_ID", MySqlDbType.Guid).Value = merchantID;
        cmd.Parameters.Add("@NAME", MySqlDbType.String).Value = merchant.NAME;
        cmd.Parameters.Add("@TOWN", MySqlDbType.String).Value = merchant.TOWN;
        cmd.Parameters.Add("@SHOPPING_CENTER", MySqlDbType.String).Value = merchant.SHOPPING_CENTER;

        int rowsAffected = cmd.ExecuteNonQuery();
        
        if (rowsAffected == 0)
            throw new Exception("Could not INSERT Merchant into DB");
        
        return new DiamondResponse
        {
            Success = rowsAffected > 0,
            ErrorMessage = rowsAffected > 0 ? null : "Could not Add Merchant"
        };
    }
    
    public static DiamondResponse UpdateMerchant(Conn conn, MerchantModel model)
    {
        
        const string SQL = @"
        UPDATE MERCHANT 
        SET 
            NAME = @NAME, 
            TOWN = @TOWN, 
            SHOPPING_CENTER = @SHOPPING_CENTER
        WHERE 
            MERCHANT_ID = @MERCHANT_ID 
            AND ACCOUNT_ID = @ACCOUNT_ID;";

        using var connection = conn.Open();
        using var cmd = new MySqlCommand(SQL, connection);
        
        cmd.Parameters.AddWithValue("@NAME", model.NAME);
        cmd.Parameters.AddWithValue("@TOWN", model.TOWN);
        cmd.Parameters.AddWithValue("@SHOPPING_CENTER", model.SHOPPING_CENTER);
        cmd.Parameters.AddWithValue("@MERCHANT_ID", model.MERCHANT_ID);
        cmd.Parameters.AddWithValue("@ACCOUNT_ID", model.ACCOUNT_ID);

        int rowsAffected = cmd.ExecuteNonQuery();

        return new DiamondResponse
        {
            Success = rowsAffected > 0,
            ErrorMessage = rowsAffected > 0 ? null : "Update failed: Merchant not found or unauthorized."
        };
    }
    
    public static DiamondResponse DeleteMerchant(Conn conn, RequestParams req)
    {
        const string SQL = @"DELETE FROM MERCHANT WHERE MERCHANT_ID=@MERCHANT_ID AND ACCOUNT_ID=@ACCOUNT_ID";

        using var connection = conn.Open();
        using var cmd = new MySqlCommand(SQL, connection);
        
        cmd.Parameters.AddWithValue("@MERCHANT_ID", req.MERCHANT_ID);
        cmd.Parameters.AddWithValue("@ACCOUNT_ID", req.ACCOUNT_ID);

        int rowsAffected = cmd.ExecuteNonQuery();

        return new DiamondResponse
        {
            Success = rowsAffected > 0,
            ErrorMessage = rowsAffected > 0 ? null : "Delete failed: Merchant not found or unauthorized."
        };
    }
}