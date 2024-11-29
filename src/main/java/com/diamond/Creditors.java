package com.diamond;

import java.util.Date;
import java.util.UUID;

public class Creditors {
    private UUID id;
    private String type; // This is either credit or debit
    private String creditor;
    private double amount;
    private String details;
    private UUID user_id;
    private UUID account_id;
    private Date date;

    private int day;
    private int month;
    private int year;

    // Credit Transaction which Increases the Credit

    // Debit Transaction which Decreases the Credit
}
