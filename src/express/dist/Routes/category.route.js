"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Importing Controllers
const Category_controller_1 = require("../Controllers/Category/Category.controller");
router.post("/", Category_controller_1.createCategory);
router.post("/get_user_categories", Category_controller_1.getUserCategories);
router.post("/balance_per_debtor_&_txn", Category_controller_1.balancePerDebtorAdnTxn);
router.put("/", Category_controller_1.updateCategory);
router.delete("/", Category_controller_1.deleteCategory);
exports.default = router;
