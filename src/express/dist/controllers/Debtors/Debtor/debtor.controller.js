"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDebtors = exports.updateDebtor = exports.deleteDebtor = exports.getOutstandingBalancePerDebtor = exports.createDebtor = void 0;
const Debtor_1 = require("../../../Class/Debtor");
const postgres_1 = __importDefault(require("../../../Database/postgres"));
const createDebtor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, details, accountID } = req.body;
        const debtor = new Debtor_1.Debtor({ name: name, details: details, accountID: accountID });
        debtor.createDebtor();
        console.log("[Success]: Debtor Created");
        res.status(200).json({ msg: "Added Debtor Successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.createDebtor = createDebtor;
const getOutstandingBalancePerDebtor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accountID } = req.body;
        const SQL = `
            SELECT 
                debtor_id,
                debtor.name,
                debtor.details,
                SUM(
                    CASE
                        WHEN type='credit' THEN -amount
                        WHEN type='debit' THEN amount
                    END
                ) AS ob,

                SUM(
                    CASE
                        WHEN type='credit' THEN amount
                    END
                ) AS "credit_amount",

                SUM(
                    CASE
                        WHEN type='debit' THEN amount
                    END
                ) AS "debit_amount"

            FROM debtor_transaction

            INNER JOIN debtor ON debtor_transaction.debtor_id = debtor.id

            WHERE 
                debtor_transaction.account_id=$1

            GROUP BY 
                debtor_id, 
                debtor.name,
                debtor.details
                
            ORDER BY
                debtor.name;
        `;
        const SQL2 = `
            SELECT
                SUM(
                    CASE
                        WHEN
                            type ='debit' THEN amount
                        END
                ) AS "total_debit_balance",

                SUM(
                    CASE
                        WHEN
                            type ='credit' THEN amount
                        END
                ) AS "total_credit_balance"

            FROM debtor_transaction

            LEFT JOIN debtor ON debtor_transaction.debtor_id = debtor.id

            
            WHERE 
            debtor_transaction.account_id=$1
            
            GROUP BY 
                debtor.name

            ORDER BY 
                debtor.name ASC

        `;
        const values = [accountID];
        return res.status(200).json({
            balance: (yield postgres_1.default.query(SQL, values)).rows,
            totalBalance: (yield postgres_1.default.query(SQL2, values)).rows
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: `${error}` });
    }
});
exports.getOutstandingBalancePerDebtor = getOutstandingBalancePerDebtor;
const deleteDebtor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { debtorID, accountID } = req.body;
        //Y Check if their are TXN for specific Debtor
        const SQL_DELETE_DEBTOR_CHECK_IF_THEIR_ARE_TEXN = `SELECT * FROM debtor_transaction WHERE debtor_id=$1 AND account_id=$2`;
        const checkDebtorTXN = yield postgres_1.default.query(SQL_DELETE_DEBTOR_CHECK_IF_THEIR_ARE_TEXN, [debtorID, accountID]);
        if ((checkDebtorTXN.rowCount || 0) > 0) {
            console.log("Debtor Has TXN which need to be Deleted");
            //Y Delete Debtpr Transactions
            const SQL_DELETE_DEBTOR_TXN = `DELETE FROM debtor_transaction WHERE debtor_id=$1 AND account_id=$2`;
            const VALUES_SQL_DELETE_DEBTOR_TXN = [debtorID, accountID];
            const queryDeleteDebtorTXN = yield postgres_1.default.query(SQL_DELETE_DEBTOR_TXN, VALUES_SQL_DELETE_DEBTOR_TXN);
            if ((queryDeleteDebtorTXN.rowCount || 0) > 0) {
                //Y Delete Debtor 
                const SQL_DELETE_DEBTOR = `DELETE FROM debtor WHERE id=$1 AND account_id=$2`;
                const VALUES_SQL_DELETE_DEBTOR = [debtorID, accountID];
                const queryDeleteDebtor = yield postgres_1.default.query(SQL_DELETE_DEBTOR, VALUES_SQL_DELETE_DEBTOR);
                return res.status(200).json({ msg: `[Success]: Debtor and Debtor TXN deleted` });
            }
            else {
                throw new Error(`Could not Delete Debtor Or Transactions:`);
            }
        }
        else {
            console.log("Debtor Has not TXN");
            //Y Delete Debtor 
            const SQL_DELETE_DEBTOR = `DELETE FROM debtor WHERE id=$1 AND account_id=$2`;
            const VALUES_SQL_DELETE_DEBTOR = [debtorID, accountID];
            const queryDeleteDebtor = yield postgres_1.default.query(SQL_DELETE_DEBTOR, VALUES_SQL_DELETE_DEBTOR);
            res.status(200).json({ msg: `[Success]: Debtor Deleted` });
        }
    }
    catch (error) {
        return res.status(500).json({ error: `Could not Delete Debtor or Transaction: ${error}` });
    }
});
exports.deleteDebtor = deleteDebtor;
const updateDebtor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, details, debtorID, accountID } = req.body;
        console.log("Update Debtor");
        console.log({ name, details, debtorID, accountID });
        const SQL_UPDATE_DEBTOR = `UPDATE debtor SET name=$1, details=$2 WHERE id=$3 AND account_id=$4`;
        const valuesUpdateDebtor = [name, details, debtorID, accountID];
        const query = yield postgres_1.default.query(SQL_UPDATE_DEBTOR, valuesUpdateDebtor);
        if ((query.rowCount || 0) > 0) {
            return res.status(200).json({ msg: `[Success]: Debtor Updated` });
        }
        else {
            res.status(500).json({ error: `Could not updated debtor` });
        }
    }
    catch (error) {
        res.status(500).json({ error: `${error}` });
    }
});
exports.updateDebtor = updateDebtor;
const getDebtors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accountID } = req.body;
        const SQL = `SELECT * FROM debtor WHERE account_id=$1 ORDER BY name`;
        const values = [accountID];
        const query = yield postgres_1.default.query(SQL, values);
        return res.status(200).json({ debtors: query.rows });
    }
    catch (error) {
        res.status(500).json({ error: `${error}` });
    }
});
exports.getDebtors = getDebtors;
