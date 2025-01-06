package com.diamond.balance;

import com.diamond.creditors.Creditor;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class Balance {
    private final Connection conn;

    public Balance(Connection conn) {
        this.conn = conn;
    }

    private ReturnBalances mapRowReurnBalance(ResultSet rs, String balanceName) throws SQLException{
        return new ReturnBalances(
            rs.getString("name"),
            rs.getDouble(balanceName)
        );
    }

    // Detailed Balance
    public void detailedBalance(UUID accountID) throws SQLException{
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

    // GET balance per Debtors
    public void balancePerDebtors(UUID accountID) throws SQLException {
        System.out.println("==================== Debtors Balance ====================");
        try {
            String SQL = String.format(
                """
                    SELECT SUM(debtors_transaction.amount) AS debtor_balance, debtors.name AS debtors_name\s
                    FROM\s
                        debtors_transaction
                    JOIN
                    debtors ON debtors_transaction.debtor_id = debtors.id
                    WHERE\s
                        debtors_transaction.account_id='%S'
                    GROUP BY debtors.name;
                """,
                    accountID);

            Statement statement = conn.createStatement();
            ResultSet rs = statement.executeQuery(SQL);

            while(rs.next()){
                System.out.println(rs.getString("debtors_name") + ": R" + rs.getDouble("debtor_balance"));
            }
            System.out.println();

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    // GET balance per Creditors
    public List<ReturnBalances> balancePerCreditors(UUID accountID) throws SQLException {
        System.out.println("==================== Creditors Balance ====================");
        try {
            String SQL = String.format(
                """
                    SELECT SUM(creditors_transaction.amount) AS creditors_balance, creditors.name AS name\s
                    FROM\s
                        creditors_transaction
                    JOIN
                    creditors ON creditors_transaction.creditor_id = creditors.id
                    WHERE\s
                        creditors_transaction.account_id='%s'
                    GROUP BY creditors.name;
                """, accountID);

            Statement statement = conn.createStatement();
            ResultSet rs = statement.executeQuery(SQL);

            List<ReturnBalances> returnBalance = new ArrayList<>();



            ReturnBalances[] listOfCreditors = {};
            while (rs.next()){
                System.out.println(rs.getString("name") + ": R" +rs.getDouble("creditors_balance"));
                returnBalance.add((mapRowReurnBalance(rs, "creditors_balance")));
            }
            System.out.println();
            return returnBalance;

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    // Class which is used to return the balances as it only requires amount and name
    public class ReturnBalances{
        String name;
        double amount;

        public ReturnBalances(String name, double amount) {
            this.name = name;
            this.amount = amount;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public double getAmount() {
            return amount;
        }

        public void setAmount(double amount) {
            this.amount = amount;
        }
    }
}
