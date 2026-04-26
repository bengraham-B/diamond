namespace Class.Report;

public class MonthlyReportModel
{
    public required string NAME { get; set; }
    
    public required double TOTAL { get; set; }
    
    public required Guid ID { get; set; }
    
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