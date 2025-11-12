"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Importing Controllers
const debtorTransaction_controller_1 = require("../Controllers/Debtors/DebtorTransaction/debtorTransaction.controller");
// import { getDebtorTransactionByMonth } from "../Controllers/Debtors/DebtorTransaction/debtorTransaction"
router.post("/", debtorTransaction_controller_1.createDebtorTransaction);
router.post("/getDebtorTransactions", debtorTransaction_controller_1.getDebtorTransactionByMonth);
router.post("/getDebtorTransactionByID", debtorTransaction_controller_1.getDebtorTransactionByID);
exports.default = router;
