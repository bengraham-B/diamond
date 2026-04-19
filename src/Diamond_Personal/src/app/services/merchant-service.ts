import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MERCHANT } from '../models/Merchant';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user-service';
import { ServerUrlService } from './server-url-service';

// Models
import { DisplayDataModel } from "../models/DisplayDataModel";

@Injectable({
  providedIn: 'root',
})
export class MerchantService {
	serverBase: string;
	accountID: string;

	// Standard Merchants
	private merchantSubject = new BehaviorSubject<MERCHANT[]>([])
	globalMerchant = this.merchantSubject.asObservable();
	
	// Merchant Monthly Report
	private merchantMonthlyReportSubject = new BehaviorSubject<DisplayDataModel[]>([])
	globalMerchantMonthlyReport = this.merchantMonthlyReportSubject.asObservable();

	constructor(
		private http: HttpClient,
		private userService: UserService,
		private serverURL: ServerUrlService
	){
		this.accountID = this.userService.accountID;
		this.serverBase = this.serverURL.baseURL;

		this.fetchMerchants();
	}

	fetchMerchants(){
		this.http.post<MERCHANT[]>(`${this.serverBase}/api/merchant/get_merchants`, {
			ACCOUNT_ID: this.accountID
		}).subscribe(merchants => this.merchantSubject.next(merchants));
	}
	
	fetchMerchantMonthlyReport(){
		this.http.post<DisplayDataModel[]>(`${this.serverBase}/api/merchant/get_merchants`, {
			ACCOUNT_ID: this.accountID
		}).subscribe(monthlyReport => this.merchantMonthlyReportSubject.next(monthlyReport));
	}
  
}
