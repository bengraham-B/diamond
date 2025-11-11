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
exports.getOutstandingBalancePerDebtor = exports.getDebtorTransactionByID = exports.getDebtorTransactionByMonth = exports.createDebtorTransaction = void 0;
const DebtorTransaction_1 = require("../../../Class/DebtorTransaction");
const postgres_1 = __importDefault(require("../../../Database/postgres"));
const createDebtorTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accountID, debtorID, categoryID, type, amount, details, location, supplierID, date, day, week, month, monthName, year } = req.body;
        const debtorTransaction = new DebtorTransaction_1.DebtorTransaction({ accountID, debtorID, categoryID, type, amount, details, location, supplierID, date, day, week, month, monthName, year });
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
const getDebtorTransactionByMonth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accountID, debtorID, month } = req.body;
        const debtorTransaction = new DebtorTransaction_1.DebtorTransaction({ accountID: accountID, debtorID: debtorID, month: month });
        const debtorTxnByMonth = yield debtorTransaction.getDebtorsByMonth({ accountID: accountID, debtorID: debtorID, month: month });
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        console.log(`${accountID}: Retrived Debtors Transaction for Month ${monthNames[month - 1]}`);
        res.status(200).json({
            msg: 'Retrived Transaction by month Successfully',
            debtorTransactions: debtorTxnByMonth
        });
    }
    catch (error) {
        res.status(500).json({ error: `${error}` });
    }
});
exports.getDebtorTransactionByMonth = getDebtorTransactionByMonth;
const getDebtorTransactionByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { debtorTxnID } = req.body;
        const SQL = 'SELECT * FROM debtor_transaction WHERE id=$1';
        const values = [debtorTxnID];
        const query = yield postgres_1.default.query(SQL, values);
        // return query.rows
        res.status(200).json({
            msg: 'Retrived Transaction by ID Successfully',
            debtorTransaction: query.rows
        });
        console.log(`${debtorTxnID}: Retrived Debtor Transaction `);
    }
    catch (error) {
        res.status(500).json({ error: `${error}` });
    }
});
exports.getDebtorTransactionByID = getDebtorTransactionByID;
const getOutstandingBalancePerDebtor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accountID, month } = req.body;
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
                debtor.details;
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

            WHERE 
                account_id=$1
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
