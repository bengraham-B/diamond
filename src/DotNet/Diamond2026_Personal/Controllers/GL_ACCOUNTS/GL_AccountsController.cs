using Class;
using MariaDB;
using Microsoft.AspNetCore.Mvc;
using MySqlConnector;

namespace Diamond2026_Personal.Controllers.GL_ACCOUNTS;

[Route("api/gl_accounts")]
public class GL_AccountsController: ControllerBase
{
    private readonly Conn _conn;
    public GL_AccountsController(Conn conn)
    {
        _conn = conn;
    }

    [HttpGet("test")]
    public IActionResult Test()
    {
        return Ok("GL_ACCOUNTS [API]");
    }
    
    [HttpPost("get_gl_accounts")]
    public IActionResult Get_GL_ACCOUNTS([FromBody] RequestParams requestParams)
    {

        if ( requestParams.ACCOUNT_ID == Guid.Empty)
        {
            return BadRequest("Request Params is empty");
        }
        try
        {
            const string SQL = @"
                SELECT 
                    * 
                FROM 
                    GL_ACCOUNT 
                WHERE 
                    GL_ACCOUNT.ACCOUNT_ID=@ACCOUNT_ID
                    
                    AND GL_ACCOUNT_CODE NOT IN (1000, 2000, 3000, 4000, 5000) -- These are the Base Accounts
                    AND GL_ACCOUNT_TYPE NOT IN ('ASSET', 'LIABILITY', 'EQUITY')
                ORDER BY GL_ACCOUNT_NAME 
            ";
            using var connection = _conn.Open();
            using var cmd = new MySqlCommand(SQL, connection);
            cmd.Parameters.Add("@ACCOUNT_ID", MySqlDbType.Guid).Value = requestParams.ACCOUNT_ID;
            using var reader = cmd.ExecuteReader();
            List<GL_ACCOUNT_MODEL> USER_GL_ACCOUNTS = new List<GL_ACCOUNT_MODEL>();
            while (reader.Read())
            {
                USER_GL_ACCOUNTS.Add(new GL_ACCOUNT_MODEL
                {
                    GL_ACCOUNT_ID = reader.GetGuid("GL_ACCOUNT_ID"),
                    GL_ACCOUNT_TYPE = reader.GetString("GL_ACCOUNT_TYPE"),
                    GL_ACCOUNT_NAME = reader.GetString("GL_ACCOUNT_NAME"),
                    GL_ACCOUNT_CODE = reader.GetInt16("GL_ACCOUNT_CODE"),
                });
            }
            {
                
            }
            return Ok(USER_GL_ACCOUNTS);
        }
        catch (Exception e)
        {
            return BadRequest($"Could not Get GL_ACCOUNTS {e}");
        }
    }
}