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
exports.getDebtorTransactionByID = exports.getDebtorTransactionByMonth = exports.createDebtorTransaction = void 0;
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
        // const SQL:string = `SELECT * FROM`
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
