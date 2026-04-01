namespace Class;

public class Transaction
{
    public Guid ACCOUNT_ID  { get; set; }
    public Guid? TRANSACTION_ID  { get; set; } // CASH_TXN_ID | CREDIT_CARD_TXN_ID | DEBTOR_TXN_ID | CREDITOR_TXN_ID
    public TransactionTypeEnum? TRANSACTION_SOURCE { get; set; } // CASH | CREDIT_CARD | DEBTOR_TXN | CREDITOR_TXN
    public decimal AMOUNT  { get; set; }
    public required string DETAILS  { get; set; }
    public required string TYPE { get; set; } // INCOME | EXPENSE | ASSET  - GL_ACCOUNT_TYPE
    public required string DATE  { get; set; }
    public int? GL_CODE { get; set; }
    public GL_ACCOUNT_MODEL? GL_ACCOUNT { get; set; }
    public Guid? GL_LINE_ID { get; set; }
    public Guid? GL_HEADER_ID { get; set; }
    public Guid? MERCHANT_ID  { get; set; }
    public string? MERCHANT_NAME { get; set; }
    public bool RECEIVABLE { get; set; } = false;
    public Guid? DEBTOR_ID { get; set; } = null;
    public String? DEBTOR_NAME { get; set; }
    public int? DAY { get; set; }
    public int? DAY_OF_YEAR { get; set; }
    public string? DAY_OF_WEEK { get; set; }
    public int? WEEK { get; set; }
    public int? MONTH { get; set; }
    public string? MONTH_NAME { get; set; }
    public int? YEAR { get; set; }
    public DateTime? CREATED { get; set; } // This is when the TXN was created timestamp in the DB
}