"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postgres_1 = require("./Database/postgres");
const cors_1 = __importDefault(require("cors"));
const port = 8000;
const host = process.env.DB_HOST || "";
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Importing Routes
const transaction_route_js_1 = __importDefault(require("./Routes/transaction.route.js"));
const account_route_js_1 = __importDefault(require("./Routes/account.route.js"));
const auth_route_1 = __importDefault(require("./Routes/auth.route"));
const debtor_route_js_1 = __importDefault(require("./Routes/debtor.route.js"));
const debtorTransaction_route_js_1 = __importDefault(require("./Routes/debtorTransaction.route.js"));
const category_route_js_1 = __importDefault(require("./Routes/category.route.js"));
const TransactionAmount_route_js_1 = __importDefault(require("./Routes/TransactionAmount.route.js"));
const budget_route_js_1 = __importDefault(require("./Routes/budget.route.js"));
const supplierRoute_route_js_1 = __importDefault(require("./Routes/supplierRoute.route.js"));
app.use('/api/account', account_route_js_1.default);
app.use('/api/auth', auth_route_1.default);
app.use('/api/category', category_route_js_1.default);
app.use('/api/budget', budget_route_js_1.default);
app.use('/api/debtor', debtor_route_js_1.default);
app.use('/api/debtorTransaction', debtorTransaction_route_js_1.default);
app.use('/api/supplier', supplierRoute_route_js_1.default);
app.use('/api/transaction', transaction_route_js_1.default);
app.use('/api/transaction_amount', TransactionAmount_route_js_1.default);
app.get("/", (req, res) => {
    res.status(200).json({ data: "TypeScript 23" });
});
app.listen(port, () => {
    (0, postgres_1.verifyConnection)();
    console.log(`Server running: [${host}]:${port}`);
});
