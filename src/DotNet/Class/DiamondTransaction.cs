using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Class;

[Table("DIAMOND_TRANSACTION")]
public class DiamondTransaction
{
    [Key]
    public Guid DIAMOND_TRANSACTION_ID { get; set; }
    public Guid ACCOUNT_ID { get; set; }

    public double AMOUNT{ get; set; }
    public required string DETAILS{ get; set; }
    public required string TXN_TYPE { get; set; } // INCOME | EXPENSE | INCREASE | DECREASE
    public required string SOURCE { get; set; } // CASH | CREDIT_CARD
    public Guid? GL_ACCOUNT_ID { get; set; }
    [NotMapped]
    public string? GL_ACCOUNT_NAME { get; set; }
    [NotMapped]
    public string? GL_ACCOUNT_TYPE { get; set; }
    public Guid? MERCHANT_ID { get; set; }
    [NotMapped]
    public string? MERCHANT_NAME { get; set; }
    public bool RECEIVABLE { get; set; }
    public Guid? DEBTOR_ID { get; set; }
    public required string DATE { get; set; }
    public int DAY { get; set; }
    public string? DAY_OF_WEEK { get; set; }
    public int? DAY_OF_YEAR { get; set; }
    public int? WEEK { get; set; }
    public int? MONTH { get; set; }
    public int? YEAR { get; set; }
}