import { Component, Input } from '@angular/core';

//Y Componets
import { TxnTable } from '../txn-table/txn-table';
import { Aside } from '../aside/aside';
import { ROUTER_CONFIGURATION } from '@angular/router';
import {DiamondTxnModel} from "../../models/DiamondTxnModel";

@Component({
	selector: 'app-txn-page',
	imports: [
		TxnTable,
		Aside
	],
	templateUrl: './txn-page.html',
	styleUrl: './txn-page.css',
})
export class TxnPage {
	@Input() DISPLAY_TXN:(DiamondTxnModel[] ) = []; // Look into adding TRANSACTION TYPE HERE
	@Input() tableTitle: string = "";
	@Input() TransactionType: string = "";
	
	copyTxnToFormMiddle: DiamondTxnModel | null = null;

	//Y The aside is used to add/edit TXN
	isAsideOpen = true; //Y this is to hide the Aside
	closeAside(){
		if(!this.isAsideOpen) ROUTER_CONFIGURATION
		this.isAsideOpen = false
	}
	openAside(){
		this.isAsideOpen = true
	}
	
	// This function is used to pass the TXN from the TABLE -> ASIDE
	onCopyTxnToForm(txn: DiamondTxnModel | null){
		this.copyTxnToFormMiddle = txn;
	}

}
