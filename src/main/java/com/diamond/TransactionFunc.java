package com.diamond;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.Date;

public class TransactionFunc {
    private final Connection conn;
    private final Transaction transaction;

    public TransactionFunc(Connection conn, Transaction transaction) {
        this.conn = conn;
        this.transaction = transaction;
    }



    // ADD Transaction
    public boolean insertTransaction(Transaction transaction) throws SQLException {
        System.out.println("Version 0.0.1");

        try {
            Statement statement = conn.createStatement();
            String SQL = String.format("INSERT INTO transaction (details, amount, transaction_type, user_id, account_id, date, day, month, year) VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')", transaction.getDetails(), transaction.getAmount(),  transaction.getTransactionType(), transaction.getUserID(), transaction.getAccountID(), dateFormater(transaction.getDate()), 27, 11, 2024);

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


    // Function to convert a date string into PostgreSQL-compatible format
    public String dateFormater(String dateString) {
        // Define the input date format
        SimpleDateFormat inputFormat = new SimpleDateFormat("dd-MM-yyyy");
        // Define the output date format for PostgreSQL
        SimpleDateFormat postgresFormat = new SimpleDateFormat("yyyy-MM-dd");

        try {
            // Parse the input date string into a Date object
            Date date = inputFormat.parse(dateString);
            // Format the Date object into the PostgreSQL-compatible string
            return postgresFormat.format(date);
        } catch (Exception e) {
            System.out.println("Could not parse Date: " + e.getMessage());
            return null; // Return null if parsing fails
        }
    }
}
