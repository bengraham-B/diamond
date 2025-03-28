package com.diamond;

import com.diamond.balance.Balance;
import com.diamond.creditors.Creditor;
import com.diamond.creditors.CreditorsFunc;
import com.diamond.debtors.Debtor;
import com.diamond.debtors.DebtorsFunc;
import com.diamond.transactions.Transaction;
import com.diamond.transactions.TransactionFunc;

import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;
import java.util.List;
import java.util.UUID;

public class Main {
    public static void main(String[] args) throws SQLException {
        System.out.println("Hello world!");

        DB db = new DB();
        Connection conn = db.connectDB("ben", "silly", "localhost", 5441, "Diamond");

        String diamondUserID = "1160ad8a-12cf-40da-a1f1-d8cc93beebe8";
        String accountID = ("ac001123-d9d6-44da-8b81-7ddf54f59699");
        UUID bossDebtorsID = UUID.fromString("aa2b11ce-b563-4b9d-9e53-9dc3aedb1eda");
        String bossCreditorID = ("a91f6c47-e916-49a6-a0cb-84de4a1f8501");
        String houseHolderCreditorID = ("038472c0-d2a1-4854-b8cd-c8f8d7c6c4f7");
        UUID momDebtorID = UUID.fromString("f8c3bed6-92ec-441b-898d-ab2be615bf69");
        UUID RRSCategory = UUID.fromString("9875eae0-34ea-43aa-9299-470d0081e20b");

        String AEGrahamID_Creditor = "af26cd21-0db5-4889-91b0-b2b011de63ae";

        CreditorsFunc CF = new CreditorsFunc(conn);
        CF.CreditorBalance(houseHolderCreditorID);


        // =========================================== Create Account ===========================================


        // =========================================== Transaction ===========================================
//        Transaction transaction = new Transaction("", "", "", "", "", "", "");
//        TransactionFunc transactionFunc = new TransactionFunc(conn);
//        List<Transaction> transactionList = transactionFunc.getTransactions("ac001123-d9d6-44da-8b81-7ddf54f59699");
////           for(int i = 0; i < transactionList.size(); i++){
////               System.out.println(transactionList.get(i));
////       }
//
//        transactionList.forEach(System.out::println);

//        try {
//            // Retrieve the list of transactions for the specified account
//            List<Transaction> transactionList = transactionFunc.getTransactions("ac001123-d9d6-44da-8b81-7ddf54f59699");
//
//            // Print each transaction using the overridden toString method
////            transactionList.forEach(System.out::println);
//        } catch (SQLException e) {
//            System.err.println("Error fetching transactions: " + e.getMessage());
//        }


//        transaction.setAmount(260);
//        transaction.setDetails("Rooiels - Eating out");
//        transaction.setTransactionType("debit");
//        transaction.setDate(Date.valueOf("2024-12-26"));  // YYYY - MM - DD
//        transaction.setUserID(diamondUserID);
//        transaction.setAccountID(accountID);
//        TransactionFunc TF = new TransactionFunc(conn, transaction);
//        TF.insertTransaction(transaction);

         // --- Creditor ---
//        Creditor creditor = new Creditor(diamondUserID, accountID, "0356b70d-c02f-4022-a14a-6ea2df25c537",null, "debit", 2300, "Pocket Money - Dad", Date.valueOf("2025-01-01"));
//        CreditorsFunc CF = new CreditorsFunc(conn);
//        CF.addCreditorsTransaction(creditor);

//        CF.createCreditor("A.E Graham", "Money I owe to the boss from 2025", UUID.fromString(diamondUserID), UUID.fromString(accountID));

////         Date -> YYYY - MM - DD
//        DebtorsFunc DF = new DebtorsFunc(conn);
//        Debtor debtors = new Debtor(diamondUserID, accountID, momDebtorID, null, "debit", 179.50, "Business Studies TextBook", Date.valueOf("2024-12-27"));
//        DF.addDebtorsTransaction(debtors);
//
//        DF.createDebtor("Mom", "Transactions which the mom will refund me", UUID.fromString("1160ad8a-12cf-40da-a1f1-d8cc93beebe8"), UUID.fromString("ac001123-d9d6-44da-8b81-7ddf54f59699"));

//        Balance B = new Balance(conn);
//        B.detailedBalance(UUID.fromString(accountID));
//        Balance.ReturnBalances returnBalances = new Balance.ReturnBalances();
//        System.out.println(" ------ New Creditors Balance ----");
//        List<Balance.ReturnBalances> creditorsBalances = B.balancePerCreditors(accountID);
//        for (Balance.ReturnBalances balance : creditorsBalances) {
//            System.out.println(balance);
//        }

//        System.out.println(" ------ New Creditors Transactions ----");
//        CreditorsFunc cf = new CreditorsFunc(conn);
//        List<Creditor> creditorsTransaction = cf.creditTransactions("0356b70d-c02f-4022-a14a-6ea2df25c537");
//        for (Creditor creditor : creditorsTransaction) {
//            System.out.println(creditor.getDetails() + ": " + creditor.getAmount());
//        }

//        B.balancePerDebtors(accountID);

//        Category cat = new Category("RRS", "Money spent at RRS", accountID);
//        CategoryFunc CatFunc = new CategoryFunc(conn);
//        CatFunc.createCategory(cat);

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

    }
}