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
exports.getTransactionUnderAmount = exports.getTransactionOverAmount = void 0;
const TransactionAmount_1 = require("../../Class/TransactionAmount");
const getTransactionOverAmount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userAmount, accountID } = req.body;
    try {
        console.log(req.body);
        const balance = new TransactionAmount_1.Balance({ accountID: accountID, userAmount: userAmount });
        res.status(200).json({
            txn: (yield balance.getTransactionOverAmount()).rows
        });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.getTransactionOverAmount = getTransactionOverAmount;
const getTransactionUnderAmount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userAmount, accountID } = req.body;
    try {
        console.log(req.body);
        const balance = new TransactionAmount_1.Balance({ accountID: accountID, userAmount: userAmount });
        res.status(200).json({
            txn: (yield balance.getTransactionUnderAmount()).rows
        });
    }
    catch (error) {
        res.status(500).json({ error: `${error}` });
    }
});
exports.getTransactionUnderAmount = getTransactionUnderAmount;
