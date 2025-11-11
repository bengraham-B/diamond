import pool from "../Database/postgres";

interface balanceInterface {
    ID?:string,
    accountID: string,
    userAmount: number
}

export class Balance {

    constructor(public props: balanceInterface){}

    async getTransactionOverAmount(){
        try {
            const SQL: string = `SELECT *

                FROM transaction
                WHERE 
                    account_id =$1 AND

                    CASE 
                        WHEN amount > $2 THEN 1 ELSE 0 
                END = 1;`
            const values = [this.props.accountID, this.props.userAmount]
            return await pool.query(SQL, values)
 
        } catch (error) {
            throw new Error(`Could not get get balance over R${this.props.userAmount} - ` + error)
        }
    }
   
    async getTransactionUnderAmount(){
        try {
            const SQL: string = `SELECT *

                FROM transaction
                WHERE 
                    account_id =$1 AND

                    CASE 
                        WHEN amount < $2 THEN 1 ELSE 0 
                END = 1;`
            const values = [this.props.accountID, this.props.userAmount]
            return await pool.query(SQL, values)
 
        } catch (error) {
            throw new Error(`Could not get get balance under R${this.props.userAmount} - ` + error)
        }
    }

}