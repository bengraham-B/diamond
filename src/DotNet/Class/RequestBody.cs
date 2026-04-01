using System.ComponentModel.DataAnnotations;

namespace Class;

public class RequestBody
{
    [Required] 
    public Guid accountID { get; set; }
    public Guid transactionID { get; set; }
    public int? month { get; set; }
    public int? year { get; set; }
}