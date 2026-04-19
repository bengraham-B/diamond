using Class;
using MariaDB;
using Merchant;
using Microsoft.AspNetCore.Mvc;

namespace Diamond2026_Personal.Controllers.Merchant;

[Route("api/merchant_report")]
public class MerchantReportController(Conn conn) : ControllerBase
{

    [HttpPost("month_merchant_report")]
    public IActionResult MonthlyMerchantReport([FromBody] RequestParams requestParams)
    {
        DiamondResponse DR = MerchantReport.MonthlyMerchantReport(conn, requestParams);
        return Ok(DR);
    }
    
}