package com.diamond;

import com.diamond.category.Category;
import com.diamond.category.CategoryFunc;
import com.diamond.creditors.Creditor;
import com.diamond.creditors.CreditorsFunc;
import com.diamond.debtors.Debtor;
import com.diamond.debtors.DebtorsFunc;
import com.diamond.transactions.Transaction;
import com.diamond.transactions.TransactionFunc;

import java.sql.Connection;
import java.sql.Date;
import java.sql.SQLException;
import java.util.UUID;

public class Main {
    public static void main(String[] args) throws SQLException {
        System.out.println("Hello world!");

        DB db = new DB();
        Connection conn = db.connectDB("ben", "silly", "localhost", 5441, "Diamond");

        UUID diamondUserID = UUID.fromString("1160ad8a-12cf-40da-a1f1-d8cc93beebe8");
        UUID accountID = UUID.fromString("ac001123-d9d6-44da-8b81-7ddf54f59699");
        UUID bossDebtorsID = UUID.fromString("aa2b11ce-b563-4b9d-9e53-9dc3aedb1eda");
        UUID bossCreditorID = UUID.fromString("a91f6c47-e916-49a6-a0cb-84de4a1f8501");
        UUID momDebtorID = UUID.fromString("f8c3bed6-92ec-441b-898d-ab2be615bf69");
        UUID RRSCategory = UUID.fromString("9875eae0-34ea-43aa-9299-470d0081e20b");


        // Transaction
//        Transaction transaction = new Transaction();
//        transaction.setAmount(54.00);
//        transaction.setTransactionType("debit");
//        transaction.setDate(Date.valueOf("2024-12-03"));  // YYYY - MM - DD
//        transaction.setDetails("RRS - 2 Drinks and a Choc bar");
//        transaction.setUserID(diamondUserID);
//        transaction.setAccountID(accountID);
//        TransactionFunc TF = new TransactionFunc(conn, transaction);
//        TF.insertTransaction(transaction);

//         // --- Creditor ---
//        Creditor creditor = new Creditor(diamondUserID, accountID, UUID.fromString("038472c0-d2a1-4854-b8cd-c8f8d7c6c4f7"),null, "debit", 36.99, "Food", Date.valueOf("2024-11-13"));
//        CreditorsFunc CF = new CreditorsFunc(conn);
//        CF.addCreditorsTransaction(creditor);

//        CF.createCreditor("Somerset Private", "Business Studies at Somerset Private", diamondUserID, accountID);

        DebtorsFunc DF = new DebtorsFunc(conn);
//        DF.createDebtor("Mom", "Transactions which the mom will refund me", UUID.fromString("1160ad8a-12cf-40da-a1f1-d8cc93beebe8"), UUID.fromString("ac001123-d9d6-44da-8b81-7ddf54f59699"));
        // Date -> YYYY - MM - DD
        Debtor debtors = new Debtor(diamondUserID, accountID, bossDebtorsID, null, "debit", 174.50, "Clothes", Date.valueOf("2024-11-15"));
        DF.addDebtorsTransaction(debtors);

        Balance B = new Balance(conn);
        B.detailedBalance(accountID);

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