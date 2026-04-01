package com.app.diamond_core.Model;

import java.util.Date;
import java.util.UUID;

public class DiamondTransactionModel {
    public UUID DIAMOND_TRANSACTION_ID;
    public UUID ACCOUNT_ID;

    public double AMOUNT;
    public String DETAILS;
    public String TXN_TYPE; // INCOME | EXPENSE | INCREASE | DECREASE
    public String SOURCE; // CASH | CREDIT_CARD
    public UUID GL_ACCOUNT_ID;
    public String GL_ACCOUNT_NAME;
    public String GL_ACCOUNT_TYPE;
    public UUID MERCHANT_ID;
    public String MERCHANT_NAME;
    public boolean RECEIVABLE;
    public UUID DEBTOR_ID;
    public Date DATE;
    public int DAY;
    public String DAY_OF_WEEK;
    public int DAY_OF_YEAR;
    public int WEEK;
    public int MONTH;
    public int YEAR;

    public String getGL_ACCOUNT_NAME() {
        return GL_ACCOUNT_NAME;
    }

    public void setGL_ACCOUNT_NAME(String GL_ACCOUNT_NAME) {
        this.GL_ACCOUNT_NAME = GL_ACCOUNT_NAME;
    }

    public String getGL_ACCOUNT_TYPE() {
        return GL_ACCOUNT_TYPE;
    }

    public void setGL_ACCOUNT_TYPE(String GL_ACCOUNT_TYPE) {
        this.GL_ACCOUNT_TYPE = GL_ACCOUNT_TYPE;
    }

    public String getMERCHANT_NAME() {
        return MERCHANT_NAME;
    }

    public void setMERCHANT_NAME(String MERCHANT_NAME) {
        this.MERCHANT_NAME = MERCHANT_NAME;
    }


    public UUID getDIAMOND_TRANSACTION_ID() {
        return DIAMOND_TRANSACTION_ID;
    }

    public void setDIAMOND_TRANSACTION_ID(UUID DIAMOND_TRANSACTION_ID) {
        this.DIAMOND_TRANSACTION_ID = DIAMOND_TRANSACTION_ID;
    }

    public UUID getACCOUNT_ID() {
        return ACCOUNT_ID;
    }

    public void setACCOUNT_ID(UUID ACCOUNT_ID) {
        this.ACCOUNT_ID = ACCOUNT_ID;
    }

    public double getAMOUNT() {
        return AMOUNT;
    }

    public void setAMOUNT(double AMOUNT) {
        this.AMOUNT = AMOUNT;
    }

    public String getDETAILS() {
        return DETAILS;
    }

    public void setDETAILS(String DETAILS) {
        this.DETAILS = DETAILS;
    }

    public String getTXN_TYPE() {
        return TXN_TYPE;
    }

    public void setTXN_TYPE(String TXN_TYPE) {
        this.TXN_TYPE = TXN_TYPE;
    }

    public String getSOURCE() {
        return SOURCE;
    }

    public void setSOURCE(String SOURCE) {
        this.SOURCE = SOURCE;
    }

    public UUID getGL_ACCOUNT_ID() {
        return GL_ACCOUNT_ID;
    }

    public void setGL_ACCOUNT_ID(UUID GL_ACCOUNT_ID) {
        this.GL_ACCOUNT_ID = GL_ACCOUNT_ID;
    }

    public UUID getMERCHANT_ID() {
        return MERCHANT_ID;
    }

    public void setMERCHANT_ID(UUID MERCHANT_ID) {
        this.MERCHANT_ID = MERCHANT_ID;
    }

    public boolean isRECEIVABLE() {
        return RECEIVABLE;
    }

    public void setRECEIVABLE(boolean RECEIVABLE) {
        this.RECEIVABLE = RECEIVABLE;
    }

    public UUID getDEBTOR_ID() {
        return DEBTOR_ID;
    }

    public void setDEBTOR_ID(UUID DEBTOR_ID) {
        this.DEBTOR_ID = DEBTOR_ID;
    }

    public Date getDATE() {
        return DATE;
    }

    public void setDATE(Date DATE) {
        this.DATE = DATE;
    }

    public int getDAY() {
        return DAY;
    }

    public void setDAY(int DAY) {
        this.DAY = DAY;
    }

    public String getDAY_OF_WEEK() {
        return DAY_OF_WEEK;
    }

    public void setDAY_OF_WEEK(String DAY_OF_WEEK) {
        this.DAY_OF_WEEK = DAY_OF_WEEK;
    }

    public int getDAY_OF_YEAR() {
        return DAY_OF_YEAR;
    }

    public void setDAY_OF_YEAR(int DAY_OF_YEAR) {
        this.DAY_OF_YEAR = DAY_OF_YEAR;
    }

    public int getWEEK() {
        return WEEK;
    }

    public void setWEEK(int WEEK) {
        this.WEEK = WEEK;
    }

    public int getMONTH() {
        return MONTH;
    }

    public void setMONTH(int MONTH) {
        this.MONTH = MONTH;
    }

    public int getYEAR() {
        return YEAR;
    }

    public void setYEAR(int YEAR) {
        this.YEAR = YEAR;
    }
}
