using Class;
using GL_ACCOUNT;
using MariaDB;
using Merchant;
using Microsoft.AspNetCore.Mvc;

namespace Diamond2026_Personal.Controllers.GL_ACCOUNTS;

[Route("api/gl_account_report")]
public class GLAccountReportController(Conn conn) : ControllerBase
{
    [HttpPost("month_gl_account_report")]
    public IActionResult MonthlyMerchantReport([FromBody] RequestParams requestParams)
    {
        DiamondResponse DR = GLAccountReport.MonthlyGLAccountReport(conn, requestParams);
        return Ok(DR.MonthlyReportList);
    }
    
}