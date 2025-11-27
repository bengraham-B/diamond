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
exports.getMonthTotalPerCategory = exports.deleteCategory = exports.updateCategory = exports.getUserCategories = exports.createCategory = void 0;
const postgres_1 = __importDefault(require("../../Database/postgres"));
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accountID, name, details, categoryType } = req.body;
        if (!accountID || !name || !details || !categoryType)
            throw new Error(`Missing fields`);
        const SQL = `INSERT INTO category(account_id, name, details, type) VALUES($1, $2, $3, $4) RETURNING id;`;
        const values = [accountID, name, details, categoryType];
        const query = yield postgres_1.default.query(SQL, values);
        if ((query.rowCount || 0) === 0)
            throw new Error(`Could not create Category`);
        res.status(200).json({ msg: "Created Category Successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.createCategory = createCategory;
const getUserCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accountID } = req.body;
        const SQL = `SELECT * FROM category WHERE account_id=$1 ORDER BY type, name ASC`;
        const values = [accountID];
        return res.status(200).json({ categories: (yield postgres_1.default.query(SQL, values)).rows });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.getUserCategories = getUserCategories;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, details, accountID, categoryID, categoryType } = req.body;
        if (!accountID || !categoryID)
            throw new Error(`AccountID or CategoryID is missing`);
        const SQL = `UPDATE category SET name=$1, details=$2, type=$3 WHERE id=$4 AND account_id=$5`;
        const values = [name, details, categoryType, categoryID, accountID];
        const query = yield postgres_1.default.query(SQL, values);
        if ((query.rowCount || 0) === 0)
            return res.status(500).json({ msg: `Could not update Category` });
        return res.status(200).json({ msg: `Category Update Successfully` });
    }
    catch (error) {
        console.error(`Could not update Category: ${error}`);
        res.status(500).json({ error: error });
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //TODO: Remove category from TXN which have it as their categoryID
        const { categoryID, accountID } = req.body;
        const SQL = `DELETE FROM category WHERE id=$1 AND account_id=$2`;
        const query = yield postgres_1.default.query(SQL, [categoryID, accountID]);
        if ((query.rowCount || 0) === 0)
            return res.status(500).json({ msg: `Could not delete Category` });
        return res.status(200).json({ msg: `Category Update Successfully` });
    }
    catch (error) {
        console.error(`Could not update Category: ${error}`);
        res.status(500).json({ error: error });
    }
});
exports.deleteCategory = deleteCategory;
const getMonthTotalPerCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accountID, year } = req.body;
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
            throw new Error("Could not get Budgets [Query 1]");
        //Y This is the debit can credit balance for the year: Query2
        const SQL_2 = `
            SELECT
                SUM(CASE WHEN type='debit' THEN amount ELSE 0 END) AS year_debit_total,
                SUM(CASE WHEN type='credit' THEN amount ELSE 0 END) AS year_credit_total,
                SUM(CASE WHEN type='credit' THEN amount ELSE 0 END) - SUM(CASE WHEN type='debit' THEN amount ELSE 0 END) AS year_balance

            FROM
                transaction

            WHERE
                category_id IS NOT NULL AND
                account_id=$1 AND
                year =$2
    `;
        const values_2 = [accountID, year];
        const query2 = yield postgres_1.default.query(SQL_2, values_2);
        if ((query2.rowCount || 0) === 0)
            throw new Error("Could not get Debit and Credit balance [Query 2]");
        res.status(200).json({ budget: query.rows, balance: query2.rows });
    }
    catch (error) {
        res.status(500).json({ error: `${error}` });
    }
});
exports.getMonthTotalPerCategory = getMonthTotalPerCategory;
