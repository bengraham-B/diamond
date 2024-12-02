package com.diamond.debtors;

import com.diamond.functions.Functions;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.UUID;

public class DebtorsFunc {
    private Connection conn;

    Functions func = new Functions();

    public DebtorsFunc(Connection conn) {
        this.conn = conn;
    }

    //  -------------------- Create Debtor --------------------
    public void createDebtor(String debtorName, String description, UUID diamondUserId, UUID accountId) throws SQLException{
        try {
            String SQL = String.format("INSERT INTO debtors (name, description, diamond_user_id, account_id) VALUES('%s', '%s', '%s', '%s') RETURNING id", debtorName, description, diamondUserId, accountId);
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

    //  -------------------- ADD Debtor Transaction -- Requires Debtors Class --------------------
    public void addDebtorsTransaction(Debtors debtors) throws SQLException {

        try {
            int dayBrokenDown = func.breakDownDate(debtors.getDate())[0];
            int monthBrokenDown = func.breakDownDate(debtors.getDate())[1];
            int yearBrokenDown = func.breakDownDate(debtors.getDate())[2];
            String []monthNames = {"Jan", "Feb", "Mar", "Apr","May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"};

            String SQL = String.format("INSERT INTO debtors_transaction(debtor_id, type, amount, details, date, day, month, month_name, year) VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')", debtors.getDebtorsID(), debtors.getType().toLowerCase(), (debtors.getType().equalsIgnoreCase("debit") ? debtors.getAmount() : debtors.getAmount() * -1), debtors.getDetails(), debtors.getDate(), dayBrokenDown, monthBrokenDown, monthNames[monthBrokenDown -1], yearBrokenDown);
            Statement statement = conn.createStatement();
            int rowsAffected = statement.executeUpdate(SQL);
            System.out.println(rowsAffected);

            if (rowsAffected == 1){
                System.out.println("Debtors Transaction Added Successfully");

                // Updates the Transaction Table if the debtors_transaction is credit: We are receiving money into out account
                // This is done after the debtors_transaction has been added successfully
                if (debtors.getType().equals("credit")){
                    System.out.println("CREDIT - DEBTORS");
                    String SQL_TRANSACTION = String.format("INSERT INTO transaction (details, amount, transaction_type, user_id, account_id, date, day, month, month_name, year) VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')", "From Debtors: " + debtors.getDetails(), debtors.getAmount(),  "credit", debtors.getDiamondUserID(), debtors.getAccountID(), func.dateFormatter(debtors.getDate()), dayBrokenDown, monthBrokenDown, monthNames[monthBrokenDown -1], yearBrokenDown);
                    int rowsAffectedTransaction = statement.executeUpdate(SQL_TRANSACTION);
                    if (rowsAffectedTransaction == 1) {
                        System.out.println("Debtor Transaction added to [Transaction] ");
                    }

                }
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
