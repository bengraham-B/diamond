namespace Class;

public class RequestParams
{
    public required Guid  ACCOUNT_ID { get; set; }
    public Guid? TRANSACTION_ID { get; set; }
    public Guid? GL_ACCOUNT_ID { get; set; }
    public int? MONTH { get; set; }
    public int? YEAR { get; set; }
}