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
exports.getBudget = exports.createBudget = void 0;
const postgres_1 = __importDefault(require("../../Database/postgres"));
const createBudget = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Create Budget");
    try {
        const { accountID, amount, details, categoryID, type } = req.body;
        const SQL = `INSERT INTO budget ("account_id", "category_id", "details", "amount", "type") VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const values = [accountID, categoryID, details, amount, type];
        const query = yield postgres_1.default.query(SQL, values);
        if ((query.rowCount || 0) === 0)
            throw new Error("Could not create Budget");
        res.status(200).json({ msg: "Budget Created Successfully" });
    }
    catch (error) {
        console.error(`${error}`);
        res.status(500).json({ error: `${error}` });
    }
});
exports.createBudget = createBudget;
const getBudget = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accountID, month } = req.body;
        const SQL_PREVIOUS_MONTH = `
            SELECT
                budget.id,
                transaction.month,
                budget.type AS budget_type,
                category.name AS category_name,
                budget.amount AS budget,
                SUM(transaction.amount) AS actual,
                budget.amount- SUM(transaction.amount) AS diff

            FROM
                category

            RIGHT JOIN budget on category.id = budget.category_id
            RIGHT JOIN transaction ON category.id = transaction.category_id

            WHERE
                transaction.month=$1
                AND budget.account_id=$2

            GROUP BY
                category.name,
                budget.amount,
                budget.type,
                transaction.month,
                budget.id

            ORDER BY
                budget.type;
            `;
        const VALUES_PREVIOUS_MONTH = [(month - 1), accountID];
        const QUERY_PREVIOUS_MONTH = yield postgres_1.default.query(SQL_PREVIOUS_MONTH, VALUES_PREVIOUS_MONTH);
        if ((QUERY_PREVIOUS_MONTH.rowCount || 0) === 0)
            throw new Error(`Could not get Previous mont's budget records`);
        const SQL_CURRENT_MONTH = `
            SELECT
                budget.id,
                transaction.month,
                budget.type AS budget_type,
                category.name AS category_name,
                budget.amount AS budget,
                SUM(transaction.amount) AS actual,
                budget.amount- SUM(transaction.amount) AS diff

            FROM
                category

            RIGHT JOIN budget on category.id = budget.category_id
            RIGHT JOIN transaction ON category.id = transaction.category_id

            WHERE
                transaction.month=$1
                AND budget.account_id=$2

            GROUP BY
                category.name,
                budget.amount,
                budget.type,
                transaction.month,
                budget.id

            ORDER BY
                budget.type;
            `;
        const VALUES_CURRENT_MONTH = [month, accountID];
        const QUERY_CURRENT_MONTH = yield postgres_1.default.query(SQL_CURRENT_MONTH, VALUES_CURRENT_MONTH);
        if ((QUERY_CURRENT_MONTH.rowCount || 0) === 0)
            throw new Error(`Could not get Current mont's budget records`);
        res.status(200).json({
            previous_month: QUERY_PREVIOUS_MONTH.rows,
            current_month: QUERY_CURRENT_MONTH.rows,
        });
    }
    catch (error) {
        console.error(`${error}`);
        res.status(500).json({ error: `${error}` });
    }
});
exports.getBudget = getBudget;
