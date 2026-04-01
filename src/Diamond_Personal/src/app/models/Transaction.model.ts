import { GL_ACCOUNT } from "./GL_ACCOUNT"

export interface TRANSACTION {
	ACCOUNT_ID: string
	TRANSACTION_ID?: string
	TRANSACTION_SOURCE: string //Y CASH | CREDIT_CARD_TXN | DEBTOR_TXN | CREDITOR_TXN

	DETAILS: string
	AMOUNT: number
	TYPE: "INCOME" | "EXPENSE" | "REPAID" | "INCREASE" | "DECREASE" | "ASSET" | string

	GL_ACCOUNT?: GL_ACCOUNT
	GL_CODE?: number

	MERCHANT_NAME?: string
	MERCHANT_ID?: string
	
	RECEIVABLE?: Boolean
	DEBTOR_ID?: String
	DEBTOR_NAME?: String

	DATE: Date | null | string // Required for user selected date
	DAY?: number
	DAY_OF_WEEK?: string
	WEEK?: number
	MONTH?: number
	MONTH_NAME?: string
	YEAR?: number
	CREATED?: Date
}
