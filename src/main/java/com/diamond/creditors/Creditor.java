package com.diamond.creditors;

import java.sql.Connection;
import java.sql.Date;
import java.util.UUID;

public class Creditor {
    private String id;
    private String diamondUserID;
    private String accountID;
    private String creditorsID;
    private String categoryID;
    private String type;
    private double amount;
    private String details;
    private Date date;
    private int day;
    private int month;
    private String monthName;
    private int year;

    public Creditor (String id, String accountID, String creditorsID, String categoryID, String type, double amount, String details, Date date) {
        this.id = id;
        this.accountID = accountID;
        this.creditorsID = creditorsID;
        this.categoryID = categoryID;
        this.type = type;
        this.amount = amount;
        this.details = details;
        this.date = date;
    }

    public Creditor(){

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAccountID() {
        return accountID;
    }

    public void setAccountID(String accountID) {
        this.accountID = accountID;
    }


    public String getCreditorsID() {
        return creditorsID;
    }

    public void setCreditorsID(String creditorsID) {
        this.creditorsID = creditorsID;
    }

    public String getCategoryID() {
        return categoryID;
    }

    public void setCategoryID(String categoryID) {
        this.categoryID = categoryID;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public String getMonthName() {
        return monthName;
    }

    public void setMonthName(String monthName) {
        this.monthName = monthName;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }
}
