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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBudget = void 0;
const Budget_1 = require("../../Class/Budget");
const createBudget = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Create Budget");
    try {
        const { accountID, amount, details, categoryID, type, tableName, period } = req.body;
        const budget = new Budget_1.Budget({ accountID: accountID, details: details, amount: amount, categoryID: categoryID, type: type, tableName: tableName, period: period });
        const id = yield budget.createBudget();
        res.status(200).json({
            msg: "Budget Created Successfully",
            id: id
        });
    }
    catch (error) {
        console.log(`${error}`);
        res.status(500).json({ error: `${error}` });
    }
});
exports.createBudget = createBudget;
