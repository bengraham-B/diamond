using System.Globalization;

namespace Class;

public class DateBrokenDown
{
    public string date { get; set; }
    public int day { get; set; }
    public int dayOfYear { get; set; }
    public string dayOfWeek { get; set; }
    public int week { get; set; }
    public int month { get; set; }
    public string monthName { get; set; }
    public int year { get; set; }

    private static readonly string[] _monthNamesArray = { "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec" };
    private static readonly string[] _daysOfWeekArray = { "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"};
    
    // Constructor
    private DateBrokenDown(){}

    private static int WeekNumber(DateTime pDate)
    {
       return new GregorianCalendar().GetWeekOfYear(pDate, CalendarWeekRule.FirstFourDayWeek, DayOfWeek.Monday);
    }

    // Angular date format -> yyyy-mm-dd
    public static DateBrokenDown BreakDownDate(string pDate)
    {
        
        if (string.IsNullOrWhiteSpace(pDate))
            throw new Exception("Date is null or empty.");
        
        // Convert to C# Date Format
        if (!DateTime.TryParseExact(pDate, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime sDate))
            throw new Exception("Invalid date format: Expected yyyy-MM-dd");
        
        return new DateBrokenDown()
        {
                day = sDate.Day,
                dayOfYear = sDate.DayOfYear,
                dayOfWeek = _daysOfWeekArray[(int)sDate.DayOfWeek], // Cast to Int 
                week = WeekNumber(sDate),
                month = sDate.Month,
                monthName = _monthNamesArray[sDate.Month - 1],
                year = sDate.Year
        };
    }
}