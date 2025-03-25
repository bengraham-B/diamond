package com.diamond.category;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.UUID;

public class CategoryFunc {
    private Connection conn;

    public CategoryFunc(Connection conn) {
        this.conn = conn;
    }

    // CREATE Category
    public void createCategory(Category category) throws SQLException {
        try {
            String SQL = String.format("INSERT INTO category(name, details, account_id) VALUES ('%s', '%s', '%s')", category.getName(), category.getDetails(), category.getAccount_id());
            Statement statement = conn.createStatement();
            int result = statement.executeUpdate(SQL);

            if (result == 1){
                System.out.println("Category created: " + category.getName());
                System.out.println("Category created ID: " + category.getId());
            } else {
                System.out.println("Could not create category created");
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    // GET User Categories -> include names of accounts

    // GET User Categories

}
