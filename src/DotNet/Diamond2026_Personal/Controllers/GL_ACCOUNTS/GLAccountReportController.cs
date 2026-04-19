using Class;
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
        DiamondResponse DR = MerchantReport.MonthlyMerchantReport(conn, requestParams);
        return Ok(DR.MonthlyReportList);
    }
    
}