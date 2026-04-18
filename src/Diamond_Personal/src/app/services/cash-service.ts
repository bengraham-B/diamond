import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

//Y Models
import { TRANSACTION } from '../models/Transaction.model';

//Y Services
import { HttpClient } from '@angular/common/http';
import { UserService } from './user-service';
import { ServerUrlService } from './server-url-service';

@Injectable({
  providedIn: 'root',
})
export class CashService {
	serverBase: string;
	accountID: string;

	//Y Globally Accessible Cash TXN
	private txnSubject = new BehaviorSubject<TRANSACTION[]>([]);
	globalCashTXN = this.txnSubject.asObservable(); //Y This is accessed in the TXN pages

	constructor(
		private http: HttpClient,
		private userService: UserService,
		private serverURL: ServerUrlService,
	){
		this.accountID = this.userService.accountID
		this.serverBase = this.serverURL.baseURL;

		this.fetchCashTXN(3, 2026)
	}
	
	//* WORKING
	fetchCashTXN(MONTH: number, YEAR: number){
		console.log("FETCHED TXN")
		this.http.post<TRANSACTION[]>(`${this.serverBase}/api/cash_txn/get_cash_txn`, {
			ACCOUNT_ID: this.accountID, //Y This will be obtained from the LocalStorage when the user is Authenticated,
			MONTH,
			YEAR
		}).subscribe(txns => this.txnSubject.next(txns)) //Y okay to subscribe here because it is internal statement management
	}

	//Y Add Cash TXN
	addCashTXN(TXN: TRANSACTION, month: number){
		TXN.ACCOUNT_ID = this.accountID
		return this.http.post<TRANSACTION>(`${this.serverBase}/api/cash_txn/add_cash_txn`,TXN)
			.subscribe((res) =>{
				console.log({res});
				this.fetchCashTXN(month, 2026);
			})
			
	}

	//Y Edit Cash TXN
	editCashTXN(txn: TRANSACTION){
		console.log("END OF EDIT API");
		try{
			return this.http.put(`${this.serverBase}/api/edit_cash_txn/edit_full_cash_txn`, txn)
				.subscribe((res) => {
					console.log(res);
					this.fetchCashTXN(1, 2026);
				})
		} catch (e) {
			console.error({e})
			return null;
		}
	}
	
	

	//Y Delete CASH TXN
	deleteCashTXN(txn: TRANSACTION){
		if(txn.TRANSACTION_SOURCE != "CASH") return;
		
		try{
			return this.http.delete<TRANSACTION>(`${this.serverBase}/api/cash_txn/delete_cash_txn`, {
				body: txn
			}).subscribe((res) => {
				console.log(res)
				this.fetchCashTXN(1, 2026);
			})
		} catch (error) {
			console.log({error})
			return []
		}
	}
}
