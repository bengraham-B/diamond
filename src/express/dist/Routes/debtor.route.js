"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Importing Controllers
const debtor_controller_js_1 = require("../Controllers/Debtors/Debtor/debtor.controller.js");
router.post("/", debtor_controller_js_1.createDebtor);
router.post("/get_balance_per_outstanding_debtor", debtor_controller_js_1.getOutstandingBalancePerDebtor);
router.post("/get_debtor_details", debtor_controller_js_1.getDebtorDetails);
exports.default = router;
