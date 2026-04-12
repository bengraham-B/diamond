export interface ActualBudgetModel {
	BUDGET_ID : string;
	ACCOUNT_ID: string;
	GL_ACCOUNT_ID : string;
	GL_ACCOUNT_NAME : string;
	GL_ACCOUNT_TYPE : string;
	BUDGET_AMOUNT: number;
	ACTUAL_AMOUNT : number;
	BUDGET_PERIOD: string;
	SURPLUS : string | number;
	DEFICIT: string | number;
	
	BUDGET_VARIANCE: number;
	BUDGET_YEAR_AMOUNT: number;

	JAN: number;
	FEB : number;
	MAR: number;
	APR: number;
	MAY: number;
	JUN: number;
	JUL: number;
	AUG : number;
	SEPT : number;
	OCT : number;
	NOV: number;
	DEC: number;
}
