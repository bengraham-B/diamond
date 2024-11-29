package com.diamond;

import java.sql.Connection;
import java.sql.SQLException;

public class Main {
    public static void main(String[] args) throws SQLException {
        System.out.println("Hello world!");

        DB db = new DB();
        Connection conn = db.connectDB("ben", "silly", "localhost", 5441, "Diamond");
    }
}