"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Importing Controllers
const debtorTransaction_1 = require("../Controllers/Debtors/DebtorTransaction/debtorTransaction");
// import { getDebtorTransactionByMonth } from "../Controllers/Debtors/DebtorTransaction/debtorTransaction"
router.post("/", debtorTransaction_1.createDebtorTransaction);
router.post("/getDebtorTransactions", debtorTransaction_1.getDebtorTransactionByMonth);
router.post("/getDebtorTransactionByID", debtorTransaction_1.getDebtorTransactionByID);
router.post("/get_balance_per_outstanding_debtor", debtorTransaction_1.getOutstandingBalancePerDebtor);
exports.default = router;
