import { Or } from "typeorm";
import pool from "../Database/postgres";

interface budgetInterface {
    ID?: string
    accountID: string
    details: string
    amount: number
    categoryID: string
    tableName: string
    type: string
}

export class Budget {
    constructor(public props: budgetInterface){}

    async createBudget(){
        try {
            const SQL: string = `INSERT INTO budget ("account_id", "category_id", "details", "amount", "table_name", "type") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
            const values: (string | number)[] = [this.props.accountID, this.props.categoryID, this.props.details, this.props.amount, this.props.tableName, this.props.type]
            const query = await pool.query(SQL, values)
            console.log("Budget Created: " + query.rows[0])
            return query.rows[0].id
        } catch (error) {
            throw new Error("Could not create Budget")
        }
    }
        
     
            
        
}

