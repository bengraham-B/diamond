package com.diamond.debtors;

import java.sql.Connection;
import java.sql.Date;
import java.util.UUID;

public class Debtors {
    private Connection conn;
    private UUID debtorsID;
    private String type;
    private double amount;
    private String details;
    private Date date;
    private int day;
    private int month;
    private String monthName;
    private int year;

    public Debtors(UUID debtorsID, String type, double amount, String details, Date date) {
        this.conn = conn;
        this.debtorsID = debtorsID;
        this.type = type;
        this.amount = amount;
        this.details = details;
        this.date = date;
    }

    public UUID getDebtorsID() {
        return debtorsID;
    }

    public void setDebtorsID(UUID debtorsID) {
        this.debtorsID = debtorsID;
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
