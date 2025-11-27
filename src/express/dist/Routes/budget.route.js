"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const BudgetController_1 = require("../Controllers/Budget/BudgetController");
router.post("/create_budget", BudgetController_1.createBudget);
exports.default = router;
