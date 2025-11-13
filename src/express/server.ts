import  express, {Express, Request, Response}  from "express"
import { verifyConnection } from "./Database/postgres"
import cors from "cors"

const port: Number = 8000
const host: string = process.env.DB_HOST || ""
const app: Express = express()

app.use(express.json());
app.use(cors())

// Importing Routes
import transaction from "./Routes/transaction.route.js"
import account from "./Routes/account.route.js"
import debtor from "./Routes/debtor.route.js"
import debtorTransaction from "./Routes/debtorTransaction.route.js"
import category from "./Routes/category.route.js"
import transactionAmount from "./Routes/TransactionAmount.route.js"
import budget from "./Routes/budget.route.js"
import supplier from "./Routes/supplierRoute.route.js"

app.use('/api/transaction', transaction)
app.use('/api/account', account)
app.use('/api/debtor', debtor)
app.use('/api/debtorTransaction', debtorTransaction)
app.use('/api/category', category)
app.use('/api/transaction_amount', transactionAmount)
app.use('/api/budget', budget)
app.use('/api/supplier',supplier)

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({data:"TypeScript 23"})
})

app.listen(port, () => {
    verifyConnection()    
    console.log(`Server running: [${host}]:${port}`)
})