"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postgres_1 = require("./Database/postgres");
const cors_1 = __importDefault(require("cors"));
const port = 8000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Importing Routes
const transactionRoutes_1 = __importDefault(require("./Routes/transactionRoutes"));
const accountRoutes_1 = __importDefault(require("./Routes/accountRoutes"));
const debtor_1 = __importDefault(require("./Routes/debtor"));
const debtorTransaction_1 = __importDefault(require("./Routes/debtorTransaction"));
const categoryRoute_1 = __importDefault(require("./Routes/categoryRoute"));
const TransactionAmountRoute_1 = __importDefault(require("./Routes/TransactionAmountRoute"));
const budgetRoute_1 = __importDefault(require("./Routes/budgetRoute"));
const supplierRoute_1 = __importDefault(require("./Routes/supplierRoute"));
app.use('/api/transaction', transactionRoutes_1.default);
app.use('/api/account', accountRoutes_1.default);
app.use('/api/debtor', debtor_1.default);
app.use('/api/debtorTransaction', debtorTransaction_1.default);
app.use('/api/category', categoryRoute_1.default);
app.use('/api/transaction_amount', TransactionAmountRoute_1.default);
app.use('/api/budget', budgetRoute_1.default);
app.use('/api/supplier', supplierRoute_1.default);
app.get("/", (req, res) => {
    res.status(200).json({ data: "TypeScript 23" });
});
app.listen(port, () => {
    (0, postgres_1.verifyConnection)();
    console.log(`Server running: ${port}`);
});
