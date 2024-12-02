package com.diamond.functions;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.UUID;

public class Functions {

    public int[] breakDownDate(java.util.Date date) {
        if (date == null) {
            throw new IllegalArgumentException("Date cannot be null");
        }

        LocalDate localDate;

        // Check if the date is an instance of java.sql.Date
        if (date instanceof java.sql.Date) {
            // Convert java.sql.Date directly to LocalDate
            localDate = ((java.sql.Date) date).toLocalDate();
        } else {
            // Convert java.util.Date to LocalDate using ZoneId
            localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        }

        // Extract day, month, and year
        int day = localDate.getDayOfMonth();
        int month = localDate.getMonthValue();
        int year = localDate.getYear();

        // Log the breakdown for debugging
//        System.out.println("Day: " + day);
//        System.out.println("Month: " + month);
//        System.out.println("Year: " + year);

        // Return the components as an array
        return new int[]{day, month, year};
    }

    public String dateFormatter(Date date) {
        // Define the output date format for PostgreSQL
        SimpleDateFormat postgresFormat = new SimpleDateFormat("yyyy-MM-dd");

        try {
            // Format the Date object into the PostgreSQL-compatible string
            return postgresFormat.format(date);
        } catch (Exception e) {
            System.out.println("Error formatting Date: " + e.getMessage());
            return null; // Return null if formatting fails
        }
    }

    public boolean validateUUID(String uuidString){
        if (uuidString != null && !uuidString.isEmpty()) {
            UUID uuid = UUID.fromString(uuidString);
            System.out.println("Valid UUID");
            return true;
        } else {
            System.out.println("Invalid UUID string provided.");
            return false;
        }
    }
}
