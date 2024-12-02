package com.diamond;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.UUID;

public class DiamondUser {
    Connection conn;

     public DiamondUser(Connection conn){
         this.conn = conn;
     }

    // Create a new User
    public UUID createDiamondUser(String name){
        try {
            String SQL = String.format("INSERT INTO diamond_user (name) VALUES ('%s') RETURNING id", name);
            Statement statement = conn.createStatement();
            ResultSet resultSet = statement.executeQuery(SQL);
            String diamondUserID = null;
            while(resultSet.next()){
                diamondUserID = resultSet.getString("id");
            }

            if (diamondUserID != null){
                return UUID.fromString(diamondUserID);
            }

            return null;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    // Create a new Account
//    public UUID createAccount(UUID userID, String accountName, String accountDesc){
//        try {
//            String SQL = String.format("INSERT INTO account (user_id, name, desc) VALUES ('%s', '%s', '%s')", userID, accountName, accountDesc);
//            Statement statement = conn.createStatement();
//
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
//    }

    // Create a new Creditor
//    public UUID createCreditor(UUID userId, String creditorName, String desc){
//        try {
//            String SQL = String.format("INSERT INTO creditors (user_id, name, desc) VALUES ('%s', '%s', '%s')", userId, creditorName, desc);
//            Statement statement = conn.createStatement();
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
//    }

//    public UUID createDebtor(UUID userId, String creditorName, String desc){
//        try {
//            String SQL = String.format("INSERT INTO creditors (user_id, name, desc) VALUES ('%s', '%s', '%s')", userId, creditorName, desc);
//            Statement statement = conn.createStatement();
//        } catch (Exception e) {
//            throw new RuntimeException(e);
//        }
//    }


}
