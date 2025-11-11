"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Importing Controllers
const CategoryController_1 = require("../Controllers/Category/CategoryController");
router.post("/", CategoryController_1.createCategory);
router.post("/get_user_categories", CategoryController_1.getUserCategories);
// router
exports.default = router;
