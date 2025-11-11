import pool from "../Database/postgres"
import { Functions } from "./Functions"
import { hashTransaction, base64Encode } from '../functions/hash'

const func = new Functions()

interface transactionInterface {
    // pool: Connection
    ID?: string
    details: string
    amount: number
    supplierID?: string
    location?: string
    type: string
    accountID: string
    categoryID?: string
    date: Date
    day: number
    week: number
    month: number
    monthName: string
    year: number
    timeStamp?: string
}

export class Transaction {

    constructor( public props: transactionInterface){}

    async createTransaction(){
        const dateBrokenDown = func.breakDownDate(this.props.date)
        try {
            const hashString = `${this.props.details}+${this.props.amount}+${this.props.supplierID || null}+${this.props.location}+${this.props.type}+${this.props.accountID}+${this.props.categoryID || null}+${this.props.date}+${dateBrokenDown.day}+${dateBrokenDown.week}+${dateBrokenDown.month}+${dateBrokenDown.monthName}+${dateBrokenDown.year}`
            
            const SQL: string = "INSERT INTO transaction(details, amount, supplier_id, location, type, account_id, category_id, date, day, week, month, month_name,year, txn_hash, txn_base64) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12 ,$13, $14, $15) RETURNING *;"
            const values = [this.props.details, this.props.amount, this.props.supplierID || null, this.props.location, this.props.type, this.props.accountID, this.props.categoryID || null , this.props.date, dateBrokenDown.day, dateBrokenDown.week, dateBrokenDown.month, dateBrokenDown.monthName , dateBrokenDown.year, hashTransaction(hashString),base64Encode(hashString) ]
            const query = await pool.query(SQL, values)
            console.log(`Transaction Added: ${query.rows[0].id}`)
            return {id: query.rows[0].id, returnWeek: query.rows[0].week}
        } catch (error) {
            console.error(error)
            throw new Error("Could not insert transaction: " + error)
        }
    }

    async getTransactionsByUserID(){
        try {
            const SQL: string = `SELECT * FROM transaction WHERE account_id=$1`
            const values: (string | number)[] = [this.props.accountID]
            const query = await pool.query(SQL, values)
            console.log(`Transaction Added: ${query.rows}`)
            return query.rows
        } catch (error) {
            throw new Error("Could not get transaction: " + error)
        }
    }

}

// const tranx1 = new Transaction({pool: pool, ID: "001"})