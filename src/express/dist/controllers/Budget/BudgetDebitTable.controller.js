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
exports.getBudgetDebitTable = void 0;
const postgres_1 = __importDefault(require("../../Database/postgres"));
// Y This returns a table of debit budget for the year of each month
const getBudgetDebitTable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accountID, year } = req.body;
        const SQL = `

        SELECT
            budget.id,
            category.name,
            category.type,
            -- Sept
            budget.amount AS sept_budget,
            SUM(CASE WHEN txn.month='9' AND txn.type='debit' THEN txn.amount ELSE 0 END) AS sept_actual,
            budget.amount - SUM(CASE WHEN txn.month='9' THEN txn.amount ELSE 0 END) AS sept_diff,

            -- Oct
            budget.amount AS oct_budget,
            SUM(CASE WHEN txn.month='10' AND txn.type='debit' THEN txn.amount ELSE 0 END) AS oct_actual,
            budget.amount - SUM(CASE WHEN txn.month='10' THEN txn.amount ELSE 0 END) AS oct_diff,

            -- NOV
            budget.amount AS nov_budget,
            SUM(CASE WHEN txn.month='11' AND txn.type='debit' THEN txn.amount ELSE 0 END) AS nov_actual,
            budget.amount - SUM(CASE WHEN txn.month='11' THEN txn.amount ELSE 0 END) AS nov_diff,

            -- DEC
            budget.amount AS dec_budget,
            SUM(CASE WHEN txn.month='12' AND txn.type='debit' THEN txn.amount ELSE 0 END) AS dec_actual,
            budget.amount - SUM(CASE WHEN txn.month='12' THEN txn.amount ELSE 0 END) AS dec_diff

            FROM
                transaction txn

            RIGHT JOIN budget ON txn.category_id = budget.category_id
            RIGHT JOIN category ON budget.category_id = category.id

            WHERE
                txn.account_id=$1
                AND budget.type='debit'
                AND txn.year =$2

            GROUP BY
                category.name,
                category.type, 
                budget.amount,
                budget.id

            ORDER BY
                category.type

        `;
        const values = [accountID, year];
        const query = yield postgres_1.default.query(SQL, values);
        if ((query.rowCount || 0) === 0)
            throw new Error("Could not create Budget");
        res.status(200).json({ debitBudgetTable: query.rows });
    }
    catch (error) {
        console.error(`${error}`);
        res.status(500).json({ error: `${error}` });
    }
});
exports.getBudgetDebitTable = getBudgetDebitTable;
