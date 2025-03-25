package com.diamond.account;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.UUID;

public class Account {
    private Connection conn;
    private final UUID diamondUserId;
    private final String name;
    private final String description;

    public Account(Connection conn, UUID diamondUserId, String name, String description) {
        this.conn = conn;
        this.diamondUserId = diamondUserId;
        this.name = name;
        this.description = description;
    }

    public void createAccount() throws SQLException {
        try {
            String SQL = String.format("INSERT INTO account (name, description, diamond_user_id) VALUES ('%s', '%s', '%s') RETURNING id", name, description, diamondUserId);
            Statement statement = conn.createStatement();
            ResultSet resultSet = statement.executeQuery(SQL);
            UUID accountID =  null;
            while(resultSet.next()){
                accountID = UUID.fromString(resultSet.getString("id"));
            }

            System.out.println("Account Created Successfully: " + accountID);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
