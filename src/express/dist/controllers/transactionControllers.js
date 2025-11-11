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
exports.createTransaction = void 0;
//^ Importing Class
const Transaction_1 = require("../Class/Transaction");
const createTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transaction = new Transaction_1.Transaction({ pool: "DB", ID: "" });
        transaction.createTransaction();
        res.status(200).json({ msg: "A" });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.createTransaction = createTransaction;
