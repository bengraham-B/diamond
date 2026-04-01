import { TRANSACTION } from "./Transaction.model"

export interface DisplayTXN {
    date: string
    transaction: TRANSACTION[]
}