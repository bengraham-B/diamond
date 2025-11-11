import  express, {Express, Request, Response}  from "express"
import { verifyConnection } from "./Database/postgres"
import cors from "cors"

const port: Number = 8000
const app: Express = express()

app.use(express.json());
app.use(cors())

// Importing Routes
import transaction from "./Routes/transactionRoutes"
import account from "./Routes/accountRoutes"
import debtor from "./Routes/debtor"
import debtorTransaction from "./Routes/debtorTransaction"
import category from "./Routes/categoryRoute"
import transactionAmount from "./Routes/TransactionAmountRoute"
import budget from "./Routes/budgetRoute"
import supplier from "./Routes/supplierRoute"

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
    console.log(`Server running: ${port}`)
})