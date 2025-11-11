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
exports.expenseChart = exports.editTransaction = exports.deleteTransaction = exports.getTransactions = exports.createTransaction = void 0;
//^ Importing Class
const Transaction_1 = require("../../Class/Transaction");
const postgres_1 = __importDefault(require("../../Database/postgres"));
const Functions_1 = require("../../Class/Functions");
const createTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { details, amount, supplierID, location, type, accountID, categoryID, date, day, week, month, monthName, year } = req.body;
    // console.log(details)
    console.log(req.body);
    try {
        const transaction = new Transaction_1.Transaction({ details: details, amount: amount, supplierID: supplierID, location: location, type: type, accountID: accountID, categoryID: categoryID, date: date, day: day, week: week, month: month, monthName: monthName, year: year });
        const { id, returnWeek } = yield transaction.createTransaction();
        res.status(200).json({
            msg: `Transaction Added: ${id}`,
            details: `${details}`,
            week: `Week: ${returnWeek}`
        });
    }
    catch (error) {
        res.status(500).json({ error: `${error}` });
    }
});
exports.createTransaction = createTransaction;
const getTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { accountID } = req.body;
    try {
        const SQL = `
            SELECT
                transaction.id,
                transaction.amount,
                transaction.details,
                transaction.type,
                transaction.date,
                transaction.day,
                transaction.week,
                transaction.month,
                transaction.month_name,
                transaction.year,
                transaction.account_id,

                category.id AS category_id,
                category.name AS category_name,

                supplier.id AS supplier_id,
                supplier.name AS supplier_name

            FROM 
                transaction

            LEFT JOIN category on transaction.category_id = category.id
            LEFT JOIN supplier on transaction.supplier_id = supplier.id
            WHERE
                transaction.account_id = $1

            ORDER BY
                transaction.date DESC
        `;
        const values = [accountID];
        const query = yield postgres_1.default.query(SQL, values);
        console.log(`Transaction Amount: ${query.rows.length}`);
        console.log(`Retrived Transactions by Account: ${accountID}`);
        res.status(200).json({
            txn: query.rows,
        });
    }
    catch (error) {
        res.status(500).json({ error: `${error}` });
    }
});
exports.getTransactions = getTransactions;
const deleteTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("DELETE TXN");
    try {
        const { accountID, transactionID } = req.body;
        console.log(accountID, transactionID);
        const SQL = `DELETE FROM transaction WHERE account_id=$1 AND id=$2`;
        const values = [accountID, transactionID];
        yield postgres_1.default.query(SQL, values);
        console.log(`DELETD TXN: ${transactionID}`);
        res.status(200).json({ message: `Delete TXN: ${transactionID}` });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: `${error}` });
    }
});
exports.deleteTransaction = deleteTransaction;
const editTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { acountID, transactionID, supplierID, categoryID, details, amount, type, date } = req.body;
        const func = new Functions_1.Functions();
        const { day, week, month, monthName, year } = func.breakDownDate(date);
        const SQL = `UPDATE transaction SET supplier_id=$1, category_id=$2, details=$3, amount=$4, type=$5, date=$6, day=$7, week=$8, month=$9, month_name=$10, year=$11 WHERE id=$12`;
        const values = [supplierID, categoryID, details, amount, type, date, day, week, month, monthName, year, transactionID];
        yield postgres_1.default.query(SQL, values);
        console.log(`Txn: ${transactionID} Updated`);
        console.log(`Txn: ${categoryID} Category ID`);
        console.log(`Txn: ${transactionID} Transaction ID`);
        return res.status(200).json({ msg: `Txn: ${transactionID} Updated` });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: `${error}` });
    }
});
exports.editTransaction = editTransaction;
const expenseChart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accountID, month } = req.body;
        const SQL = `
            SELECT 
                SUM(amount) AS amount, 
                month, 
                day 
            FROM 
                transaction 
            WHERE 
                account_id=$1 AND 
                type='debit' AND 
                month=$2 
            GROUP BY 
                day, 
                month 
            ORDER BY 
                day ASC
        `;
        const values = [accountID, month];
        return res.status(200).json({ expenseChart: (yield postgres_1.default.query(SQL, values)).rows });
    }
    catch (error) {
        res.status(500).json({ error: `${error}` });
    }
});
exports.expenseChart = expenseChart;
