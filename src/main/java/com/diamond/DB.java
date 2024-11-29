package com.diamond;

import java.sql.*;

public class DB {

    public Connection connectDB(String userName, String password, String host, int port, String dbName) throws SQLException {
        try {
            // Load the PostgreSQL driver
            Class.forName("org.postgresql.Driver"); // Corrected driver name

            String connectionString = String.format("jdbc:postgresql://%s:%d/%s", host, port, dbName); // Fixed connection string
            Connection conn = DriverManager.getConnection(connectionString, userName, password);
            transactionTableExists(conn); // Ensure the Zombie Table exists
            System.out.println("Connected to Diamond DB");
            return conn;
        } catch (Exception e) {
            System.out.println("Could not connect to Database: " + dbName);
            e.printStackTrace(); // Improved error logging
            return null;
        }
    }

    public void transactionTableExists(Connection conn) throws SQLException {
        try {
            DatabaseMetaData meta = conn.getMetaData();
            ResultSet resultSet = meta.getTables(null, null, "zombie", new String[]{"TABLE"});

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
                            year INT NULL,
                            transaction_timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP -- Adds timestamp with default current time
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
                System.out.println("Zombie table already exists.");
            }
        } catch (SQLException e) {
            System.out.println("Error checking zombie table existence: " + e.getMessage());
            throw e; // Rethrow exception for further handling
        }
    }
}
