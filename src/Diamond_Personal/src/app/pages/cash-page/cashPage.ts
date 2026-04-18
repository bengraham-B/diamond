import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';

//Y RxJS | Angular
import { Observable } from 'rxjs';

//Y Pages
import { TxnPage } from '../../txn/txn-page/txn-page';

//Y Services

//Y Models
import {DiamondTxnService} from "../../services/diamond-txn-service";
import {DiamondTxnModel} from "../../models/DiamondTxnModel"; //Y This model is used to display TXN on the Table

@Component({
  selector: 'app-cash-page',
  imports: [TxnPage, AsyncPipe],
  templateUrl: './cashPage.html',
  styleUrl: './cashPage.css',
})
export class CashPage {
	
	txn$!: Observable<DiamondTxnModel[]> //Y Getting global objects from Services

	constructor(
		public diamondTxnService: DiamondTxnService
	
	){
		this.txn$ = this.diamondTxnService.globalDiamondTxn
		this.diamondTxnService.fetchDiamondTxn();
	}
}
