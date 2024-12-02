package com.diamond.transactions;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.sql.Date;


public class TransactionFunc {
    private final Connection conn;
    private final Transaction transaction;

    public TransactionFunc(Connection conn, Transaction transaction) {
        this.conn = conn;
        this.transaction = transaction;
    }

    // Breaks down the Date data type and returns day, month and year as integers

    public static int[] breakDownDate(java.util.Date date) {
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




    // ADD Transaction
    public boolean insertTransaction(Transaction transaction) throws SQLException {
        System.out.println("Version 0.0.1");
        // Handles breaking up Date and inserting values into 'day', 'month', 'monthName' and 'year'
        int dayBrokenDown = breakDownDate(transaction.getDate())[0];
        int monthBrokenDown = breakDownDate(transaction.getDate())[1];
        int yearBrokenDown = breakDownDate(transaction.getDate())[2];
        String []monthNames = {"Jan", "Feb", "Mar", "Apr","May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"};

        try {
            Statement statement = conn.createStatement();
            String SQL = String.format("INSERT INTO transaction (details, amount, transaction_type, user_id, account_id, date, day, month, month_name, year) VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')", transaction.getDetails(), transaction.getAmount(),  transaction.getTransactionType(), transaction.getUserID(), transaction.getAccountID(), dateFormatter(transaction.getDate()), dayBrokenDown, monthBrokenDown, monthNames[monthBrokenDown -1], yearBrokenDown);

            int rowsAffected   = statement.executeUpdate(SQL);
            if(rowsAffected > 0){
                System.out.println("Successfully Inserted Transaction");
                return true;
            }

            else {
                System.out.println("Could not Insert Transaction - 500");
                return false;
            }

        } catch (Exception e) {
            System.out.println("Could not Insert Transaction - 500: " + e);
            return false;
        }
    }

    // GET All Transaction

    // GET Single Transaction




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

}
