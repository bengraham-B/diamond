export interface CASH {
    transactionID?: string
    accountID: string

    amount: number
    details: string
    transactionType: "DEBIT"| "CREDIT" //Y This is used for Diamond
    userType: "INCOME" | "EXPENSE" //Y This is used for a simplified view for the user

    categoryID?: string
    categoryName?: string

    supplierID?: string
    supplierName?: string

    date: Date
    day: number
    dayOfWeek: string
    week: number
    month: number
    monthName: string
    year: number
}