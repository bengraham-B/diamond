import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {DiamondTxnModel} from "../models/DiamondTxnModel";
import {HttpClient} from "@angular/common/http";
import {UserService} from "./user-service";
import {ServerUrlService} from "./server-url-service";
import {RequestBodyModel} from "../models/RequestBodyModel";

@Injectable({
  providedIn: 'root',
})
export class DiamondTxnService {
	javaServiceBase: string;
	accountID: string;
	
	//Y Globally Accessible
	private diamondTxnSubject = new BehaviorSubject<DiamondTxnModel[]>([])
    globalDiamondTxn = this.diamondTxnSubject.asObservable();
	
	constructor(
		private http: HttpClient,
		private userService: UserService,
		private serverURL: ServerUrlService,
	) {
		this.accountID = this.userService.accountID
		this.javaServiceBase = this.serverURL.javaServerURL;
	}
	
	fetchDiamondTxn(){
		this.http.post<DiamondTxnModel[]>(`${this.javaServiceBase}/api/diamond_transaction/get_diamond_transactions`,{
			ACCOUNT_ID: this.accountID
		}).subscribe(diamondTxns => this.diamondTxnSubject.next(diamondTxns))
	}
	
	addDiamondTxn(DIAMOND_TXN:DiamondTxnModel){
		return this.http.post(`${this.javaServiceBase}/api/diamond_transaction/add_diamond_transaction`, DIAMOND_TXN)
			.subscribe(
				(res) => {
					this.fetchDiamondTxn();
				}
			)
	}
	
	editDiamondTxn(DIAMOND_TXN:DiamondTxnModel){
		return this.http.put(`${this.javaServiceBase}/api/diamond_transaction/edit_diamond_transaction`,DIAMOND_TXN)
			.subscribe(
				(res) => {
					this.fetchDiamondTxn();
				}
			)
	}

	deleteDiamondTxn(txn: DiamondTxnModel){
		return this.http.delete<RequestBodyModel>(`${this.javaServiceBase}/api/diamond_transaction/delete_diamond_transaction`, {
			body: {
				ACCOUNT_ID: txn.ACCOUNT_ID,
				DIAMOND_TRANSACTION_ID: txn.DIAMOND_TRANSACTION_ID
			}
		}).subscribe(
			(res) => {
				this.fetchDiamondTxn();
			}
		)
	}
}
