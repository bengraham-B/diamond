"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Importing Controllers
const transactionControllers_1 = require("../Controllers/Transaction/transactionControllers");
const transactionControllers_2 = require("../Controllers/Transaction/transactionControllers");
router.post("/", transactionControllers_1.createTransaction);
router.post("/get_transactions", transactionControllers_2.getTransactions);
router.delete("/delete", transactionControllers_1.deleteTransaction);
router.put("/edit", transactionControllers_1.editTransaction);
router.post("/expense_chart", transactionControllers_1.expenseChart);
exports.default = router;
