"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const BalanceController_1 = require("../Controllers/Balance/BalanceController");
const BalanceController_2 = require("../Controllers/Balance/BalanceController");
const router = express_1.default.Router();
router.post("/transaction_over_amount", BalanceController_1.getTransactionOverAmount);
router.post("/transaction_under_amount", BalanceController_2.getTransactionUnderAmount);
exports.default = router;
