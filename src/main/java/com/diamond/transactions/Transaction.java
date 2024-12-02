package com.diamond.transactions;

import java.sql.Date;
import java.util.UUID;

public class Transaction {

    private String transactionID;
    private String details;
    private double amount;
    private String transactionType;
    private UUID userID;
    private UUID accountID;

    private Date date;
    private int day;
    private int month;
    private String monthName;
    private int year;

    // Default constructor <-- Add this so the post function works
    public Transaction() {

    }

    public Transaction(String transactionID, String details, double amount, String transactionType, UUID userID, UUID accountID, Date date, int day, int month, String monthName, int year) {
        this.transactionID = transactionID;
        this.details = details;
        this.amount = amount;
        this.transactionType = transactionType;
        this.userID = userID;
        this.accountID = accountID;
        this.date = date;
        this.day = day;
        this.month = month;
        this.monthName = monthName;
        this.year = year;
    }

    public String getTransactionID() {
        return transactionID;
    }

    public void setTransactionID(String transactionID) {
        this.transactionID = transactionID;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getTransactionType() {
        return transactionType;
    }

    public void setTransactionType(String transactionType) {
        this.transactionType = transactionType;
    }

    public UUID getUserID() {
        return userID;
    }

    public void setUserID(UUID userID) {
        this.userID = userID;
    }

    public UUID getAccountID() {
        return accountID;
    }

    public void setAccountID(UUID accountID) {
        this.accountID = accountID;
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

    public void setMonthName(String month) {
        this.monthName = monthName;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }
}
