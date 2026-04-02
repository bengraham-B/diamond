import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {BudgetModel} from "../models/BudgetModel";
import { HttpClient } from '@angular/common/http';

// Service
import {UserService} from "./user-service";
import {ServerUrlService} from "./server-url-service";


@Injectable({
  providedIn: 'root',
})
export class BudgetService {
	serverBase: string;
	accountID: string;
	
	private budgetSubject: BehaviorSubject<BudgetModel[]> = new BehaviorSubject<BudgetModel[]>([])
	globalBudget: Observable<BudgetModel[]> = this.budgetSubject.asObservable(); // This is accessed when getting budgets
	
	constructor(
		private http: HttpClient,
		private userService: UserService,
		private serverURL: ServerUrlService
	) {
		this.accountID = this.userService.accountID;
		this.serverBase = this.serverURL.baseURL;
		
		this.fetchBudgets();
	}
	
	fetchBudgets(){
		this.http.post<BudgetModel[]>(`${this.serverBase}/api/budget/get_budgets`, {
			ACCOUNT_ID: this.accountID
		}).subscribe(budgets => this.budgetSubject.next(budgets))
	}
  
}
