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
exports.getUserWeekBudgets = exports.createBudget = void 0;
const Budget_1 = require("../../Class/Budget");
const postgres_1 = __importDefault(require("../../Database/postgres"));
const createBudget = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Create Budget");
    try {
        const { accountID, amount, details, categoryID, type, tableName, period } = req.body;
        const budget = new Budget_1.Budget({ accountID: accountID, details: details, amount: amount, categoryID: categoryID, type: type, tableName: tableName, period: period });
        const id = yield budget.createBudget();
        res.status(200).json({
            msg: "Budget Created Successfully",
            id: id
        });
    }
    catch (error) {
        console.log(`${error}`);
        res.status(500).json({ error: `${error}` });
    }
});
exports.createBudget = createBudget;
const getUserWeekBudgets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accountID } = yield req.body;
        const SQL = `
            SELECT
                SUM(transaction.amount) AS money_spent,
                transaction.category_id,
                transaction.week,
                transaction.account_id,

                budget.amount,
                budget.details,
                budget.budget_period,
                budget.type,

            CASE
                WHEN SUM(transaction.amount) > budget.amount THEN 'OVER'
                ELSE 'GOOD'
            END AS "budget_inidcator",
                ROUND((SUM(transaction.amount::numeric) / budget.amount::numeric) * 100, 2) AS percent_of_budget,
                (budget.amount - SUM(transaction.amount)) AS diif
            
                FROM
                transaction

            RIGHT JOIN budget ON
                transaction.category_id = budget.category_id

            WHERE
                budget.budget_period = 'week' AND
                transaction.account_id=$1

            GROUP BY 
                transaction.week, 
                transaction.category_id, 
                transaction.account_id,
                budget.details, 
                budget.type, 
                budget.amount, 
                budget.budget_period
                
            ORDER BY 
                budget.details ASC, 
                transaction.week ASC;
        `;
        const values = [accountID];
        return res.status(200).json({
            budgets: (yield postgres_1.default.query(SQL, values)).rows
        });
    }
    catch (error) {
    }
});
exports.getUserWeekBudgets = getUserWeekBudgets;
