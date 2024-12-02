package com.diamond.creditors;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Objects;

public class CreditorsFunc {
    private Creditor creditor;
    private Connection conn;

    public CreditorsFunc(Connection conn, Creditor creditor){
        this.conn = conn;
        this.creditor = creditor;
    }



    // Credit Transaction
    public String addCreditorsTransaction(){
        try {
            Statement statement = conn.createStatement();
            String SQL = String.format("INSERT INTO creditor (type, creditor_name, amount, details, user_id, account_id, date, day, month, year) VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s') RETURNING id", creditor.getType() ,creditor.getCreditorName(), Objects.equals(creditor.getType(), "debit") ? creditor.getAmount() * -1 : creditor.getAmount(), creditor.getDetails(), creditor.getUserId(), creditor.getAccountId(), creditor.getDate(), creditor.getDay(), creditor.getMonth(), creditor.getYear());
            ResultSet resultSet = statement.executeQuery(SQL);
            System.out.println("Creditor transaction added Successfully");
            String creditor_id = null;
            while (resultSet.next()){
                creditor_id =  resultSet.getString("id");
            }

            return creditor_id;

        } catch (Exception e) {
            System.out.println("Creditor transaction was not added!");
            throw new RuntimeException(e);
        }
    }

    // GET CREDITOR BALANCE
    public void getCreditorBalance(String creditorBalanceName){
        try {
            String SQL = String.format("SELECT SUM(amount) AS creditor_balance FROM creditor WHERE user_id='%s' AND account_id='%s' AND creditor_name='%s' ", creditor.getUserId(), creditor.getAccountId(), creditorBalanceName);
            Statement statement = conn.createStatement();
            ResultSet resultSet = statement.executeQuery(SQL);
            double creditorBalance = 0;
            if(resultSet.next()){
                creditorBalance = resultSet.getDouble("creditor_balance");
            }

            if(creditorBalance < 0){
                System.out.println("Your Creditor ows you money: " + creditorBalance);

            }

            System.out.println(creditorBalance);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
