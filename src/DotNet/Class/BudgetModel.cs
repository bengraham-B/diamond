namespace Class;

public class BudgetModel
{
    public Guid? BUDGET_ID { get; set; }
    public required Guid ACCOUNT_ID { get; set; }
    public required Guid GL_ACCOUNT_ID { get; set; }
    public required string GL_ACCOUNT_NAME { get; set; }
    public required string GL_ACCOUNT_TYPE { get; set; }
    public required double BUDGET_AMOUNT { get; set; }
    public double? ACTUAL_AMOUNT { get; set; }
    public required string BUDGET_PERIOD { get; set; } // WEEK | MONTH
}