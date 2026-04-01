export interface CreditCardTXN {
    creditCardID?: string
    transactionID?: string
    accountID: string

    source?: "DEBTOR_TXN" | "CREDIT_CARD_TXN" | "CREDITOR_TXN" | "CASH"

    amount: number
    details: string
    type: "income" | "expense" //Y For DIamond Personal it will be simplified

    categoryID?: string
    categoryName?: string

    supplierID?: string
    supplierName?: string

    date: Date
    day?: number
    dayOfWeek?: string
    month?: number
    monthName?: string
    year?: number

}