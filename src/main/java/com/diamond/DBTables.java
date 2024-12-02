package com.diamond;

import java.sql.*;

public class DBTables {
    Connection conn;

    public DBTables(Connection conn) {
        this.conn = conn;
    }

    // This class contains the DB tables which are required to run Diamond
    // - It will create the tables if they do not exist

    public void transactionTableExists(Connection conn) throws SQLException {
        try {
            DatabaseMetaData meta = conn.getMetaData();
            ResultSet resultSet = meta.getTables(null, null, "transaction", new String[]{"TABLE"});

            if (!resultSet.next()) {
                String SQL_zombie_table = """
                        CREATE TABLE transaction (
                            transaction_id uuid NOT NULL DEFAULT gen_random_uuid (),
                            details text NULL,
                            amount numeric(10, 2) NULL,
                            user_id TEXT NULL,
                            account_id TEXT NULL,
                            transaction_type character varying(10) NULL,
                            transaction_date DATE NULL,
                            date DATE NULL,
                            day INT NULL,
                            month INT NULL,
                            month_name TEXT NULL,
                            year INT NULL,
                            timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP -- Adds timestamp with default current time
                          );
                        """;

                try (Statement statement = conn.createStatement()) {
                    statement.executeUpdate(SQL_zombie_table); // Use executeUpdate for DDL statements
                    System.out.println("Transaction table successfully created.");
                } catch (SQLException e) {
                    System.out.println("Error creating transaction table: " + e.getMessage());
                    throw e; // Rethrow exception for further handling
                }
            } else {
                System.out.println("Transaction table already exists.");
            }
        } catch (SQLException e) {
            System.out.println("Error checking transaction table existence: " + e.getMessage());
            throw e; // Rethrow exception for further handling
        }
    }

    public void creditorTableExists(Connection conn) throws SQLException {
        try {
            DatabaseMetaData meta = conn.getMetaData();
            ResultSet resultSet = meta.getTables(null, null, "creditors", new String[]{"TABLE"});

            if (!resultSet.next()) {
                String SQL_transaction_table = """
                        CREATE TABLE creditors(
                            id UUID NOT NULL DEFAULT gen_random_uuid (),
                            diamond_user_id UUID,
                           account_id UUID,
                           name TEXT,
                           description TEXT,
                            timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP -- Adds timestamp with default current time
                        )
                        """;

                try (Statement statement = conn.createStatement()) {
                    statement.executeUpdate(SQL_transaction_table); // Use executeUpdate for DDL statements
                    System.out.println("Creditor table successfully created.");
                } catch (SQLException e) {
                    System.out.println("Error creating creditor table: " + e.getMessage());
                    throw e; // Rethrow exception for further handling
                }
            } else {
                System.out.println("Creditor table already exists.");
            }
        } catch (SQLException e) {
            System.out.println("Error checking creditor table existence: " + e.getMessage());
            throw e; // Rethrow exception for further handling
        }
    }

    public void creditorTransactionTable(Connection conn) throws SQLException{
        try {
            DatabaseMetaData meta = conn.getMetaData();
            ResultSet resultSet = meta.getTables(null, null, "creditors_transaction", new String[]{"TABLE"});

            if (!resultSet.next()) {
                String SQL_debtors_transaction_table = """
                       CREATE TABLE creditors_transaction(
                            id UUID NOT NULL DEFAULT gen_random_uuid(),
                            creditor_id UUID,
                            type TEXT,
                            amount FLOAT,
                            details TEXT,
                            date DATE,
                            day INT,
                            month INT,
                            month_name TEXT,
                            year INT,
                            timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
                        )
                       \s""";

                try (Statement statement = conn.createStatement()) {
                    statement.executeUpdate(SQL_debtors_transaction_table); // Use executeUpdate for DDL statements
                    System.out.println("creditors_transaction table successfully created.");
                } catch (SQLException e) {
                    System.out.println("Error creating creditors_transaction table: " + e.getMessage());
                    throw e; // Rethrow exception for further handling
                }
            } else {
                System.out.println("creditors_transaction table already exists.");
            }
        } catch (SQLException e) {
            System.out.println("Error checking creditors_transaction table existence: " + e.getMessage());
            throw e; // Rethrow exception for further handling
        }

    }

