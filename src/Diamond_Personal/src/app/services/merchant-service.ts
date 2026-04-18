import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MERCHANT } from '../models/Merchant';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user-service';
import { ServerUrlService } from './server-url-service';

@Injectable({
  providedIn: 'root',
})
export class MerchantService {
	serverBase: string;
	accountID: string;

	private merchantSubject = new BehaviorSubject<MERCHANT[]>([])
	globalMerchant = this.merchantSubject.asObservable();

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
		}).subscribe(merchants => this.merchantSubject.next(merchants))
	}
  
}
