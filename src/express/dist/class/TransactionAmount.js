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
exports.Balance = void 0;
const postgres_1 = __importDefault(require("../Database/postgres"));
class Balance {
    constructor(props) {
        this.props = props;
    }
    getTransactionOverAmount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const SQL = `SELECT *

                FROM transaction
                WHERE 
                    account_id =$1 AND

                    CASE 
                        WHEN amount > $2 THEN 1 ELSE 0 
                END = 1;`;
                const values = [this.props.accountID, this.props.userAmount];
                return yield postgres_1.default.query(SQL, values);
            }
            catch (error) {
                throw new Error(`Could not get get balance over R${this.props.userAmount} - ` + error);
            }
        });
    }
    getTransactionUnderAmount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const SQL = `SELECT *

                FROM transaction
                WHERE 
                    account_id =$1 AND

                    CASE 
                        WHEN amount < $2 THEN 1 ELSE 0 
                END = 1;`;
                const values = [this.props.accountID, this.props.userAmount];
                return yield postgres_1.default.query(SQL, values);
            }
            catch (error) {
                throw new Error(`Could not get get balance under R${this.props.userAmount} - ` + error);
            }
        });
    }
}
exports.Balance = Balance;
