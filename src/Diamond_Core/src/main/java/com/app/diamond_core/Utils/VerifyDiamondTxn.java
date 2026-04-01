/*
* Purpose:
* The purpose of this is to verify that all TXN's coming in
*   - Have the correct Expense Type
*   - The required fields are provided
* */
package com.app.diamond_core.Utils;

import com.app.diamond_core.Model.DiamondTransactionModel;

public class VerifyDiamondTxn {

    public static boolean verifyFields(DiamondTransactionModel dt){
        switch (dt.getTXN_TYPE()){
            case "INCOME", "EXPENSE", "INCREASE", "DECREASE":
                break;

            default:
                System.out.println("Incorrect TXN_TYPE");
                return false;
        }

        switch (dt.getSOURCE()){
            case "CASH", "CREDIT_CARD":
                break;
            default:
                System.out.println("No source added");
                return false;
        }

        if(dt.getAMOUNT() == 0.0 || dt.getAMOUNT() < 0){
            System.out.println("No amount provided");
            return false;

        }

        if(dt.getACCOUNT_ID() == null || dt.getDATE() == null || dt.getDETAILS() == null) {
            System.out.println("No AccountID | DATE | DETAILS");
            return false;
        }

        return true;
    }
}
