namespace Class;

public class DateBrokenDownModel
{
    public required string date { get; set; }
    public int? day { get; set; }
    public int? dayOfYear { get; set; }
    public string? dayOfWeek { get; set; }
    public int? week { get; set; }
    public int? month { get; set; }
    public string? monthName { get; set; }
    public int? year { get; set; }
}