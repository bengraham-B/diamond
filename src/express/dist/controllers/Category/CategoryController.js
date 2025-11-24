"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getUserCategories = exports.createCategory = void 0;
const Category_1 = require("../../Class/Category");
const postgres_1 = __importDefault(require("../../Database/postgres"));
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, details, accountID } = req.body;
        const category = new Category_1.Category({ name: name, details: details, accountID: accountID });
        category.createCategory();
        res.status(200).json({ msg: "Created Category Successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.createCategory = createCategory;
const getUserCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { accountID } = req.body;
        const SQL = `SELECT * FROM category WHERE account_id=$1 ORDER BY name ASC`;
        const values = [accountID];
        return res.status(200).json({ categories: (yield postgres_1.default.query(SQL, values)).rows });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.getUserCategories = getUserCategories;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, details, accountID, categoryID } = req.body;
        const SQL = `UPDATE category SET name=$1, details=$2 WHERE id=$3 AND account_id=$4`;
        const values = [name, details, categoryID, accountID];
        const query = yield postgres_1.default.query(SQL, values);
        if ((query.rowCount || 0) === 0)
            return res.status(500).json({ msg: `Could not update Category` });
        return res.status(200).json({ msg: `Category Update Successfully` });
    }
    catch (error) {
        console.error(`Could not update Category: ${error}`);
        res.status(500).json({ error: error });
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //TODO: Remove category from TXN which have it as their categoryID
        const { categoryID, accountID } = req.body;
        console.log({ categoryID, accountID });
        const SQL = `DELETE FROM category WHERE id=$1 AND account_id=$2`;
        const query = yield postgres_1.default.query(SQL, [categoryID, accountID]);
        if ((query.rowCount || 0) === 0)
            return res.status(500).json({ msg: `Could not delete Category` });
        return res.status(200).json({ msg: `Category Update Successfully` });
    }
    catch (error) {
        console.error(`Could not update Category: ${error}`);
        res.status(500).json({ error: error });
    }
});
exports.deleteCategory = deleteCategory;
