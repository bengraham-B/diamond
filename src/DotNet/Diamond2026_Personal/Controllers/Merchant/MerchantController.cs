using Class;
using MariaDB;
using Merchant;
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
            DiamondResponse DR = MerchantCRUD.GetMerchants(_conn, requestParams);
            return Ok(DR.MerchantList);
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
            DiamondResponse DR = MerchantCRUD.AddMerchant(_conn, merchant);
            return Ok(DR);
        }
        catch (Exception e)
        {
            return BadRequest($"Could not ADD_MERCHANTS: \n \n, {e}");
        }
        
    }
    
    [HttpPut("update_merchant")]
    public IActionResult UpdateMerchant([FromBody] MerchantModel merchant)
    {
        try
        {
            DiamondResponse DR = MerchantCRUD.UpdateMerchant(_conn, merchant);
            return Ok(DR);
        }
        catch (Exception e)
        {
            return BadRequest($"Could not UPDATE_MERCHANTS: \n \n, {e}");
        }
    }

    [HttpPut("delete_merchant")]
    public IActionResult DeleteMerchant([FromBody] RequestParams requestParams)
    {
        try
        {
            DiamondResponse DR = MerchantCRUD.DeleteMerchant(_conn, requestParams);
            return Ok(DR);
        }
        catch (Exception e)
        {
            return BadRequest($"Could not DELETE_MERCHANTS: \n \n, {e}");
        }
    }
    
}