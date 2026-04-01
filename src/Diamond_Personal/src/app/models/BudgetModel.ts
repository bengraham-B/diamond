export interface BudgetModel {
	BUDGET_ID: string;
	ACCOUNT_ID: string
	GL_ACCOUNT_ID: string;
	GL_ACCOUNT_NAME: string;
	GL_ACCOUNT_TYPE: string;
	BUDGET_AMOUNT: number;
	ACTUAL_AMOUNT: number;
	PERIOD: "WEEK" | "MONTH"
}
