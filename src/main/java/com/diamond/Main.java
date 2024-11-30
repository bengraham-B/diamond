package com.diamond;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.UUID;

public class Main {
    public static void main(String[] args) throws SQLException {
        System.out.println("Hello world!");

        DB db = new DB();
        Connection conn = db.connectDB("ben", "silly", "localhost", 5441, "Diamond");

        // Transaction
        Transaction transaction = new Transaction();
        transaction.setAmount(340);
        transaction.setDate("1-1-2001");
        transaction.setDay(1);
        transaction.setMonth(1);
        transaction.setYear(2001);
        transaction.setDetails("Testing the Transaction Class");
        transaction.setUserID(UUID.fromString("6b92f7f8-4d72-4ad7-abfb-8256ee9a1b50"));
        transaction.setAccountID(UUID.fromString("53d5389d-7d03-4872-a9f9-f0ef354d0878"));
        TransactionFunc TF = new TransactionFunc(conn, transaction);
        TF.insertTransaction(transaction);

        // Creditor
        Creditor creditor = new Creditor(null, "debit", "James", 400, "Bought a lot of bread - sour dough", UUID.fromString("6b92f7f8-4d72-4ad7-abfb-8256ee9a1b50"), UUID.fromString("53d5389d-7d03-4872-a9f9-f0ef354d0878"), "1-1-2001", 1, 1, 2001);
        CreditorsFunc CF = new CreditorsFunc(conn, creditor);
//        System.out.println(CF.addCreditorsTransaction());

        CF.getCreditorBalance("James");

    }
}