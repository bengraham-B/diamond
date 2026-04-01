package com.app.diamond_core.Model;

import java.util.UUID;

public class RequestBodyModel {
    public UUID ID;
    public UUID ACCOUNT_ID;
    public UUID DIAMOND_TRANSACTION_ID;

    public UUID getID() {
        return ID;
    }

    public void setID(UUID ID) {
        this.ID = ID;
    }

    public UUID getACCOUNT_ID() {
        return ACCOUNT_ID;
    }

    public void setACCOUNT_ID(UUID ACCOUNT_ID) {
        this.ACCOUNT_ID = ACCOUNT_ID;
    }

    public UUID getDIAMOND_TRANSACTION_ID() {
        return DIAMOND_TRANSACTION_ID;
    }

    public void setDIAMOND_TRANSACTION_ID(UUID DIAMOND_TRANSACTION_ID) {
        this.DIAMOND_TRANSACTION_ID = DIAMOND_TRANSACTION_ID;
    }
}
