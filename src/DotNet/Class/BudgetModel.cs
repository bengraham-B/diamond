namespace Class;

public class BudgetModel
{
    public Guid? BUDGET_ID { get; set; }
    public Guid ACCOUNT_ID { get; set; }
    public Guid GL_ACCOUNT_ID { get; set; }
    public string? GL_ACCOUNT_NAME { get; set; }
    public string? GL_ACCOUNT_TYPE { get; set; }
    public double BUDGET_AMOUNT { get; set; }
    public double? ACTUAL_AMOUNT { get; set; }
    public string? BUDGET_PERIOD { get; set; } // WEEK | MONTH | DAY
    
    public double? JAN { get; set; }
    public double? FEB { get; set; }
    public double? MAR { get; set; }
    public double? APR { get; set; }
    public double? MAY { get; set; }
    public double? JUN { get; set; }
    public double? JUL { get; set; }
    public double? AUG { get; set; }
    public double? SEPT { get; set; }
    public double? OCT { get; set; }
    public double? NOV { get; set; }
    public double? DEC { get; set; }
}