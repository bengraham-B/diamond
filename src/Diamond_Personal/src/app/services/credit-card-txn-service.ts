import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {TRANSACTION} from "../models/Transaction.model";
import {HttpClient} from "@angular/common/http";
import {UserService} from "./user-service";
import {ServerUrlService} from "./server-url-service";

@Injectable({
  providedIn: 'root',
})
export class CreditCardTxnService {
	serverBase: string;
	accountID: string;
	
	//Y Globally Accessibly TXN
	private creditCardTxnSubject = new BehaviorSubject<TRANSACTION[]>([])
	globalCreditCardTxn = this.creditCardTxnSubject.asObservable();
	
	constructor(
		private http: HttpClient,
		private userService: UserService,
		private serverUrl: ServerUrlService
	) {
		this.accountID = this.userService.accountID;
		this.serverBase = this.serverUrl.baseURL;
	}
	
	// WORKING
	fetchCreditCardTxn( YEAR: number){
		this.http.post<TRANSACTION[]>(`${this.serverBase}/api/credit_card_txn/get_credit_card_txn`, {
			ACCOUNT_ID: this.accountID,
			YEAR: YEAR
		}).subscribe((txns: TRANSACTION[]) => this.creditCardTxnSubject.next(txns))
	}
	
	// WORKING
	addCreditCardTxn(txn: TRANSACTION, month: number){
		txn.ACCOUNT_ID = this.accountID;
		return this.http.post<TRANSACTION>(`${this.serverBase}/api/credit_card_txn/add_credit_card_txn`, txn)
			.subscribe((res) => {
				console.log({res});
				this.fetchCreditCardTxn(month);
			}
		)
	}
	
	editCreditCardTxn(txn: TRANSACTION){
		return this.http.put(`${this.serverBase}/api/edit_credit_card_txn/edit_full_credit_card_txn`, txn)
			.subscribe((res) => {
				console.log({update: res});
				this.fetchCreditCardTxn(2026);
			})
	}
	
	
	
	// WORKING
	deleteCreditCardTxn(txn: TRANSACTION, month: number){
		if(txn.TRANSACTION_SOURCE != "CREDIT_CARD") return;
		
		try {
			return this.http.delete<TRANSACTION>(`${this.serverBase}/api/credit_card_txn/delete_credit_card_txn`, {
				body: txn
			}).subscribe((res) => {
				console.log(res);
				this.fetchCreditCardTxn(month);
			})
			
		} catch (error){
			console.error({error});
			return [];
		}
	}
  
}
