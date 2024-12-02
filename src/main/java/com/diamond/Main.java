package com.diamond;

import com.diamond.debtors.Debtors;
import com.diamond.debtors.DebtorsFunc;

import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;
import java.util.UUID;

public class Main {
    public static void main(String[] args) throws SQLException {
        System.out.println("Hello world!");

        DB db = new DB();
        Connection conn = db.connectDB("ben", "silly", "localhost", 5441, "Diamond");
//
        // Transaction
//        Transaction transaction = new Transaction();
//        transaction.setAmount(19.99);
//        transaction.setDate(Date.valueOf("2024-12-02"));  // YYYY - MM - DD
//        transaction.setDetails("Iced Coffee Spar");
//        transaction.setUserID(UUID.fromString("1160ad8a-12cf-40da-a1f1-d8cc93beebe8"));
//        transaction.setAccountID(UUID.fromString("ac001123-d9d6-44da-8b81-7ddf54f59699"));
//        TransactionFunc TF = new TransactionFunc(conn, transaction);
//        TF.insertTransaction(transaction);

        // Creditor
//        Creditor creditor = new Creditor(null, "debit", "James", 400, "Bought a lot of bread - sour dough", UUID.fromString("6b92f7f8-4d72-4ad7-abfb-8256ee9a1b50"), UUID.fromString("53d5389d-7d03-4872-a9f9-f0ef354d0878"), "1-1-2001", 1, 1, 2001);
//        CreditorsFunc CF = new CreditorsFunc(conn, creditor);
//        System.out.println(CF.addCreditorsTransaction());

//        CF.getCreditorBalance("James");

        // User
//        DiamondUser diamondUser = new DiamondUser(conn);
//        UUID ID = diamondUser.createDiamondUser("D");
//        System.out.println(ID);

        // Account
//        UUID diamondUserId = UUID.fromString("1160ad8a-12cf-40da-a1f1-d8cc93beebe8");
//        String uuidString = "1160ad8a-12cf-40da-a1f1-d8cc93beebe8"; // Ensure this is a valid UUID string
//        if (uuidString != null && !uuidString.isEmpty()) {
//            UUID uuid = UUID.fromString(uuidString);
//            System.out.println("Valid UUID");
//        } else {
//            System.out.println("Invalid UUID string provided.");
//        }
//        Account acc = new Account(conn, diamondUserId, "Main", "Main account for Ben");
//        acc.createAccount();


        DebtorsFunc DF = new DebtorsFunc(conn);
//        DF.createDebtor("Mom", "Transactions which the mom will refund me", UUID.fromString("1160ad8a-12cf-40da-a1f1-d8cc93beebe8"), UUID.fromString("ac001123-d9d6-44da-8b81-7ddf54f59699"));
        // Date -> YYYY - MM - DD
        Debtors debtors = new Debtors(UUID.fromString("aa2b11ce-b563-4b9d-9e53-9dc3aedb1eda"), "debit",22.99, "Bought White bread from Spar", Date.valueOf("2024-12-02"));
        DF.addDebtorsTransaction(debtors);

    }
}