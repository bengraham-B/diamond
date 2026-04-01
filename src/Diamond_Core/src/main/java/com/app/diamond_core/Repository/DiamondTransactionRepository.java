package com.app.diamond_core.Repository;

import com.app.diamond_core.Database.Conn;
import com.app.diamond_core.Model.DiamondDate;
import com.app.diamond_core.Model.DiamondTransactionModel;
import com.app.diamond_core.Model.RequestBodyModel;
import com.app.diamond_core.Utils.Utils;
import com.app.diamond_core.Utils.VerifyDiamondTxn;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Repository
public class DiamondTransactionRepository {

    private final Conn conn;

    public DiamondTransactionRepository(Conn conn) {
        this.conn = conn;
    }

    public List<DiamondTransactionModel> getDiamondTransactions(RequestBodyModel req){
        List<DiamondTransactionModel> DiamondTxnList = new ArrayList<>();
        String SQL = """
                       SELECT
                           *
                       FROM
                           DIAMOND_TRANSACTION DT
                       LEFT JOIN GL_ACCOUNT ON DT.GL_ACCOUNT_ID = GL_ACCOUNT.GL_ACCOUNT_ID
                       LEFT JOIN MERCHANT ON DT.MERCHANT_ID = MERCHANT.MERCHANT_ID
                       WHERE
                           DT.ACCOUNT_ID=?
                       ORDER BY DAY DESC
        """;
        try (
            Connection connection = conn.getConn();
            PreparedStatement smt = connection.prepareStatement(SQL)
        ) {

            smt.setString(1, req.ACCOUNT_ID.toString());


            try (ResultSet rs = smt.executeQuery()){
                while (rs.next()){
                    DiamondTransactionModel txn = new DiamondTransactionModel();
                    txn.setDIAMOND_TRANSACTION_ID(Utils.parseUUID(rs.getString("DIAMOND_TRANSACTION_ID")));
                    txn.setACCOUNT_ID(Utils.parseUUID(rs.getString("ACCOUNT_ID")));

                    txn.setAMOUNT(rs.getDouble("AMOUNT"));
                    txn.setDETAILS(rs.getString("DETAILS"));
                    txn.setTXN_TYPE(rs.getString("TXN_TYPE"));
                    txn.setSOURCE(rs.getString("SOURCE"));

                    txn.setGL_ACCOUNT_ID(Utils.parseUUID(rs.getString("GL_ACCOUNT_ID")));
                    txn.setGL_ACCOUNT_NAME((rs.getString("GL_ACCOUNT_NAME")));
                    txn.setGL_ACCOUNT_TYPE((rs.getString("GL_ACCOUNT_TYPE")));
                    txn.setDEBTOR_ID(Utils.parseUUID(rs.getString("DEBTOR_ID")));
                    txn.setRECEIVABLE((rs.getBoolean("RECEIVABLE")));
                    txn.setMERCHANT_ID(Utils.parseUUID(rs.getString("MERCHANT_ID")));
                    txn.setMERCHANT_NAME((rs.getString("MERCHANT.NAME")));

                    txn.setDATE(rs.getDate("DATE"));
                    txn.setDAY(rs.getInt("DAY"));
                    txn.setDAY_OF_WEEK(rs.getString("DAY_OF_WEEK"));
                    txn.setDAY_OF_YEAR(rs.getInt("DAY_OF_YEAR"));
                    txn.setWEEK(rs.getInt("WEEK"));
                    txn.setMONTH(rs.getInt("MONTH"));
                    txn.setYEAR(rs.getInt("YEAR"));

                    DiamondTxnList.add(txn);
                }
            }

            return DiamondTxnList;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public boolean addDiamondTransaction(DiamondTransactionModel dt){

        if(!VerifyDiamondTxn.verifyFields(dt))
            throw new RuntimeException("Incorrect format for a Diamond TXN");

        DiamondDate dateBrokenDown = Utils.breakDownDate(new java.sql.Date(dt.DATE.getTime()));

        String SQL = """
            INSERT INTO DIAMOND_TRANSACTION (
                DIAMOND_TRANSACTION_ID,
                ACCOUNT_ID,
                AMOUNT,
                DETAILS,
                TXN_TYPE,
                SOURCE,
                GL_ACCOUNT_ID,
                MERCHANT_ID,
                RECEIVABLE,
                DEBTOR_ID,
                DATE,
                DAY,
                DAY_OF_WEEK,
                DAY_OF_YEAR,
                WEEK,
                MONTH,
                YEAR
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """;


        try(
            Connection connection = conn.getConn();
            PreparedStatement smt = connection.prepareStatement(SQL)
        ) {
            smt.setObject(1,  Utils.uuidToString(UUID.randomUUID()));
            smt.setObject(2,  Utils.uuidToString(dt.getACCOUNT_ID()));
            smt.setDouble(3,  dt.getAMOUNT());
            smt.setString(4,  dt.getDETAILS());
            smt.setString(5,  dt.getTXN_TYPE());
            smt.setString(6,  dt.getSOURCE());
            smt.setObject(7,  dt.getGL_ACCOUNT_ID());
            smt.setObject(8, dt.getMERCHANT_ID());
            smt.setBoolean(9, dt.isRECEIVABLE());
            smt.setObject(10, dt.getDEBTOR_ID());
            smt.setDate(11,   new java.sql.Date(dt.getDATE().getTime()));
            smt.setInt(12,    dateBrokenDown.getDay());
            smt.setString(13, dateBrokenDown.getDayOfWeek());
            smt.setInt(14,    dateBrokenDown.getDayOfYear());
            smt.setInt(15,    dateBrokenDown.getWeek());
            smt.setInt(16,    dateBrokenDown.getMonth());
            smt.setInt(17,    dateBrokenDown.getYear());

            int rowsEffected = smt.executeUpdate();

            if(rowsEffected > 0)
                return true;
            else
                throw new Exception("Could not add TXN");

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public DiamondTransactionModel editDiamondTransaction(DiamondTransactionModel dt){
        if(!VerifyDiamondTxn.verifyFields(dt))
            throw new RuntimeException("Incorrect format for a Diamond TXN");

        DiamondDate dateBrokenDown = Utils.breakDownDate(new java.sql.Date(dt.getDATE().getTime()));

        String SQL = """
                UPDATE
                    DIAMOND_TRANSACTION
                SET
                    AMOUNT=?,
                    DETAILS=?,
                    TXN_TYPE=?,
                    SOURCE=?,
                    GL_ACCOUNT_ID=?,
                    MERCHANT_ID=?,
                    RECEIVABLE=?,
                    DEBTOR_ID=?,
                    DATE=?,
                    DAY=?,
                    DAY_OF_WEEK=?,
                    DAY_OF_YEAR=?,
                    WEEK=?,
                    MONTH=?,
                    YEAR=?
                WHERE
                    DIAMOND_TRANSACTION_ID=?
                    AND ACCOUNT_ID=?
                """;

        try(
            Connection connection = conn.getConn();
            PreparedStatement psmt = connection.prepareStatement(SQL);
        ){
            psmt.setDouble(1,  dt.getAMOUNT());
            psmt.setString(2,  dt.getDETAILS());
            psmt.setString(3,  dt.getTXN_TYPE());
            psmt.setString(4,  dt.getSOURCE());
            psmt.setObject(5,  dt.getGL_ACCOUNT_ID());
            psmt.setObject(6, dt.getMERCHANT_ID());
            psmt.setBoolean(7, dt.isRECEIVABLE());
            psmt.setObject(8, dt.getDEBTOR_ID());
            psmt.setDate(9,   new java.sql.Date(dt.getDATE().getTime()));
            psmt.setInt(10,    dateBrokenDown.getDay());
            psmt.setString(11, dateBrokenDown.getDayOfWeek());
            psmt.setInt(12,    dateBrokenDown.getDayOfYear());
            psmt.setInt(13,    dateBrokenDown.getWeek());
            psmt.setInt(14,    dateBrokenDown.getMonth());
            psmt.setInt(15,    dateBrokenDown.getYear());
            psmt.setObject(16,  Utils.uuidToString(dt.getDIAMOND_TRANSACTION_ID()));
            psmt.setObject(17,  Utils.uuidToString(dt.getACCOUNT_ID()));

            int rowsAffected = psmt.executeUpdate();
            if(rowsAffected > 0)
                return dt;
            else
                throw new RuntimeException("Could not Update DIAMOND_TXN: " + dt.getDIAMOND_TRANSACTION_ID());

        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    public RequestBodyModel deleteDiamondTxn(RequestBodyModel req){
            String SQL = "DELETE FROM DIAMOND_TRANSACTION WHERE DIAMOND_TRANSACTION_ID=? AND ACCOUNT_ID=?";
        try (
            Connection connection = conn.getConn();
            PreparedStatement psmt = connection.prepareStatement(SQL);
        ){
            psmt.setString(1, Utils.uuidToString(req.DIAMOND_TRANSACTION_ID));
            psmt.setString(2, Utils.uuidToString(req.ACCOUNT_ID));

            int rowsAffected = psmt.executeUpdate();
            if(rowsAffected > 0)
                return req;
            else
                throw new RuntimeException(" \n \n Unable to Delete DIAMOND_TXN:" + req.getDIAMOND_TRANSACTION_ID());

        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }
}
