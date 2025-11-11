import pool from "../Database/postgres"

interface debtorInterface {
    ID?: string
    name: string
    details: string
    accountID: string
}

export class Debtor {

    constructor(public props: debtorInterface){}

    async createDebtor(){
        try {
            const SQL: string = "INSERT INTO debtor (name, details, account_id) VALUES($1, $2, $3) RETURNING id;"
            const values: string[] = [this.props.name, this.props.details, this.props.accountID]
            const query = await pool.query(SQL, values)
            console.log(`Debtor Added: ${query.rows[0].id}`)
        } catch(error){
            console.error(error)
            throw new Error("Could not insert debtor: " + error)
        }

    }
}