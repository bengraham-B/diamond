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
exports.getBudgets = exports.createBudget = void 0;
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
const getBudgets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accountID } = req.body;
        const SQL = `
            SELECT
                category.id,
                category.name,
                category.type AS cat_type,
                SUM(CASE WHEN transaction.month_name = 'Jan' THEN transaction.amount ELSE 0 END) AS jan,
                SUM(CASE WHEN transaction.month_name = 'Feb' THEN transaction.amount ELSE 0 END) AS feb,
                SUM(CASE WHEN transaction.month_name = 'Mar' THEN transaction.amount ELSE 0 END) AS mar,
                SUM(CASE WHEN transaction.month_name = 'Apr' THEN transaction.amount ELSE 0 END) AS apr,
                SUM(CASE WHEN transaction.month_name = 'May' THEN transaction.amount ELSE 0 END) AS may,
                SUM(CASE WHEN transaction.month_name = 'Jun' THEN transaction.amount ELSE 0 END) AS jun,
                SUM(CASE WHEN transaction.month_name = 'Jul' THEN transaction.amount ELSE 0 END) AS jul,
                SUM(CASE WHEN transaction.month_name = 'Aug' THEN transaction.amount ELSE 0 END) AS aug,
                SUM(CASE WHEN transaction.month_name = 'Sept' THEN transaction.amount ELSE 0 END) AS sept,
                SUM(CASE WHEN transaction.month_name = 'Oct'  THEN transaction.amount ELSE 0 END) AS oct,
                SUM(CASE WHEN transaction.month_name = 'Nov' THEN transaction.amount ELSE 0 END) AS nov,
                SUM(CASE WHEN transaction.month_name = 'Dec' THEN transaction.amount ELSE 0 END) AS dec,
                AVG(transaction.amount) AS AVG_PER_TXN,
                COUNT(transaction.amount) AS Count,
                SUM(transaction.amount) AS total

            FROM 
                transaction

            LEFT JOIN category On transaction.category_id = category.id
        
            WHERE 
                transaction.account_id=$1
            GROUP BY 
                category_id, 
                category.name, 
                transaction.year,
                category.id,
                category.type

            ORDER BY 
                category.name        
        `;
        const values = [accountID];
        const query = yield postgres_1.default.query(SQL, values);
        if ((query.rowCount || 0) === 0)
            throw new Error("Could not get Budgets");
        res.status(200).json({ budget: query.rows });
    }
    catch (error) {
        res.status(500).json({ error: `${error}` });
    }
});
exports.getBudgets = getBudgets;
