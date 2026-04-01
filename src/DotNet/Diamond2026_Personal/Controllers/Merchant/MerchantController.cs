using Class;
using MariaDB;
using Microsoft.AspNetCore.Mvc;
using MySqlConnector;

namespace Diamond2026_Personal.Controllers.Merchant;
[Route("api/merchant")]
public class MerchantController(Conn conn): ControllerBase
{
    private readonly Conn _conn = conn;

    [HttpPost("get_merchants")]
    public IActionResult GetMerchants([FromBody] RequestParams requestParams)
    {
        try
        {
            const string SQL = @"SELECT * FROM MERCHANT WHERE ACCOUNT_ID=@ACCOUNT_ID ORDER BY NAME";
            using var connection = _conn.Open();
            using var cmd = new MySqlCommand(SQL, connection);
            cmd.Parameters.Add("ACCOUNT_ID", MySqlDbType.Guid).Value = requestParams.ACCOUNT_ID;

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
            
            return Ok(merchants);
        }
        catch (Exception e)
        {
            return BadRequest($"Could not GET_MERCHANTS: \n \n, {e}");
        }
    }

    [HttpPost("add_merchant")]
    public IActionResult AddMerchant([FromBody] MerchantModel merchant)
    {
        try
        {
            const string SQL = @"
                INSERT INTO MERCHANT
                    (MERCHANT_ID, NAME, TOWN, SHOPPING_CENTER, ACCOUNT_ID)
                VALUES
                    (@MERCHANT_ID, @NAME, @TOWN, @SHOPPING_CENTER, @ACCOUNT_ID);

                ";
            
            Guid merchantID = Guid.NewGuid();
            using var connection = _conn.Open();
            using var cmd = new MySqlCommand(SQL, connection);
            
            cmd.Parameters.Add("@ACCOUNT_ID", MySqlDbType.Guid).Value = merchant.ACCOUNT_ID;
            cmd.Parameters.Add("@MERCHANT_ID", MySqlDbType.Guid).Value = merchantID;
            cmd.Parameters.Add("@NAME", MySqlDbType.String).Value = merchant.NAME;
            cmd.Parameters.Add("@TOWN", MySqlDbType.String).Value = merchant.TOWN;
            cmd.Parameters.Add("@SHOPPING_CENTER", MySqlDbType.String).Value = merchant.SHOPPING_CENTER;

            int rowsAffected = cmd.ExecuteNonQuery();
            if (rowsAffected == 0)
                throw new Exception("Could not INSERT Merchant into DB");
            
            return Ok("Merchant Added Successfully");
        }
        catch (Exception e)
        {
            return BadRequest($"Could not ADD_MERCHANTS: \n \n, {e}");
        }
        
    }
    
}