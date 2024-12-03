package com.diamond;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.UUID;

public class Balance {
    private final Connection conn;

    public Balance(Connection conn) {
        this.conn = conn;
    }

    // Detailed Balance
    public void detailedBalance(UUID accountID){
        try {
            String SQL = String.format(
                """
                 SELECT\s
                  (SELECT SUM(amount) FROM transaction WHERE account_id::UUID = '%s') AS transaction_sum,
                  (SELECT SUM(amount) FROM debtors_transaction WHERE account_id::UUID = '%s') AS debtors_sum,
                  (SELECT SUM(amount) FROM creditors_transaction WHERE account_id::UUID = '%s') AS creditors_sum;
                 \s""", accountID, accountID, accountID);

            Statement statement = conn.createStatement();
            ResultSet rs = statement.executeQuery(SQL);
            double transactionBalance = 0;
            double debtorsBalance = 0;
            double creditorsBalance = 0;
            while(rs.next()){
                transactionBalance = rs.getDouble("transaction_sum");
                debtorsBalance = rs.getDouble("debtors_sum");
                creditorsBalance = rs.getDouble("creditors_sum");
            }

            System.out.println();
            System.out.println("-------------------- Detailed Balance -----------------------------");
            System.out.println("Total Transaction : R" + transactionBalance);
            System.out.println("Total Debtors     : R" + debtorsBalance);
            System.out.println("Total Creditors   : R" + creditorsBalance);
//            System.out.println("Balance           : R" + (transactionBalance +debtorsBalance - creditorsBalance ));
            System.out.println("-------------------------------------------------------------------");
            System.out.println();


        } catch (Exception e) {
            System.out.println("Could not get Detailed Balance");
            System.out.println(e);
            throw new RuntimeException(e);
        }
    }
}
