"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const SupplierController_1 = require("../Controllers/Supplier/SupplierController");
router.post("/get_user_suppliers", SupplierController_1.getUserSuppliers);
exports.default = router;
