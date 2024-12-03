package com.diamond.debtors;

import java.sql.Connection;
import java.sql.Date;
import java.util.UUID;

public class Debtor {
    private UUID id;
    private UUID diamondUserID;
    private UUID accountID;
    private UUID debtorsID;
    private UUID categoryID;
    private String type;
    private double amount;
    private String details;
    private Date date;
    private int day;
    private int month;
    private String monthName;
    private int year;

    public Debtor(UUID diamondUserID, UUID accountID, UUID debtorsID, UUID categoryID, String type, double amount, String details, Date date) {
        this.diamondUserID = diamondUserID;
        this.accountID = accountID;
        this.debtorsID = debtorsID;
        this.categoryID = categoryID;
        this.type = type;
        this.amount = amount;
        this.details = details;
        this.date = date;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getDiamondUserID() {
        return diamondUserID;
    }

    public void setDiamondUserID(UUID diamondUserID) {
        this.diamondUserID = diamondUserID;
    }

    public UUID getAccountID() {
        return accountID;
    }

    public void setAccountID(UUID accountID) {
        this.accountID = accountID;
    }

    public UUID getDebtorsID() {
        return debtorsID;
    }

    public void setDebtorsID(UUID debtorsID) {
        this.debtorsID = debtorsID;
    }

    public UUID getCategoryID() {
        return categoryID;
    }

    public void setCategoryID(UUID categoryID) {
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
