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
exports.getDebtorDetails = exports.getOutstandingBalancePerDebtor = exports.createDebtor = void 0;
const Debtor_1 = require("../../../Class/Debtor");
const postgres_1 = __importDefault(require("../../../Database/postgres"));
const createDebtor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, details, accountID } = req.body;
        const debtor = new Debtor_1.Debtor({ name: name, details: details, accountID: accountID });
        debtor.createDebtor();
        res.status(200).json({ msg: "Added Debtor Successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.createDebtor = createDebtor;
const getOutstandingBalancePerDebtor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accountID } = req.body;
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
const getDebtorDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
    }
});
exports.getDebtorDetails = getDebtorDetails;
