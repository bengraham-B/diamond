namespace Class;

public class GL_ACCOUNT
{
    public Guid GL_ACCOUNT_ID { get; set; }
    public required string GL_ACCOUNT_TYPE { get; set; }
    public int GL_ACCOUNT_CODE { get; set; }
    public required string GL_ACCOUNT_NAME { get; set; }
    public Guid? accountID { get; set; }
    public DateTime created { get; set; }
}