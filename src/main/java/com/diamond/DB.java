package com.diamond;

import java.sql.*;

public class DB {


    public Connection connectDB(String userName, String password, String host, int port, String dbName) throws SQLException {
        try {
            // Load the PostgreSQL driver
            Class.forName("org.postgresql.Driver"); // Corrected driver name

            String connectionString = String.format("jdbc:postgresql://%s:%d/%s", host, port, dbName); // Fixed connection string
            Connection conn = DriverManager.getConnection(connectionString, userName, password);

            // Checks that all the tables exist when ever a connection is made to the DB.
            DBTables DBT = new DBTables(conn);
            DBT.transactionTableExists(conn); // Ensure the Transaction Table exists
            DBT.creditorTableExists(conn); // Ensure the Creditor Table exists
            DBT.diamondUserTableExists(conn); // Ensure the User Table exists
            DBT.accountTableExists(conn); // Ensure the Account Table exists
            DBT.debtorsTableExists(conn); // Ensure the Debtors Table exists
            DBT.debtorsTransactionTable(conn); // Ensure the Debtors Transaction Table exists

            System.out.println("Connected to Diamond DB");
            return conn;
        } catch (Exception e) {
            System.out.println("Could not connect to Database: " + dbName);
            System.out.println(e);
            e.printStackTrace(); // Improved error logging
            return null;
        }
    }
}
