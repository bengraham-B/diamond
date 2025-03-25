package com.diamond.creditors;

import com.diamond.functions.Functions;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class CreditorsFunc {
    private final Connection conn;
    Functions func = new Functions();

    public CreditorsFunc(Connection conn) {
        this.conn = conn;
    }

    // CREATE Creditor
    public void createCreditor(String creditorName, String description, UUID diamondUserId, UUID accountId) throws SQLException {
        String SQL = "INSERT INTO creditors (name, description, diamond_user_id, account_id) VALUES(?, ?, ?, ?) RETURNING id";
        try (PreparedStatement preparedStatement = conn.prepareStatement(SQL)) {
            preparedStatement.setString(1, creditorName);
            preparedStatement.setString(2, description);
            preparedStatement.setObject(3, diamondUserId);
            preparedStatement.setObject(4, accountId);

            try (ResultSet rs = preparedStatement.executeQuery()) {
                if (rs.next()) {
                    UUID debtorID = UUID.fromString(rs.getString("id"));
                    System.out.println(debtorID);
                }
            }
        }
    }

    // ADD Creditor Transaction
    public void addCreditorsTransaction(Creditor creditor) {
        int[] dateParts = func.breakDownDate(creditor.getDate());
        int day = dateParts[0], month = dateParts[1], year = dateParts[2];
        String[] monthNames = {"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"};

        String SQL = "INSERT INTO creditors_transaction(creditor_id, account_id, type, amount, details, date, day, month, month_name, year) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        try (PreparedStatement preparedStatement = conn.prepareStatement(SQL)) {
            preparedStatement.setObject(1, creditor.getCreditorsID());
            preparedStatement.setObject(2, creditor.getAccountID());
            preparedStatement.setString(3, creditor.getType().toLowerCase());
            preparedStatement.setDouble(4, creditor.getAmount());
            preparedStatement.setString(5, creditor.getDetails());
            preparedStatement.setDate(6, creditor.getDate());
            preparedStatement.setInt(7, day);
            preparedStatement.setInt(8, month);
            preparedStatement.setString(9, monthNames[month - 1]);
            preparedStatement.setInt(10, year);

            int rowsAffected = preparedStatement.executeUpdate();
            if (rowsAffected == 1) {
                System.out.println("Creditors Transaction Added Successfully");
            }
        } catch (Exception e) {
            System.out.println("Creditor transaction was not added!");
            throw new RuntimeException(e);
        }
    }

    // Map ResultSet to Creditor
    private Creditor CreditorTransactionRowMapper(ResultSet rs) throws SQLException {
        return new Creditor(
                rs.getString("id"),
                rs.getString("account_id"),
                rs.getString("creditor_id"),
                rs.getString("category_id"),
                rs.getString("type"),
                rs.getDouble("amount"),
                rs.getString("details"),
                rs.getDate("date")
        );
    }

    // Get Credit Transactions For Creditor
    public List<Creditor> creditTransactions(String creditorID) throws SQLException {
        String SQL = "SELECT * FROM creditors_transaction WHERE creditor_id = CAST(? AS UUID) ORDER BY date DESC";
        List<Creditor> creditorsTransaction = new ArrayList<>();

        try (PreparedStatement preparedStatement = conn.prepareStatement(SQL)) {
            preparedStatement.setString(1, creditorID);
            try (ResultSet rs = preparedStatement.executeQuery()) {
                while (rs.next()) {
                    creditorsTransaction.add(CreditorTransactionRowMapper(rs));
                }
            }
        }
        return creditorsTransaction;
    }

    // Creditor Outstanding Balance Helper Class
    private static class CreditorsOutstandingBalance {
        private final double totalDebit;
        private final double totalCredit;

        public CreditorsOutstandingBalance(double totalDebit, double totalCredit) {
            this.totalDebit = totalDebit;
            this.totalCredit = totalCredit;
        }

        public double getTotalDebit() {
            return totalDebit;
        }

        public double getTotalCredit() {
            return totalCredit;
        }

        public double getOutstandingBalance() {
            return totalCredit - totalDebit;
        }
    }

    // Map ResultSet to CreditorsOutstandingBalance
    private CreditorsOutstandingBalance CreditorBalanceRowMapper(ResultSet rs) throws SQLException {
        return new CreditorsOutstandingBalance(
                rs.getDouble("total_debit"),
                rs.getDouble("total_credit")
        );
    }

    // Get Creditor Outstanding Balance
    public double CreditorBalance(String creditorID) throws SQLException {
        String SQL = "SELECT " +
                "SUM(CASE WHEN type = 'credit' THEN amount ELSE 0 END) AS total_credit, " +
                "SUM(CASE WHEN type = 'debit' THEN amount ELSE 0 END) AS total_debit " +
                "FROM creditors_transaction " +
                "WHERE creditor_id = CAST(? AS UUID)";

        try (PreparedStatement preparedStatement = conn.prepareStatement(SQL)) {
            preparedStatement.setString(1, creditorID);
            try (ResultSet rs = preparedStatement.executeQuery()) {
                if (rs.next()) {
                    CreditorsOutstandingBalance balance = CreditorBalanceRowMapper(rs);
                    double outstandingBalance = balance.getOutstandingBalance();
                    System.out.println("Creditor ID: " + creditorID);
                    System.out.println("Total Credit: " + balance.getTotalCredit() + "  Amount Owed.");
                    System.out.println("Total Debit: " + balance.getTotalDebit() + "  Amount Repaid.");
                    System.out.println("Outstanding Balance: " + outstandingBalance);

                    return balance.getOutstandingBalance();
                }
            }
        }
        return 0; // Default to 0 if no transactions found
    }

}
