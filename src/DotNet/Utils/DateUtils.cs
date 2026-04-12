using System.Globalization;
using Class;

namespace Utils;

public class DateUtils
{
    private static readonly string[] _monthNamesArray = { "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec" };
    private static readonly string[] _daysOfWeekArray = { "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"};

    private static int WeekNumber(DateTime pDate)
    {
        return new GregorianCalendar().GetWeekOfYear(pDate, CalendarWeekRule.FirstFourDayWeek, DayOfWeek.Monday);
    }
    
    // Angular Date Format -> yyyy-mm-dd
    public static DateBrokenDownModel BreakDownDate(string pDate)
    {
        if (string.IsNullOrEmpty(pDate))
            throw new Exception("No date provided");
        
        // Convert to C# Dateformat
        if (!DateTime.TryParseExact(pDate, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime sDate))
            throw new Exception("Invalid date format: Expected yyyy-MM-dd");

        return new DateBrokenDownModel
        {
            date = pDate,
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