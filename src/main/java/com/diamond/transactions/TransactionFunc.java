package com.diamond.transactions;

import java.sql.*;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;


public class TransactionFunc {
    private final Connection conn;

    public TransactionFunc(Connection conn) {
        this.conn = conn;
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

            // Allows user to insert null value.
            String categoryID = (transaction.getCategoryID() == null) ? "NULL" : "'" + transaction.getCategoryID() + "'";

            String SQL = String.format(
                    "INSERT INTO transaction (details, amount, transaction_type, user_id, account_id, category_id, date, day, month, month_name, year) " +
                            "VALUES ('%s', '%s', '%s', '%s', '%s', %s, '%s', '%s', '%s', '%s', '%s')",
                    transaction.getDetails(), transaction.getAmount(), transaction.getTransactionType(),
                    transaction.getUserID(), transaction.getAccountID(), categoryID,
                    dateFormatter(transaction.getDate()), dayBrokenDown, monthBrokenDown,
                    monthNames[monthBrokenDown - 1], yearBrokenDown
            );
//            String SQL = String.format("INSERT INTO transaction (details, amount, transaction_type, user_id, account_id, category_id, date, day, month, month_name, year) VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')", transaction.getDetails(), transaction.getAmount(),  transaction.getTransactionType(), transaction.getUserID(), transaction.getAccountID(), transaction.getCategoryID(), dateFormatter(transaction.getDate()), dayBrokenDown, monthBrokenDown, monthNames[monthBrokenDown -1], yearBrokenDown);

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

    // Update Transaction
    public boolean updateTransaction(Transaction transaction) throws SQLException {
        System.out.println("Version 0.0.1");
        // Handles breaking up Date and inserting values into 'day', 'month', 'monthName' and 'year'
        int dayBrokenDown = breakDownDate(transaction.getDate())[0];
        int monthBrokenDown = breakDownDate(transaction.getDate())[1];
        int yearBrokenDown = breakDownDate(transaction.getDate())[2];
        String []monthNames = {"Jan", "Feb", "Mar", "Apr","May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"};

        try {
            Statement statement = conn.createStatement();
            System.out.println(transaction.getTransactionID());
            String SQL = String.format(
                    "UPDATE transaction SET details = '%s', amount = '%s', transaction_type = '%s', user_id = '%s', account_id = '%s', date = '%s', day = '%s', month = '%s', month_name = '%s', year = '%s' WHERE transaction_id=CAST('%s' AS UUID)",
                    transaction.getDetails(),
                    (transaction.getTransactionType().equals("credit") ? transaction.getAmount() : transaction.getAmount() * -1),
                    transaction.getTransactionType(),
                    transaction.getUserID(),
                    transaction.getAccountID(),
                    dateFormatter(transaction.getDate()),
                    dayBrokenDown,
                    monthBrokenDown,
                    monthNames[monthBrokenDown - 1],
                    yearBrokenDown,
                    transaction.getTransactionID()
            );
            int rowsAffected   = statement.executeUpdate(SQL);
            if(rowsAffected > 0){
                System.out.println("Successfully Updated Transaction");
                return true;
            }

            else {
                System.out.println("Could not Update Transaction - 500");
                return false;
            }

        } catch (Exception e) {
            System.out.println("Could not Update Transaction - 500: " + e);
            return false;
        }
    }

    // Delete Transaction
    public boolean deleteTransaction(Transaction transaction) throws SQLException {
        System.out.println("Version 0.0.1");
        // Handles breaking up Date and inserting values into 'day', 'month', 'monthName' and 'year'
        int dayBrokenDown = breakDownDate(transaction.getDate())[0];
        int monthBrokenDown = breakDownDate(transaction.getDate())[1];
        int yearBrokenDown = breakDownDate(transaction.getDate())[2];
        String []monthNames = {"Jan", "Feb", "Mar", "Apr","May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"};

        try {
            Statement statement = conn.createStatement();
            String SQL = String.format("INSERT INTO transaction (details, amount, transaction_type, user_id, account_id, date, day, month, month_name, year) VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')", transaction.getDetails(), (transaction.getTransactionType().equals("credit") ? transaction.getAmount() : transaction.getAmount() * -1),  transaction.getTransactionType(), transaction.getUserID(), transaction.getAccountID(), dateFormatter(transaction.getDate()), dayBrokenDown, monthBrokenDown, monthNames[monthBrokenDown -1], yearBrokenDown);

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

    private Transaction mapTransaction(ResultSet rs, int rowNum) throws SQLException {
        return new Transaction(
                rs.getString("transaction_id"),
                rs.getString("details"),
                rs.getDouble("amount"),
                rs.getString("transaction_type"),
                rs.getString("user_id"),
                rs.getString("account_id"),
                rs.getString("category_id"),
                rs.getString("category_name"),
                rs.getDate("date"),
                rs.getInt("day"),
                rs.getInt("month"),
                rs.getString("month_name"),
                rs.getInt("year")
        );
    }

    // GET All Transaction
    public List<Transaction> getTransactions(String accountID) throws SQLException {
        try {

            String SQL =
                    "SELECT " +
                            "transaction.transaction_id, " +
                            "transaction.account_id, " +
                            "transaction.details, " +
                            "transaction.amount, " +
                            "transaction.transaction_type, " +
                            "transaction.user_id, " +
                            "transaction.category_id, " +
                            "transaction.date, " +
                            "transaction.day, " +
                            "transaction.month, " +
                            "transaction.month_name, " +
                            "transaction.year, " +
                            "category.name AS category_name " +
                            "FROM transaction " +
                            "LEFT JOIN category ON transaction.category_id = category.id " +
                            "WHERE transaction.account_id = ?";


            String SQL1 = "SELECT * FROM transaction WHERE account_id = ? ORDER BY date DESC";
            PreparedStatement preparedStatement = conn.prepareStatement(SQL);
            preparedStatement.setString(1, accountID);
            ResultSet rs = preparedStatement.executeQuery();

//            Statement statement = conn.createStatement();
////            String SQL = String.format("INSERT INTO transaction (details, amount, transaction_type, user_id, account_id, date, day, month, month_name, year) VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')", transaction.getDetails(), (transaction.getTransactionType().equals("credit") ? transaction.getAmount() : transaction.getAmount() * -1),  transaction.getTransactionType(), transaction.getUserID(), transaction.getAccountID(), dateFormatter(transaction.getDate()), dayBrokenDown, monthBrokenDown, monthNames[monthBrokenDown -1], yearBrokenDown);
//            String SQL = String.format("SELECT * FROM transaction WHERE account_id='%S'", accountID);
//            ResultSet rs = statement.executeQuery(SQL);

            List<Transaction> transactionList = new ArrayList<>();
            int rowNum = 0;
            while(rs.next()){
                transactionList.add(mapTransaction(rs, rowNum++));
            }

            return transactionList;

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
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

}
