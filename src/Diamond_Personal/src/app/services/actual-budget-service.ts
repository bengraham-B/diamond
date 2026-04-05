import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserService} from "./user-service";
import {ServerUrlService} from "./server-url-service";
import {BehaviorSubject, Observable} from "rxjs";
import {ActualBudgetModel} from "../models/ActualBudgetModel";

@Injectable({
  providedIn: 'root',
})
export class ActualBudgetService {
	serverBase: string;
	accountID: string;
	
	private actualBudgetSubject: BehaviorSubject<ActualBudgetModel[]> = new BehaviorSubject<ActualBudgetModel[]>([]);
	globalActualBudget: Observable<ActualBudgetModel[]> = this.actualBudgetSubject.asObservable(); // This is accessed when getting budgets
	
	private UnbudgetedItemsSubject: BehaviorSubject<ActualBudgetModel[]> = new BehaviorSubject<ActualBudgetModel[]>([]);
	globalUnbudgetedItem: Observable<ActualBudgetModel[]> = this.UnbudgetedItemsSubject.asObservable(); // This is accessed when getting budgets
	
	
	constructor(
		private http: HttpClient,
		private userService: UserService,
		private serverURL: ServerUrlService
	) {
		this.accountID = this.userService.accountID;
		this.serverBase = this.serverURL.baseURL;
		
		this.fetchActualBudgets();
	}
	
	fetchActualBudgets(){
		this.http.post<ActualBudgetModel[]>(`${this.serverBase}/api/actual_budget/get_actual_budgets`, {
			ACCOUNT_ID: this.accountID
		}).subscribe(actualBudgets => this.actualBudgetSubject.next(actualBudgets));
	}
	
	fetchUnbudgetedItems(){
		this.http.post<ActualBudgetModel[]>(`${this.serverBase}/api/actual_budget/get_unbudgeted_items`, {
			ACCOUNT_ID: this.accountID
		}).subscribe(unbudetedItems => this.UnbudgetedItemsSubject.next(unbudetedItems));
	}
}
