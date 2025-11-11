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
exports.Account = void 0;
const postgres_1 = __importDefault(require("../Database/postgres"));
class Account {
    constructor(props) {
        this.props = props;
    }
    createAccount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const SQL = "INSERT INTO account(name, details) VALUES($1, $2) RETURNING id;";
                const values = [this.props.name, this.props.details = "NA"];
                const query = yield postgres_1.default.query(SQL, values);
                console.log(`Account Added: ${query.rows[0].id}`);
            }
            catch (error) {
                console.error(error);
                throw new Error("Could not insert account: " + error);
            }
        });
    }
}
exports.Account = Account;
