"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Importing Controllers
const transaction_controller_1 = require("../Controllers/Transaction/transaction.controller");
const transaction_controller_2 = require("../Controllers/Transaction/transaction.controller");
router.post("/", transaction_controller_1.createTransaction);
router.post("/get_transactions", transaction_controller_2.getTransactions);
router.delete("/delete", transaction_controller_1.deleteTransaction);
router.put("/edit", transaction_controller_1.editTransaction);
router.post("/expense_chart", transaction_controller_1.expenseChart);
exports.default = router;
