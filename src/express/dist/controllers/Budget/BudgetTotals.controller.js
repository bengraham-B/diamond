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
exports.budgetDebitTotal = exports.budgetCreditTotal = void 0;
const postgres_1 = __importDefault(require("../../Database/postgres"));
const budgetCreditTotal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accountID, month } = req.body;
        const SQL_PrevoiusMonth = `
        SELECT
            (SELECT SUM(amount) FROM budget WHERE type='credit' AND account_id=$2) AS previous_credit_budget,
            SUM(CASE WHEN transaction.month=$1 AND transaction.type='credit'THEN transaction.amount ELSE 0 END) AS previous_credit_actual,

            (SELECT SUM(amount) FROM budget WHERE type='credit' AND account_id=$2) - SUM(CASE WHEN transaction.month=$1 AND transaction.type='credit' THEN transaction.amount ELSE 0 END) AS previous_credit_diff
        FROM transaction
        RIGHT JOIN budget ON transaction.category_id = budget.category_id

        WHERE
            transaction.account_id=$2;
        `;
        const query_prevoiusMonth_CREDIT = yield postgres_1.default.query(SQL_PrevoiusMonth, [(month - 1), accountID]);
        const SQL_CurrentMonth = `
        SELECT
            (SELECT SUM(amount) FROM budget WHERE type='credit' AND account_id=$2) AS current_credit_budget,
            SUM(CASE WHEN transaction.month=$1 AND transaction.type='credit'THEN transaction.amount ELSE 0 END) AS current_credit_actual,

            (SELECT SUM(amount) FROM budget WHERE type='credit' AND account_id=$2) - SUM(CASE WHEN transaction.month=$1 AND transaction.type='credit' THEN transaction.amount ELSE 0 END) AS current_credit_diff
        FROM transaction
        RIGHT JOIN budget ON transaction.category_id = budget.category_id

        WHERE
            transaction.account_id=$2;
        `;
        const query_currentMonth_CREDIT = yield postgres_1.default.query(SQL_CurrentMonth, [month, accountID]);
        res.status(200).json({
            prevoiousMonth_CREDIT: query_prevoiusMonth_CREDIT.rows,
            currentMonth_CREDIT: query_currentMonth_CREDIT.rows
        });
    }
    catch (error) {
        res.status(500).json();
    }
});
exports.budgetCreditTotal = budgetCreditTotal;
const budgetDebitTotal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accountID, month } = req.body;
        const SQL_PrevoiusMonth = `
        SELECT
            (SELECT SUM(amount) FROM budget WHERE type='debit' AND account_id=$2) AS previous_debit_budget,
            SUM(CASE WHEN transaction.month=$1 AND transaction.type='debit'THEN transaction.amount ELSE 0 END) AS previous_debit_actual,

            (SELECT SUM(amount) FROM budget WHERE type='debit' AND account_id=$2) - SUM(CASE WHEN transaction.month=$1 AND transaction.type='debit' THEN transaction.amount ELSE 0 END) AS previous_debit_diff
        FROM transaction
        RIGHT JOIN budget ON transaction.category_id = budget.category_id

        WHERE
            transaction.account_id=$2;
        `;
        const query_prevoiusMonth = yield postgres_1.default.query(SQL_PrevoiusMonth, [(month - 1), accountID]);
        const SQL_CurrentMonth = `
        SELECT
            (SELECT SUM(amount) FROM budget WHERE type='debit' AND account_id=$2) AS current_debit_budget,
            SUM(CASE WHEN transaction.month=$1 AND transaction.type='debit' THEN transaction.amount ELSE 0 END) AS current_debit_actual,

            (SELECT SUM(amount) FROM budget WHERE type='debit' AND account_id=$2) - SUM(CASE WHEN transaction.month=$1 AND transaction.type='debit' THEN transaction.amount ELSE 0 END) AS current_debit_diff
        FROM transaction
        RIGHT JOIN budget ON transaction.category_id = budget.category_id

        WHERE
            transaction.account_id=$2;
        `;
        const query_currentMonth = yield postgres_1.default.query(SQL_CurrentMonth, [month, accountID]);
        res.status(200).json({
            prevoiousMonth_DEBIT: query_prevoiusMonth.rows,
            currentMonth_DEBIT: query_currentMonth.rows
        });
    }
    catch (error) {
        res.status(500).json();
    }
});
exports.budgetDebitTotal = budgetDebitTotal;
