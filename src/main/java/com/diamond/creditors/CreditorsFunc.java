package com.diamond.creditors;

import com.diamond.functions.Functions;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Objects;
import java.util.UUID;

public class CreditorsFunc {
    private final Connection conn;

    Functions func = new Functions();

    public CreditorsFunc(Connection conn){
        this.conn = conn;
    }

    // CREATE Creditor
    public void createCreditor(String creditorName, String description, UUID diamondUserId, UUID accountId) throws SQLException {
        try {
            String SQL = String.format("INSERT INTO creditors (name, description, diamond_user_id, account_id) VALUES('%s', '%s', '%s', '%s') RETURNING id", creditorName, description, diamondUserId, accountId);
            Statement statement = conn.createStatement();
            ResultSet rs = statement.executeQuery(SQL);
            UUID debtorID = null;
            while(rs.next()){
                debtorID = UUID.fromString(rs.getString("id"));
            }
            System.out.println(debtorID);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    // ADD Creditor Transaction
    public void addCreditorsTransaction(Creditors creditor){
        func.breakDownDate(creditor.getDate());
        int dayBrokenDown = func.breakDownDate(creditor.getDate())[0];
        int monthBrokenDown = func.breakDownDate(creditor.getDate())[1];
        int yearBrokenDown = func.breakDownDate(creditor.getDate())[2];
        String []monthNames = {"Jan", "Feb", "Mar", "Apr","May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"};

        try {
            Statement statement = conn.createStatement();
            String SQL = String.format("INSERT INTO creditors_transaction(creditor_id, type, amount, details, date, day, month, month_name, year) VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')", creditor.getCreditorsID(), creditor.getType().toLowerCase(), (creditor.getType().equalsIgnoreCase("credit") ? creditor.getAmount() : creditor.getAmount() * -1), creditor.getDetails(), creditor.getDate(), dayBrokenDown, monthBrokenDown, monthNames[monthBrokenDown -1], yearBrokenDown);
            int rowsAffected = statement.executeUpdate(SQL);

            if (rowsAffected == 1) {
                System.out.println("Creditors Transaction Added Successfully");
                // Updates the Transaction Table if the creditor_transaction is debit: We are paying money out of account
                // This is done after the creditors_transaction has been added successfully
                if (creditor.getType().equals("debit")){
                    System.out.println("CREDIT - DEBTORS");
                    String SQL_TRANSACTION = String.format("INSERT INTO transaction (details, amount, transaction_type, user_id, account_id, date, day, month, month_name, year) VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')", "From Debtors: " + creditor.getDetails(), creditor.getAmount() * -1,  "debit", creditor.getDiamondUserID(), creditor.getAccountID(), func.dateFormatter(creditor.getDate()), dayBrokenDown, monthBrokenDown, monthNames[monthBrokenDown -1], yearBrokenDown);
                    int rowsAffectedTransaction = statement.executeUpdate(SQL_TRANSACTION);
                    if (rowsAffectedTransaction == 1) {
                        System.out.println("Creditor Transaction added to [Transaction] ");
                    }
                }
            }




        } catch (Exception e) {
            System.out.println("Creditor transaction was not added!");
            throw new RuntimeException(e);
        }
    }

    // GET CREDITOR BALANCE
//    public void getCreditorBalance(String creditorBalanceName, Creditors creditor) throws SQLException{
//        try {
//            String SQL = String.format("SELECT SUM(amount) AS creditor_balance FROM creditor WHERE user_id='%s' AND account_id='%s' AND creditor_name='%s' ", creditor.getUserId(), creditor.getAccountId(), creditorBalanceName);
//            Statement statement = conn.createStatement();
//            ResultSet resultSet = statement.executeQuery(SQL);
//            double creditorBalance = 0;
//            if(resultSet.next()){
//                creditorBalance = resultSet.getDouble("creditor_balance");
//            }
//
//            if(creditorBalance < 0){
//                System.out.println("Your Creditor ows you money: " + creditorBalance);
//            }
//
//            System.out.println(creditorBalance);
//
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
//    }
}
