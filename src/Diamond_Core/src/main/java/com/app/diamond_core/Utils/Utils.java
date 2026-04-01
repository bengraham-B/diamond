package com.app.diamond_core.Utils;

import com.app.diamond_core.Model.DiamondDate;

import java.sql.Date;
import java.util.Calendar;
import java.util.UUID;

public class Utils {
    public static UUID parseUUID(String s){
        return s != null ? UUID.fromString(s) : null;
    }

    public static String uuidToString(UUID u){
        return u != null ? u.toString() : null;
    }

    public static DiamondDate breakDownDate(Date date){
        Calendar c = Calendar.getInstance();
        c.setTime(date);

        DiamondDate dd = new DiamondDate();
        dd.setDate(date); // This is the actual date [YYYY-MM-DD]
        dd.setDay(c.get(Calendar.DATE));
        String[] dayName = {"SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"};
        dd.setDayOfWeek(dayName[c.get(Calendar.DAY_OF_WEEK) - 1]);
        dd.setDayOfYear(c.get(Calendar.DAY_OF_YEAR));
        dd.setWeek(c.get(Calendar.WEEK_OF_YEAR));
        dd.setMonth(c.get(Calendar.MONTH) + 1);
        dd.setYear(c.get(Calendar.YEAR));

        return dd;
    }

}
