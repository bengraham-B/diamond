import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

//Y Models
import { GL_ACCOUNT } from '../models/GL_ACCOUNT';
import { RequestParams } from '../models/RequestParams';
import { UserService } from './user-service';
import { ServerUrlService } from './server-url-service';
import {DisplayDataModel} from "../models/DisplayDataModel";

@Injectable({
  providedIn: 'root',
})
export class GLACCOUNTService {
  	serverBase: string;
	accountID: string;

	//Y Globally Accessible GL_ACCOUNT
	private GL_ACCOUNTS_subject = new BehaviorSubject<GL_ACCOUNT[]>([]);
	globalGL_ACCOUNTS = this.GL_ACCOUNTS_subject.asObservable();
	
	// Merchant Monthly Report
	private GLAccountMonthlyReportSubject = new BehaviorSubject<DisplayDataModel[]>([])
	globalGLAccountMonthlyReport = this.GLAccountMonthlyReportSubject.asObservable();
	
	
	constructor(
		private http: HttpClient,
		private userService: UserService,
		private serverURL: ServerUrlService
	){
		this.accountID = this.userService.accountID;
		this.serverBase = this.serverURL.baseURL;
		
		this.fetch_GL_ACCOUNTS({ACCOUNT_ID: this.accountID});
		this.fetchGLAccountMonthlyReport();
	}

	fetch_GL_ACCOUNTS(requestParams: RequestParams){
		this.http.post<GL_ACCOUNT[]>(`${this.serverBase}/api/gl_accounts/get_gl_accounts`, requestParams)
			.subscribe(GL_ACCOUNTS => this.GL_ACCOUNTS_subject.next(GL_ACCOUNTS));
	}
	
	fetchGLAccountMonthlyReport(){
		this.http.post<DisplayDataModel[]>(`${this.serverBase}/api/gl_account_report/month_gl_account_report`, {
			ACCOUNT_ID: this.accountID
		}).subscribe(report => this.GLAccountMonthlyReportSubject.next(report));
	}
}
