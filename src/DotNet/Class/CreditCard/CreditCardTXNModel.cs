namespace Class.CreditCard;

public class CreditCardTXNModel
{
    public required Guid ACCOUNT_ID { get; set; }
    public Guid? CREDIT_CARD_TXN_ID { get; set; }
    public required decimal AMOUNT { get; set; }
    public required string DETAILS { get; set; }
    public string? TYPE { get; set; } // INCREASE | REPAID
    public Guid? GL_HEADER_ID { get; set; }
    public required string DATE { get; set; }
    public int? GL_CODE { get; set; }
    public GL_ACCOUNT? GL_ACCOUNT { get; set; }
    public bool RECEIVABLE { get; set; } = false;
    public Guid? DEBTOR_ID { get; set; } = null;
    public Guid? MERCHANT_ID { get; set; }
    public int? DAY { get; set; }
    public string? DAY_OF_WEEK { get; set; }
    public int? WEEK { get; set; }
    public int? MONTH { get; set; }
    public string? MONTH_NAME { get; set; }
    public int? YEAR { get; set; }
    public DateTime? CREATED { get; set; }
}