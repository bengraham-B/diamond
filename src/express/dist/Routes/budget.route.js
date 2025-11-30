"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const Budget_controller_1 = require("../Controllers/Budget/Budget.controller");
const BudgetTotals_controller_1 = require("../Controllers/Budget/BudgetTotals.controller");
const BudgetDebitTable_controller_1 = require("../Controllers/Budget/BudgetDebitTable.controller");
const BudgetCreditTable_controller_1 = require("../Controllers/Budget/BudgetCreditTable.controller");
const BudgetColumn_controller_1 = require("../Controllers/Budget/BudgetColumn.controller");
router.post("/create_budget", Budget_controller_1.createBudget);
router.post("/get_budget", Budget_controller_1.getBudget);
//Y --------- Budget Table ---------
router.post("/credit_budget_table", BudgetCreditTable_controller_1.getBudgetCreditTable);
router.post("/debit_budget_table", BudgetDebitTable_controller_1.getBudgetDebitTable);
//Y --------- Budget Totals ---------
router.post("/credit_budget_total", BudgetTotals_controller_1.budgetCreditTotal);
router.post("/debit_budget_total", BudgetTotals_controller_1.budgetDebitTotal);
//Y --------- Column Totals Totals ---------
router.post("/credit_column_totals", BudgetColumn_controller_1.getCreditColumnTotals);
router.post("/debit_column_totals", BudgetColumn_controller_1.getDebitColumnTotals);
exports.default = router;
