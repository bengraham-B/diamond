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
exports.getDebtors = exports.createDebtor = void 0;
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
const getDebtors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accountID } = req.body;
        const SQL = `SELECT * FROM debtor WHERE account_id=$1`;
        const values = [accountID];
        const query = yield postgres_1.default.query(SQL, values);
        res.status(200).json({ debtors: query.rows });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.getDebtors = getDebtors;
