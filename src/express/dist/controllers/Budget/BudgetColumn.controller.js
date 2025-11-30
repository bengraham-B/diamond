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
exports.getDebitColumnTotals = exports.getCreditColumnTotals = void 0;
const postgres_1 = __importDefault(require("../../Database/postgres"));
const getCreditColumnTotals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accountID, year } = req.body;
        const SQL = `
            SELECT
                -- JAN
                (SELECT SUM(amount) FROM budget WHERE type='credit' AND account_id=$1) AS JAN_BUDGET,
                SUM(CASE WHEN txn.month='1' AND txn.type='credit' THEN txn.amount ELSE 0 END) AS JAN_ACTUAL,
                (SELECT SUM(amount) FROM budget WHERE type='credit' AND account_id=$1) - SUM(CASE WHEN txn.month='1' AND txn.type='credit' THEN txn.amount ELSE 0 END) AS JAN_DIFF,
                
                -- FEB
                (SELECT SUM(amount) FROM budget WHERE type='credit' AND account_id=$1) AS FEB_BUDGET,
                SUM(CASE WHEN txn.month='2' AND txn.type='credit' THEN txn.amount ELSE 0 END) AS FEB_ACTUAL,
                (SELECT SUM(amount) FROM budget WHERE type='credit' AND account_id=$1) - SUM(CASE WHEN txn.month='2' AND txn.type='credit' THEN txn.amount ELSE 0 END) AS FEB_DIFF,
                
                -- MAR
                (SELECT SUM(amount) FROM budget WHERE type='credit' AND account_id=$1) AS MAR_BUDGET,
                SUM(CASE WHEN txn.month='3' AND txn.type='credit' THEN txn.amount ELSE 0 END) AS MAR_ACTUAL,
                (SELECT SUM(amount) FROM budget WHERE type='credit' AND account_id=$1) - SUM(CASE WHEN txn.month='3' AND txn.type='credit' THEN txn.amount ELSE 0 END) AS MAR_DIFF,
                
                -- APR
                (SELECT SUM(amount) FROM budget WHERE type='credit' AND account_id=$1) AS APR_BUDGET,
                SUM(CASE WHEN txn.month='4' AND txn.type='credit' THEN txn.amount ELSE 0 END) AS APR_ACTUAL,
                (SELECT SUM(amount) FROM budget WHERE type='credit' AND account_id=$1) - SUM(CASE WHEN txn.month='4' AND txn.type='credit' THEN txn.amount ELSE 0 END) AS APR_DIFF,
                
                -- MAY
                (SELECT SUM(amount) FROM budget WHERE type='credit' AND account_id=$1) AS MAY_BUDGET,
                SUM(CASE WHEN txn.month='5' AND txn.type='credit' THEN txn.amount ELSE 0 END) AS MAY_ACTUAL,
                (SELECT SUM(amount) FROM budget WHERE type='credit' AND account_id=$1) - SUM(CASE WHEN txn.month='5' AND txn.type='credit' THEN txn.amount ELSE 0 END) AS MAY_DIFF,
                
                -- JUNE
                (SELECT SUM(amount) FROM budget WHERE type='credit' AND account_id=$1) AS JUN_BUDGET,
                SUM(CASE WHEN txn.month='6' AND txn.type='credit' THEN txn.amount ELSE 0 END) AS JUN_ACTUAL,
                (SELECT SUM(amount) FROM budget WHERE type='credit' AND account_id=$1) - SUM(CASE WHEN txn.month='6' AND txn.type='credit' THEN txn.amount ELSE 0 END) AS JUN_DIFF,
                
                -- JULY
                (SELECT SUM(amount) FROM budget WHERE type='credit' AND account_id=$1) AS JUL_BUDGET,
                SUM(CASE WHEN txn.month='7' AND txn.type='credit' THEN txn.amount ELSE 0 END) AS JUL_ACTUAL,
                (SELECT SUM(amount) FROM budget WHERE type='credit' AND account_id=$1) - SUM(CASE WHEN txn.month='7' AND txn.type='credit' THEN txn.amount ELSE 0 END) AS JUL_DIFF,
                
                -- AUG
                (SELECT SUM(amount) FROM budget WHERE type='credit' AND account_id=$1) AS AUG_BUDGET,
                SUM(CASE WHEN txn.month='8' AND txn.type='credit' THEN txn.amount ELSE 0 END) AS AUG_ACTUAL,
                (SELECT SUM(amount) FROM budget WHERE type='credit' AND account_id=$1) - SUM(CASE WHEN txn.month='8' AND txn.type='credit' THEN txn.amount ELSE 0 END) AS AUG_DIFF,
                
                -- SEPT
                (SELECT SUM(amount) FROM budget WHERE type='credit' AND account_id=$1) AS SEPT_BUDGET,
                SUM(CASE WHEN txn.month='9' AND txn.type='credit' THEN txn.amount ELSE 0 END) AS SEPT_ACTUAL,
                (SELECT SUM(amount) FROM budget WHERE type='credit' AND account_id=$1) - SUM(CASE WHEN txn.month='9' AND txn.type='credit' THEN txn.amount ELSE 0 END) AS SEPT_DIFF,
                
                -- OCT
                (SELECT SUM(amount) FROM budget WHERE type='credit' AND account_id=$1) AS OCT_BUDGET,
                SUM(CASE WHEN txn.month='10' AND txn.type='credit' THEN txn.amount ELSE 0 END) AS OCT_ACTUAL,
                (SELECT SUM(amount) FROM budget WHERE type='credit' AND account_id=$1) - SUM(CASE WHEN txn.month='10' AND txn.type='credit' THEN txn.amount ELSE 0 END) AS OCT_DIFF,

                -- NOV
                (SELECT SUM(amount) FROM budget WHERE type='credit' AND account_id=$1) AS NOV_BUDGET,
                SUM(CASE WHEN txn.month='11' AND txn.type='credit' THEN txn.amount ELSE 0 END) AS NOV_ACTUAL,
                (SELECT SUM(amount) FROM budget WHERE type='credit' AND account_id=$1) - SUM(CASE WHEN txn.month='11' AND txn.type='credit' THEN txn.amount ELSE 0 END) AS NOV_DIFF,

                -- DEC
                (SELECT SUM(amount) FROM budget WHERE type='credit' AND account_id=$1) AS DEC_BUDGET,
                SUM(CASE WHEN txn.month='12' AND txn.type='credit' THEN txn.amount ELSE 0 END) AS DEC_ACTUAL,
                (SELECT SUM(amount) FROM budget WHERE type='credit' AND account_id=$1) - SUM(CASE WHEN txn.month='12' AND txn.type='credit' THEN txn.amount ELSE 0 END) AS DEC_DIFF,

                -- TOTAL
                (SELECT SUM(budget.amount) * 12 FROM budget WHERE type='credit' AND account_id=$1) AS BUDGET_TOTAL,
                SUM(CASE WHEN txn.type='credit' THEN txn.amount ELSE 0 END) AS ACTUAL_TOTAL,
                (SELECT SUM(budget.amount) * 12 FROM budget WHERE type='credit' AND account_id=$1) - SUM(CASE WHEN txn.type='credit' THEN txn.amount ELSE 0 END) AS DIFF_TOTAL


            FROM
                transaction txn

            RIGHT JOIN budget ON txn.category_id = budget.category_id
            LEFT JOIN category ON txn.category_id = category.id

            WHERE
                txn.type='credit'
                AND txn.account_id=$1
                AND txn.year=$2
        `;
        const values = [accountID, year];
        const query = yield postgres_1.default.query(SQL, values);
        res.status(200).json({ year, creditColumnTotals: query.rows });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.getCreditColumnTotals = getCreditColumnTotals;
