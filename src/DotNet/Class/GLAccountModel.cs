namespace Class;

public class GLAccountModel
{
    public Guid? GL_ACCOUNT_ID { get; set; }
    public required string GL_ACCOUNT_NAME { get; set; }
    public required int GL_ACCOUNT_CODE { get; set; }
    public required string GL_ACCOUNT_TYPE { get; set; }
    public Guid? ACCOUNT_ID { get; set; }
}