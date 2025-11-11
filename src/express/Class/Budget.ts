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
    period: string
}

export class Budget {
    constructor(public props: budgetInterface){}

    async createBudget(){

        if (this.props.period === "week" || this.props.period === "month"){
            try {
                const SQL: string = `INSERT INTO budget ("account_id", "category_id", "details", "amount", "table_name", "type", "budget_period") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
                const values: (string | number)[] = [this.props.accountID, this.props.categoryID, this.props.details, this.props.amount, this.props.tableName, this.props.type, this.props.period]
                const query = await pool.query(SQL, values)
                console.log("Budget Created: " + query.rows[0])
                return query.rows[0].id
            } catch (error) {
                throw new Error("Could not create Budget")
            }
        } 
        
        else{ 
            throw new Error("Budget Period Not Applicable: " + this.props.period)
        }
            
        
    }
}