const getDebitColumnTotals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accountID, year } = req.body;
        const SQL = `
            SELECT
                -- JAN
                (SELECT SUM(amount) FROM budget WHERE type='debit' AND account_id=$1) AS JAN_BUDGET,
                SUM(CASE WHEN txn.month='1' AND txn.type='debit' THEN txn.amount ELSE 0 END) AS JAN_ACTUAL,
                (SELECT SUM(amount) FROM budget WHERE type='debit' AND account_id=$1) - SUM(CASE WHEN txn.month='1' AND txn.type='debit' THEN txn.amount ELSE 0 END) AS JAN_DIFF,
                
                -- FEB
                (SELECT SUM(amount) FROM budget WHERE type='debit' AND account_id=$1) AS FEB_BUDGET,
                SUM(CASE WHEN txn.month='2' AND txn.type='debit' THEN txn.amount ELSE 0 END) AS FEB_ACTUAL,
                (SELECT SUM(amount) FROM budget WHERE type='debit' AND account_id=$1) - SUM(CASE WHEN txn.month='2' AND txn.type='debit' THEN txn.amount ELSE 0 END) AS FEB_DIFF,
                
                -- MAR
                (SELECT SUM(amount) FROM budget WHERE type='debit' AND account_id=$1) AS MAR_BUDGET,
                SUM(CASE WHEN txn.month='3' AND txn.type='debit' THEN txn.amount ELSE 0 END) AS MAR_ACTUAL,
                (SELECT SUM(amount) FROM budget WHERE type='debit' AND account_id=$1) - SUM(CASE WHEN txn.month='3' AND txn.type='debit' THEN txn.amount ELSE 0 END) AS MAR_DIFF,
                
                -- APR
                (SELECT SUM(amount) FROM budget WHERE type='debit' AND account_id=$1) AS APR_BUDGET,
                SUM(CASE WHEN txn.month='4' AND txn.type='debit' THEN txn.amount ELSE 0 END) AS APR_ACTUAL,
                (SELECT SUM(amount) FROM budget WHERE type='debit' AND account_id=$1) - SUM(CASE WHEN txn.month='4' AND txn.type='debit' THEN txn.amount ELSE 0 END) AS APR_DIFF,
                
                -- MAY
                (SELECT SUM(amount) FROM budget WHERE type='debit' AND account_id=$1) AS MAY_BUDGET,
                SUM(CASE WHEN txn.month='5' AND txn.type='debit' THEN txn.amount ELSE 0 END) AS MAY_ACTUAL,
                (SELECT SUM(amount) FROM budget WHERE type='debit' AND account_id=$1) - SUM(CASE WHEN txn.month='5' AND txn.type='debit' THEN txn.amount ELSE 0 END) AS MAY_DIFF,
                
                -- JUNE
                (SELECT SUM(amount) FROM budget WHERE type='debit' AND account_id=$1) AS JUN_BUDGET,
                SUM(CASE WHEN txn.month='6' AND txn.type='debit' THEN txn.amount ELSE 0 END) AS JUN_ACTUAL,
                (SELECT SUM(amount) FROM budget WHERE type='debit' AND account_id=$1) - SUM(CASE WHEN txn.month='6' AND txn.type='debit' THEN txn.amount ELSE 0 END) AS JUN_DIFF,
                
                -- JULY
                (SELECT SUM(amount) FROM budget WHERE type='debit' AND account_id=$1) AS JUL_BUDGET,
                SUM(CASE WHEN txn.month='7' AND txn.type='debit' THEN txn.amount ELSE 0 END) AS JUL_ACTUAL,
                (SELECT SUM(amount) FROM budget WHERE type='debit' AND account_id=$1) - SUM(CASE WHEN txn.month='7' AND txn.type='debit' THEN txn.amount ELSE 0 END) AS JUL_DIFF,
                
                -- AUG
                (SELECT SUM(amount) FROM budget WHERE type='debit' AND account_id=$1) AS AUG_BUDGET,
                SUM(CASE WHEN txn.month='8' AND txn.type='debit' THEN txn.amount ELSE 0 END) AS AUG_ACTUAL,
                (SELECT SUM(amount) FROM budget WHERE type='debit' AND account_id=$1) - SUM(CASE WHEN txn.month='8' AND txn.type='debit' THEN txn.amount ELSE 0 END) AS AUG_DIFF,
                
                -- SEPT
                (SELECT SUM(amount) FROM budget WHERE type='debit' AND account_id=$1) AS SEPT_BUDGET,
                SUM(CASE WHEN txn.month='9' AND txn.type='debit' THEN txn.amount ELSE 0 END) AS SEPT_ACTUAL,
                (SELECT SUM(amount) FROM budget WHERE type='debit' AND account_id=$1) - SUM(CASE WHEN txn.month='9' AND txn.type='debit' THEN txn.amount ELSE 0 END) AS SEPT_DIFF,
                
                -- OCT
                (SELECT SUM(amount) FROM budget WHERE type='debit' AND account_id=$1) AS OCT_BUDGET,
                SUM(CASE WHEN txn.month='10' AND txn.type='debit' THEN txn.amount ELSE 0 END) AS OCT_ACTUAL,
                (SELECT SUM(amount) FROM budget WHERE type='debit' AND account_id=$1) - SUM(CASE WHEN txn.month='10' AND txn.type='debit' THEN txn.amount ELSE 0 END) AS OCT_DIFF,

                -- NOV
                (SELECT SUM(amount) FROM budget WHERE type='debit' AND account_id=$1) AS NOV_BUDGET,
                SUM(CASE WHEN txn.month='11' AND txn.type='debit' THEN txn.amount ELSE 0 END) AS NOV_ACTUAL,
                (SELECT SUM(amount) FROM budget WHERE type='debit' AND account_id=$1) - SUM(CASE WHEN txn.month='11' AND txn.type='debit' THEN txn.amount ELSE 0 END) AS NOV_DIFF,

                -- DEC
                (SELECT SUM(amount) FROM budget WHERE type='debit' AND account_id=$1) AS DEC_BUDGET,
                SUM(CASE WHEN txn.month='12' AND txn.type='debit' THEN txn.amount ELSE 0 END) AS DEC_ACTUAL,
                (SELECT SUM(amount) FROM budget WHERE type='debit' AND account_id=$1) - SUM(CASE WHEN txn.month='12' AND txn.type='debit' THEN txn.amount ELSE 0 END) AS DEC_DIFF,

                -- TOTAL
                (SELECT SUM(budget.amount) * 12 FROM budget WHERE type='debit' AND account_id=$1) AS BUDGET_TOTAL,
                SUM(CASE WHEN txn.type='debit' THEN txn.amount ELSE 0 END) AS ACTUAL_TOTAL,
                (SELECT SUM(budget.amount) * 12 FROM budget WHERE type='debit' AND account_id=$1) - SUM(CASE WHEN txn.type='debit' THEN txn.amount ELSE 0 END) AS DIFF_TOTAL



            FROM
                transaction txn

            RIGHT JOIN budget ON txn.category_id = budget.category_id
            LEFT JOIN category ON txn.category_id = category.id

            WHERE
                txn.type='debit'
                AND txn.account_id=$1
                AND txn.year=$2
        `;
        const values = [accountID, year];
        const query = yield postgres_1.default.query(SQL, values);
        res.status(200).json({ year, debitColumnTotals: query.rows });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
});
exports.getDebitColumnTotals = getDebitColumnTotals;
