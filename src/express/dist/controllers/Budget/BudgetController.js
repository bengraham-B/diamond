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
exports.createBudget = void 0;
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
        console.log(`${error}`);
        res.status(500).json({ error: `${error}` });
    }
});
exports.createBudget = createBudget;
