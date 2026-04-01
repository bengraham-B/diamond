export interface DiamondTxnModel{
	DIAMOND_TRANSACTION_ID?: string
	ACCOUNT_ID: string
	AMOUNT: number
	DETAILS: string
	TXN_TYPE: string // INCOME | EXPENSE | INCREASE | DECREASE
	SOURCE: string // CASH | CREDIT_CARD
	GL_ACCOUNT_ID: string
	GL_ACCOUNT_NAME?: string
	GL_ACCOUNT_TYPE?: string
	MERCHANT_ID?: string
	MERCHANT_NAME?: string
	RECEIVABLE?: boolean
	DEBTOR_ID?: string
	DATE: string
	DAY?: number
	DAY_OF_WEEK?: string
	DAY_OF_YEAR?: number
	WEEK?: number
	MONTH?: number
}
