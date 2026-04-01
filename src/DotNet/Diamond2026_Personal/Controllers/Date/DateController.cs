using Class;
using Microsoft.AspNetCore.Mvc;

namespace Diamond2026_Personal.Controllers.Date;

[Route("api/date")]
public class DateController: ControllerBase
{
    public class dDate
    {
        public string sDate { get; set; }
    }
    [HttpPost("test")]
    public IActionResult James([FromBody] dDate d)
    {
        try
        {
            DateBrokenDown pDate = DateBrokenDown.BreakDownDate(d.sDate);
            return Ok(pDate);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return BadRequest("Could not do date: " + e + " ---- " + d.sDate);
        }
    } 
}