    public void accountTableExists(Connection conn) throws  SQLException{
        try {
            DatabaseMetaData meta = conn.getMetaData();
            ResultSet resultSet = meta.getTables(null, null, "diamond_user", new String[]{"TABLE"});

            if (!resultSet.next()) {
                String SQL_diamond_user_table = """
                        CREATE TABLE diamond_user(
                          id UUID NOT NULL DEFAULT gen_random_uuid (),
                          name TEXT,
                          timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP -- Adds timestamp with default current time
                        )
                        """;

                try (Statement statement = conn.createStatement()) {
                    statement.executeUpdate(SQL_diamond_user_table); // Use executeUpdate for DDL statements
                    System.out.println("User table successfully created.");
                } catch (SQLException e) {
                    System.out.println("Error creating diamond_user table: " + e.getMessage());
                    throw e; // Rethrow exception for further handling
                }
            } else {
                System.out.println("diamond_user table already exists.");
            }
        } catch (SQLException e) {
            System.out.println("Error checking creditor table existence: " + e.getMessage());
            throw e; // Rethrow exception for further handling
        }

    }

    public void diamondUserTableExists(Connection conn) throws  SQLException{
        try {
            DatabaseMetaData meta = conn.getMetaData();
            ResultSet resultSet = meta.getTables(null, null, "account", new String[]{"TABLE"});

            if (!resultSet.next()) {
                String SQL_account_table = """
                        CREATE TABLE account(
                          id UUID NOT NULL DEFAULT gen_random_uuid(),
                          diamond_user_id UUID,
                          name TEXT,
                          description TEXT,
                          timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
                        )
                        """;

                try (Statement statement = conn.createStatement()) {
                    statement.executeUpdate(SQL_account_table); // Use executeUpdate for DDL statements
                    System.out.println("Account table successfully created.");
                } catch (SQLException e) {
                    System.out.println("Error creating account table: " + e.getMessage());
                    throw e; // Rethrow exception for further handling
                }
            } else {
                System.out.println("account table already exists.");
            }
        } catch (SQLException e) {
            System.out.println("Error checking account table existence: " + e.getMessage());
            throw e; // Rethrow exception for further handling
        }

    }


    public void debtorsTableExists(Connection conn) throws  SQLException{
        try {
            DatabaseMetaData meta = conn.getMetaData();
            ResultSet resultSet = meta.getTables(null, null, "debtors", new String[]{"TABLE"});

            if (!resultSet.next()) {
                String SQL_debtors_table = """
                        CREATE TABLE debtors(
                          id UUID NOT NULL DEFAULT gen_random_uuid(),
                          name TEXT,
                          description TEXT,
                          account_id UUID,
                          diamond_user_id UUID,
                          timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
                        )
                        """;

                try (Statement statement = conn.createStatement()) {
                    statement.executeUpdate(SQL_debtors_table); // Use executeUpdate for DDL statements
                    System.out.println("debtors table successfully created.");
                } catch (SQLException e) {
                    System.out.println("Error creating debtors table: " + e.getMessage());
                    throw e; // Rethrow exception for further handling
                }
            } else {
                System.out.println("debtors table already exists.");
            }
        } catch (SQLException e) {
            System.out.println("Error checking debtors table existence: " + e.getMessage());
            throw e; // Rethrow exception for further handling
        }

    }

    public void debtorsTransactionTable(Connection conn) throws SQLException{
        try {
            DatabaseMetaData meta = conn.getMetaData();
            ResultSet resultSet = meta.getTables(null, null, "debtors_transaction", new String[]{"TABLE"});

            if (!resultSet.next()) {
                String SQL_debtors_transaction_table = """
                       CREATE TABLE debtors_transaction(
                            id UUID NOT NULL DEFAULT gen_random_uuid(),
                            debtor_id UUID,
                            type TEXT,
                            amount FLOAT,
                            details TEXT,
                            date DATE,
                            day INT,
                            month INT,
                            month_name TEXT,
                            year INT,
                            timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
                        )
                       \s""";

                try (Statement statement = conn.createStatement()) {
                    statement.executeUpdate(SQL_debtors_transaction_table); // Use executeUpdate for DDL statements
                    System.out.println("debtors_transaction table successfully created.");
                } catch (SQLException e) {
                    System.out.println("Error creating debtors_transaction table: " + e.getMessage());
                    throw e; // Rethrow exception for further handling
                }
            } else {
                System.out.println("debtors_transaction table already exists.");
            }
        } catch (SQLException e) {
            System.out.println("Error checking debtors_transaction table existence: " + e.getMessage());
            throw e; // Rethrow exception for further handling
        }

    }
}
