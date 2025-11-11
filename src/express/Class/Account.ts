import pool from "../Database/postgres"

interface accountInterface {
    ID?: string
    name: string
    details?: string
}

export class Account {
    constructor(public props: accountInterface){}

    async createAccount(){
        try {
            const SQL: string = "INSERT INTO account(name, details) VALUES($1, $2) RETURNING id;" 
            const values: String[] = [this.props.name, this.props.details = "NA"]
            const query = await pool.query(SQL, values)
            console.log(`Account Added: ${query.rows[0].id}`)
        } catch (error) {
            console.error(error)
            throw new Error("Could not insert account: " + error)
        }
    }
}