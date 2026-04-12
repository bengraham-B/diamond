using Class;
using Utils;

namespace DiamondTest.UnitTest;

public class DateTest
{
    [Theory]
    [InlineData("2026-04-12", 12, 102, "Sun", 15, 4,  "Apr",  2026)]
    public void DateBreakDownTest(string pDate, int pDay, int pDayOfYear, string pDayOfWeek, int pWeek, int pMonth, string pMonthName, int pYear)
    {
        DateBrokenDownModel mDate = DateUtils.BreakDownDate(pDate);
        
        Assert.Equal(pDate, mDate.date);
        Assert.Equal(pDay, mDate.day);
        Assert.Equal(pDayOfYear, mDate.dayOfYear);
        
        Assert.Equal(pWeek, mDate.week);
        Assert.Equal(pDayOfWeek, mDate.dayOfWeek);
        
        Assert.Equal(pMonth, mDate.month);
        Assert.Equal(pMonthName, mDate.monthName);
        
        Assert.Equal(pYear, mDate.year);
        
    }
}