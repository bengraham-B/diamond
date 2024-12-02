package com.diamond.creditors;

import java.util.UUID;

public class Creditor {
    private String id;
    private String type; // This is either credit or debit
    private String creditorName;
    private double amount;
    private String details;
    private UUID userId;
    private UUID accountId;
    private String date;

    private int day;
    private int month;
    private int year;

    public Creditor(String id, String type, String creditorName, double amount, String details, UUID userId, UUID accountId, String date, int day, int month, int year) {
        this.id = id;
        this.type = type;
        this.creditorName = creditorName;
        this.amount = amount;
        this.details = details;
        this.userId = userId;
        this.accountId = accountId;
        this.date = date;
        this.day = day;
        this.month = month;
        this.year = year;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCreditorName() {
        return creditorName;
    }

    public void setCreditorName(String creditor) {
        this.creditorName = creditor;
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

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID user_id) {
        this.userId = user_id;
    }

    public UUID getAccountId() {
        return accountId;
    }

    public void setAccountId(UUID account_id) {
        this.accountId = account_id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
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

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }
}
