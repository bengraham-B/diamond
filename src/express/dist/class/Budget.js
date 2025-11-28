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
exports.Budget = void 0;
const postgres_1 = __importDefault(require("../Database/postgres"));
class Budget {
    constructor(props) {
        this.props = props;
    }
    createBudget() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const SQL = `INSERT INTO budget ("account_id", "category_id", "details", "amount", "table_name", "type") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
                const values = [this.props.accountID, this.props.categoryID, this.props.details, this.props.amount, this.props.tableName, this.props.type];
                const query = yield postgres_1.default.query(SQL, values);
                console.log("Budget Created: " + query.rows[0]);
                return query.rows[0].id;
            }
            catch (error) {
                throw new Error("Could not create Budget");
            }
        });
    }
}
exports.Budget = Budget;
