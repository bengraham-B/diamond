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
exports.DebtorTransaction = void 0;
const postgres_1 = __importDefault(require("../Database/postgres"));
const Functions_1 = require("./Functions");
const func = new Functions_1.Functions();
class DebtorTransaction {
    constructor(props) {
        this.props = props;
    }
    createDebtorsTransaction() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.props.accountID || !this.props.debtorID || !this.props.date) {
                    throw new Error("AccountID is required");
                }
                console.log(this.props.date);
                // this.props.date = new Date(this.props)
                const dateBrokenDown = func.breakDownDate(new Date(this.props.date));
                const SQL = 'INSERT INTO debtor_transaction(account_id, debtor_id, category_id, type, amount, details, location, supplier_id, date, day, week, month, monthName, year) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING id, week, month, details, amount;';
                const values = [this.props.accountID, this.props.debtorID, this.props.categoryID || null, this.props.type || "", this.props.amount || "", this.props.details || "", this.props.location || "", this.props.supplierID || null, this.props.date, dateBrokenDown.day, dateBrokenDown.week, dateBrokenDown.month, dateBrokenDown.monthName, dateBrokenDown.year];
                const query = yield postgres_1.default.query(SQL, values);
                console.log(`Successfully added Debtors Transaction: ${query.rows[0].id}`);
                return query.rows[0].id;
            }
            catch (error) {
                throw new Error(`Could not add Debtor Transaction: ${error}`);
            }
        });
    }
    getDebtorsByMonth(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.props.accountID || !this.props.debtorID) {
                    throw new Error("AccountID is required");
                }
                const SQL = 'SELECT * FROM debtor_transaction WHERE account_id=$1 AND debtor_id=$2 AND MONTH=$3;';
                const values = [this.props.accountID, this.props.debtorID, this.props.month || 0];
                const query = yield postgres_1.default.query(SQL, values);
                return query.rows;
            }
            catch (error) {
                throw new Error(`Could not GET Debtor Transaction: ${error}`);
            }
        });
    }
    getDebtorTransactionByID(ID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const SQL = 'SELECT * FROM debtor_transaction WHERE id=$1';
                const values = [ID];
                const query = yield postgres_1.default.query(SQL, values);
                return query.rows;
            }
            catch (error) {
                throw new Error(`Could not GET Debtor Transaction By ID: ${error}`);
            }
        });
    }
}
exports.DebtorTransaction = DebtorTransaction;
