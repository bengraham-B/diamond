using Class;
using MariaDB;
using Microsoft.AspNetCore.Mvc;
using GL_ACCOUNT;
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
        try
        {
            DiamondResponse DR = GLAccountCRUD.GetGLAccounts(_conn, requestParams);
            return Ok(DR.GLAccountList);
        }
        catch (Exception e)
        {
            return BadRequest($"Could not Get GL_ACCOUNTS {e}");
        }
    }

    [HttpPost("add_gl_account")]
    public IActionResult AddGlAccount([FromBody] GLAccountModel model)
    {
        try
        {
            DiamondResponse DR = GLAccountCRUD.AddGLAccount(_conn, model);
            return Ok(DR);
        }
        catch (Exception e)
        {
            return BadRequest($"Could not Add GL_ACCOUNT {e}");
        }
    }
    
    [HttpPut("update_gl_account")]
    public IActionResult UpdateGlAccount([FromBody] GLAccountModel model)
    {
        try
        {
            DiamondResponse DR = GLAccountCRUD.UpdateGLAccount(_conn, model);
            return Ok(DR);
        }
        catch (Exception e)
        {
            return BadRequest($"Could not Update GL_ACCOUNT {e}");
        }
    }
    
    [HttpPost("delete_gl_account")]
    public IActionResult DeleteGlAccount([FromBody] RequestParams req)
    {
        try
        {
            DiamondResponse DR = GLAccountCRUD.DeleteGLAccount(_conn, req);
            return Ok(DR);
        }
        catch (Exception e)
        {
            return BadRequest($"Could not Delete GL_ACCOUNT {e}");
        }
    }
}