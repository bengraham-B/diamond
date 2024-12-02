package com.diamond.creditors;

import java.sql.Connection;
import java.sql.Date;
import java.util.UUID;

public class Creditors {
    private UUID diamondUserID;
    private UUID accountID;
    private UUID creditorsID;
    private String type;
    private double amount;
    private String details;
    private Date date;
    private int day;
    private int month;
    private String monthName;
    private int year;

    public Creditors (UUID diamondUserID, UUID accountID, UUID creditorsID, String type, double amount, String details, Date date) {
        this.diamondUserID = diamondUserID;
        this.accountID = accountID;
        this.creditorsID = creditorsID;
        this.type = type;
        this.amount = amount;
        this.details = details;
        this.date = date;
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


    public UUID getCreditorsID() {
        return creditorsID;
    }

    public void setCreditorsID(UUID creditorsID) {
        this.creditorsID = creditorsID;
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
