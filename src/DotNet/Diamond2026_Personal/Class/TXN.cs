/*
 * This TXN_Class will be displayed to the user
 */
using System.ComponentModel.DataAnnotations;

namespace Diamond2026_Personal.Class;

public class TXN
{
    public Guid? TXN_ID { get; set; } // CASH_TXN_ID | CREDIT_CARD_TXN_ID | DEBTOR_TXN_ID | CREDITOR_TXN_ID
    [Required]
    public Guid accountID { get; set; }
    
    [Required]
    public string details { get; set; }
    [Required]
    public decimal amount { get; set; }
    [Required]
    public string type { get; set; }  // INCOME | EXPENSE
    
    public string? time { get; set; }
    [Required]
    public string date { get; set; } // Can leave like this as Time Zones usually mess it up anyway 😶.
    public int? day { get; set; }
    public string? dayOfWeek { get; set; }
    public int? week { get; set; }
    public int? month { get; set; }
    public string? monthName { get; set; }
    public int? year { get; set; }
    
    public Guid CATEGORY_ID { get; set; }
}