import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TRANSACTION } from '../../models/Transaction.model';

import { TxnPage} from "../../txn/txn-page/txn-page";
import {AsyncPipe} from "@angular/common";
import {CreditCardTxnService} from "../../services/credit-card-txn-service";
import {DateService} from "../../services/date-service";
import {DiamondTxnModel} from "../../models/DiamondTxnModel";
import {DiamondTxnService} from "../../services/diamond-txn-service";

@Component({
    selector: 'app-credit-card-page',
	imports: [TxnPage, AsyncPipe],
    templateUrl: './credit-card-page.html',
    styleUrl: './credit-card-page.css',
})
export class CreditCardPage {

	txn$!: Observable<DiamondTxnModel[]>

	constructor(
		private creditCardTxnService: CreditCardTxnService,
		public dateService: DateService,
		public diamondTxnService: DiamondTxnService
	
	){
		this.txn$ = this.diamondTxnService.globalDiamondTxn
		this.diamondTxnService.fetchDiamondTxn();
	}
}
