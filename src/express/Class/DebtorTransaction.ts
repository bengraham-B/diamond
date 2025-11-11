import pool from "../Database/postgres"
import { TypeEnum } from "../Enum/TypeEnum"
import { Functions } from "./Functions"

const func = new Functions()

interface debtorTransactionInterface {
    ID?: string
    accountID: string
    debtorID: string
    categoryID?: string
    
    type: TypeEnum
    amount?: number
    details?: string
    location?: string
    supplierID?: string

    date?: Date
    day?: number
    week?: number
    month?: number
    monthName?: string
    year?: number
}

interface getDebtorTransactions {
    accountID: string
    debtorID: string
    month: number

}

export class DebtorTransaction {
    constructor(public props: Partial<debtorTransactionInterface>){}

   
    async createDebtorsTransaction(){
        try {
            if(!this.props.accountID|| !this.props.debtorID || !this.props.date){
                throw new Error("AccountID is required")
            }
            console.log(this.props.date )
            // this.props.date = new Date(this.props)
            const dateBrokenDown = func.breakDownDate(new Date(this.props.date))
            const SQL: string = 'INSERT INTO debtor_transaction(account_id, debtor_id, category_id, type, amount, details, location, supplier_id, date, day, week, month, monthName, year) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING id, week, month, details, amount;'
            const values: (string | number | Date | null) [] = [this.props.accountID, this.props.debtorID, this.props.categoryID || null, this.props.type || "", this.props.amount || "", this.props.details || "", this.props.location || "", this.props.supplierID || null, this.props.date, dateBrokenDown.day, dateBrokenDown.week, dateBrokenDown.month, dateBrokenDown.monthName, dateBrokenDown.year]
            const query = await pool.query(SQL, values)
            console.log(`Successfully added Debtors Transaction: ${query.rows[0].id}`)
            return query.rows[0].id
        } catch (error) {
            throw new Error(`Could not add Debtor Transaction: ${error}`)
        }
    }

    async getDebtorsByMonth(input: getDebtorTransactions){
        try {
            if(!this.props.accountID|| !this.props.debtorID){
                throw new Error("AccountID is required")
            }
            const SQL: string = 'SELECT * FROM debtor_transaction WHERE account_id=$1 AND debtor_id=$2 AND MONTH=$3;'
            const values: (string | number)[] = [this.props.accountID, this.props.debtorID, this.props.month || 0]
            const query = await pool.query(SQL, values)
            return query.rows
        } catch (error) {
            throw new Error(`Could not GET Debtor Transaction: ${error}`)
        }
    }

    async getDebtorTransactionByID(ID: string){
        try {
            const SQL: string = 'SELECT * FROM debtor_transaction WHERE id=$1'
            const values: string[] = [ID]
            const query = await pool.query(SQL, values)
            return query.rows
        } catch (error) {
            throw new Error(`Could not GET Debtor Transaction By ID: ${error}`)
            
        }
    }
}