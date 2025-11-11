import pool from "../Database/postgres"

interface categoryInterface{
    ID?: string
    accountID: string
    name: string
    details: string
}

export class Category {
    constructor(public props: categoryInterface){}

    async createCategory(){
        try {
            const SQL: string = `INSERT INTO category(account_id, name, details) VALUES($1, $2, $3) RETURNING id;`
            const values: string[] = [this.props.accountID, this.props.name, this.props.details]
            const query = await pool.query(SQL, values)
            console.log(query.rows[0].id)
        } catch (error) {
            throw new Error(`Could not add Category: ${error}`)
        }
    }
}