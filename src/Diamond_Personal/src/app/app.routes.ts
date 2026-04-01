import { Routes } from '@angular/router';

// Transaction Pages
import { CashPage } from './pages/cash-page/cashPage';
import { CreditCardPage } from "./pages/credit-card-page/credit-card-page";
import { HomePage } from "./pages/home-page/home-page";
import {BudgetPage} from "./pages/budget-page/budget-page";

export const routes: Routes = [
    {
        path: 'home',
        component: HomePage
    },
    {
        path: 'cash-txn',
        component: CashPage
    },
    {
        path: 'credit-card',
        component: CreditCardPage
    },
	{
		path: 'budget',
		component: BudgetPage
	}
];
