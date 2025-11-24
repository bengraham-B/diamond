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
exports.deleteDebtorTransaction = exports.updateDebtorTransaction = exports.getDebtorTransactionByID = exports.getDebtorTransaction = exports.createDebtorTransaction = void 0;
const DebtorTransaction_1 = require("../../../Class/DebtorTransaction");
const postgres_1 = __importDefault(require("../../../Database/postgres"));
const Functions_1 = require("../../../Class/Functions");
const createDebtorTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accountID, debtorID, categoryID, type, amount, details, location, supplierID, date, time, day, week, month, monthName, year } = req.body;
        const debtorTransaction = new DebtorTransaction_1.DebtorTransaction({ accountID, debtorID, categoryID, type, amount, details, location, supplierID, date, time, day, week, month, monthName, year });
        const debtorTXN = yield debtorTransaction.createDebtorsTransaction();
        res.status(200).json({
            msg: `Added Debtor Transaction Successfully: ${debtorTXN}`,
            details: `${details}`
        });
    }
    catch (error) {
        res.status(500).json({ error: `${error}` });
    }
});
exports.createDebtorTransaction = createDebtorTransaction;
const getDebtorTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accountID, debtorID } = req.body;
        if (!accountID || !debtorID)
            throw new Error("No AccountID or DebtorID");
        const SQL = `
        SELECT
            debtor_transaction.account_id,
            debtor_transaction.id,
            debtor_transaction.amount,
            debtor_transaction.details,
            debtor_transaction.date,
            debtor_transaction.time,
            debtor_transaction.type,
            debtor_transaction.monthname,
            debtor_transaction.year,

            supplier.id AS "supplier_id",
            supplier.name AS "supplier_name",

            category.id AS "category_id",
            category.name AS "category_name"

        FROM
            debtor_transaction


        LEFT JOIN supplier on debtor_transaction.supplier_id = supplier.id
        LEFT JOIN category on debtor_transaction.category_id = category.id

        WHERE
        debtor_transaction.account_id =$1 AND
        debtor_transaction.debtor_id =$2

        ORDER BY
            debtor_transaction.date DESC,
            debtor_transaction.amount DESC
    `;
        const values = [accountID, debtorID];
        const query = yield postgres_1.default.query(SQL, values);
        return res.status(200).json({
            msg: 'Retrived Transaction by month Successfully',
            debtorID: debtorID,
            accountID: accountID,
            debtorTransactions: query.rows
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: `${error}` });
    }
});
exports.getDebtorTransaction = getDebtorTransaction;
const getDebtorTransactionByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { debtorTxnID } = req.body;
        const SQL = 'SELECT * FROM debtor_transaction WHERE id=$1';
        const values = [debtorTxnID];
        const query = yield postgres_1.default.query(SQL, values);
        res.status(200).json({
            msg: 'Retrived Transaction by ID Successfully',
            debtorTransaction: query.rows
        });
    }
    catch (error) {
        res.status(500).json({ error: `${error}` });
    }
});
exports.getDebtorTransactionByID = getDebtorTransactionByID;
const updateDebtorTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accountID, debtorTransactionID, supplierID, categoryID, details, amount, type, date, time } = req.body;
        if (!accountID || !debtorTransactionID)
            return res.status(500).json({ error: `Debtor TXN ID or Account ID missings` });
        const func = new Functions_1.Functions();
        const { day, week, month, monthName, year } = func.breakDownDate(date);
        const SQL = `UPDATE debtor_transaction SET supplier_id=$1, category_id=$2, details=$3, amount=$4, type=$5, date=$6, time=$7, day=$8, week=$9, month=$10, monthname=$11, year=$12 WHERE id=$13 AND account_id=$14`;
        const values = [supplierID, categoryID, details, amount, type, date, time, day, week, month, monthName, year, debtorTransactionID, accountID];
        const query = yield postgres_1.default.query(SQL, values);
        if ((query.rowCount || 0) === 0)
            throw new Error(`Could not update Debtor TXN.`);
        return res.status(200).json({ msg: `DEBTOR TXN: ${debtorTransactionID} Updated` });
    }
    catch (error) {
        return res.status(500).json({ error: `${error}` });
    }
});
exports.updateDebtorTransaction = updateDebtorTransaction;
const deleteDebtorTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accountID, debtorTransactionID } = req.body;
        if (!accountID || !debtorTransactionID)
            return res.status(500).json({ error: `Debtor TXN ID or Account ID missings` });
        const SQL = `DELETE FROM debtor_transaction WHERE id=$1 AND account_id=$2`;
        const values = [debtorTransactionID, accountID];
        yield postgres_1.default.query(SQL, values);
        console.log(`DELETD DEBTOR TXN: ${debtorTransactionID}`);
        return res.status(200).json({ message: `Delete Debtor TXN: ${debtorTransactionID}` });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: `${error}` });
    }
});
exports.deleteDebtorTransaction = deleteDebtorTransaction;
