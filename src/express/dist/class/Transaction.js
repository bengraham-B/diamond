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
exports.Transaction = void 0;
const postgres_1 = __importDefault(require("../Database/postgres"));
const Functions_1 = require("./Functions");
const hash_1 = require("../functions/hash");
const func = new Functions_1.Functions();
class Transaction {
    constructor(props) {
        this.props = props;
    }
    createTransaction() {
        return __awaiter(this, void 0, void 0, function* () {
            const dateBrokenDown = func.breakDownDate(this.props.date);
            try {
                const hashString = `${this.props.details}+${this.props.amount}+${this.props.supplierID || null}+${this.props.location}+${this.props.type}+${this.props.accountID}+${this.props.categoryID || null}+${this.props.date}+${dateBrokenDown.day}+${dateBrokenDown.week}+${dateBrokenDown.month}+${dateBrokenDown.monthName}+${dateBrokenDown.year}`;
                const SQL = "INSERT INTO transaction(details, amount, supplier_id, location, type, account_id, category_id, date, time, day, week, month, month_name,year, txn_hash, txn_base64) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12 ,$13, $14, $15, $16) RETURNING *;";
                const values = [this.props.details, this.props.amount, this.props.supplierID || null, this.props.location, this.props.type, this.props.accountID, this.props.categoryID || null, this.props.date, this.props.time, dateBrokenDown.day, dateBrokenDown.week, dateBrokenDown.month, dateBrokenDown.monthName, dateBrokenDown.year, (0, hash_1.hashTransaction)(hashString), (0, hash_1.base64Encode)(hashString)];
                const query = yield postgres_1.default.query(SQL, values);
                console.log(`Transaction Added: ${query.rows[0].id}`);
                return { id: query.rows[0].id, returnWeek: query.rows[0].week };
            }
            catch (error) {
                console.error(error);
                throw new Error("Could not insert transaction: " + error);
            }
        });
    }
    getTransactionsByUserID() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const SQL = `SELECT * FROM transaction WHERE account_id=$1`;
                const values = [this.props.accountID];
                const query = yield postgres_1.default.query(SQL, values);
                console.log(`Transaction Added: ${query.rows}`);
                return query.rows;
            }
            catch (error) {
                throw new Error("Could not get transaction: " + error);
            }
        });
    }
}
exports.Transaction = Transaction;
// const tranx1 = new Transaction({pool: pool, ID: "001"})
