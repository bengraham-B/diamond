import {Component, OnInit, OnDestroy, signal, Input, Output, EventEmitter, effect} from '@angular/core';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Observable, Subscription} from 'rxjs';

// PrimeNG
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import {  PopoverModule } from 'primeng/popover';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { Table, TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { ContextMenu, ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';

// Services
import {GLACCOUNTService} from "../../services/gl-account-service";
import {MerchantService} from "../../services/merchant-service";
import {DiamondTxnService} from "../../services/diamond-txn-service";
import {DateService} from "../../services/date-service";

// Models
import {GL_ACCOUNT} from "../../models/GL_ACCOUNT";
import {MERCHANT} from "../../models/Merchant";
import {DiamondTxnModel} from "../../models/DiamondTxnModel";

@Component({
	selector: 'app-txn-table',
	templateUrl: './txn-table.html',
	styleUrl: './txn-table.css',
	standalone: true,
	imports: [
		CommonModule,
		FormsModule,
		ButtonModule,
		SelectModule,
		IconFieldModule,
		InputIconModule,
		MultiSelectModule,
		ProgressBarModule,
		TableModule,
		TagModule,
		InputTextModule,
		PopoverModule,
		InputNumberModule,
		ContextMenu,
		ContextMenuModule,
	],
})
export class TxnTable implements OnInit, OnDestroy {
	
	//Y Inputs
	@Input() tableTitle: String = "";
	@Input() TXN_TYPE: string = "";
	@Input() DISPLAY_TXN: DiamondTxnModel[] = [];
	
	//Y Aside Inputs from TXN-PAGE (Hides the add TXN button when aside is open)
	@Input() isAsideOpen: boolean = false;
	
	onOpen(){
		this.open.emit()
	}
	
	//Y To Open the Add/Edit TXN Aside it will emit to txn-page
	@Output() open = new EventEmitter<void>();
	
	//Y Filters
	months = signal<any[]>([
		{ label: 'Jan', value: 1 },
		{ label: 'Feb', value: 2 },
		{ label: 'Mar', value: 3 },
		{ label: 'Apr', value: 4 },
		{ label: 'May', value: 5 },
		{ label: 'Jun', value: 6 },
		{ label: 'Jul', value: 7 },
		{ label: 'Aug', value: 8 },
		{ label: 'Sept', value: 9 },
		{ label: 'Oct', value: 10 },
		{ label: 'Nov', value: 11 },
		{ label: 'Dec', value: 12 },
	]);
	
	// Signals
	transactions= signal<DiamondTxnModel[]>([]);
	statuses= signal<any[]>([]);
	glAccounts= signal<any[]>([]);
	merchants = signal<any[] | undefined>([]);
	loading= signal(true);
	searchValue= signal('');
	
	private txnSubscription!: Subscription;
	private GLAccountSubscription!: Subscription;
	private merchantSubscription!: Subscription;
	
	GL_ACCOUNTS$!: Observable<GL_ACCOUNT[]>;
	MERCHANTS$!: Observable<MERCHANT[]>
	
	
	constructor(
		private diamondTxnService: DiamondTxnService,
		private glAccountService: GLACCOUNTService,
		private merchantService: MerchantService,
		private dateService: DateService
	) {
		this.GL_ACCOUNTS$ = this.glAccountService.globalGL_ACCOUNTS;
		this.MERCHANTS$ = this.merchantService.globalMerchant;
		
		effect(() => {
			
			/*
			* This works because effect tracks signals which are inside of it.
			* Signals are global reactive values.
			* Signals must be called like functions to register dependency tracking
			* */
			this.diamondTxnService.fetchDiamondTxn();
		})
	}
	
	//ContextMenu
	contextMenuItems: MenuItem[] | undefined;
	onContextMenuSelect(txn: DiamondTxnModel){
		this.selectedTXN.set(txn)
	}
	
	ngOnInit(): void {
		this.txnSubscription = this.diamondTxnService.globalDiamondTxn.subscribe({
			next: (txns: DiamondTxnModel[]) => {
				this.transactions.set(txns.filter(T => T.SOURCE === this.TXN_TYPE));
				this.loading.set(false);
			},
			error: (err) => {
				console.error('Failed to load transactions', err);
				this.loading.set(false);
			},
		});
		
		this.GLAccountSubscription = this.glAccountService.globalGL_ACCOUNTS.subscribe({
			next: (GL_ACC: GL_ACCOUNT[]) => {
				this.glAccounts.set(GL_ACC.map(A => ({
					label: A.GL_ACCOUNT_NAME,
					value: A.GL_ACCOUNT_ID,
					type: A.GL_ACCOUNT_TYPE
				})))
				this.loading.set(false);
			}
		})
		
		this.merchantSubscription = this.merchantService.globalMerchant.subscribe(({
			next: (merc: MERCHANT[]) => {
				this.merchants.set(merc.map(M => ({
					label: M.NAME,
					value: M.MERCHANT_ID,
					town: M.TOWN
				})))
			}
		}))
		
		// Populate with your real GL account names / statuses as needed
		this.statuses.set([
			{ label: 'INCOME',   value: 'INCOME' },
			{ label: 'EXPENSE',  value: 'EXPENSE' },
			{ label: 'INCREASE', value: 'INCREASE' },
			{ label: 'DECREASE',  value: 'DECREASE' },
		]);
		

		
		// Context Menu
		this.contextMenuItems = [
			{
				label: 'Copy to Today',
				icon: 'pi pi-clipboard',
				command: () => {
					const txn: DiamondTxnModel | null = this.selectedTXN();
					if(!txn) return;
					this.copyTxnToToday(txn);
				}
			},
			{
				label: 'Copy to Form',
				icon: 'pi pi-copy',
				command: () => {
					const txn = this.selectedTXN();
					if(!txn) return;
					this.copyTxnToForm(txn);
				}
			},
			{
				separator: true
			},
			{
				label: 'Delete TXN',
				icon: 'pi pi-trash',
				command: () => {
					console.log(this.selectedTXN());
					const txn = this.selectedTXN();
					if(!txn) return;
					this.diamondTxnService.deleteDiamondTxn(txn);
					
				}
			},
		];
	}
	
	///////////////////////////////////////////////////////////////////////////// EDIT TXN
	selectedTXN = signal<DiamondTxnModel | null>(null);
	
	// Single form group used for whatever row is selected
	editForm = new FormGroup({
		DAY: new FormControl<number | null>(null),
		DETAILS: new FormControl<string | null>(null),
		AMOUNT: new FormControl<number | null>(null),
		TXN_TYPE: new FormControl<string | null>(null)
	});
	
	// Called when a row is selected
	selectTXN(txn: DiamondTxnModel){
		this.selectedTXN.set(txn);
		this.editForm.patchValue({
			DAY: txn.DAY,
			DETAILS: txn.DETAILS,
			AMOUNT: txn.AMOUNT,
			TXN_TYPE: txn.TXN_TYPE
		});
		this.editForm.markAsPristine(); //Clears any dirty state.
		// console.log({txn})
	}
	
	editTransaction(txn: DiamondTxnModel){
		try {
			console.log("EDITED TXN", txn);
			this.diamondTxnService.editDiamondTxn(txn);
		} catch (e){
			console.error({"Error on Edit DiamondTxn": e});
		}
	}
	
	selectedGLAccount = signal<any | null>(null);
	selectGLAccount(account: any, txn: DiamondTxnModel) {
		this.selectedGLAccount.set(account);
		txn.GL_ACCOUNT_ID = account.value;
		console.log('GL Account selected:', account);
		this.editTransaction(txn)
	}
	
	// selectedMerchant = signal<any| null>(null);
	selectMerchant(merchant: any, txn: DiamondTxnModel){
		// this.selectedMerchant.set(merchant);
		console.log(txn)
		txn.MERCHANT_ID = merchant.value
		
		this.editTransaction(txn)
	}
	
	selectedTxnType = signal<any | null>(null);
	selectTxnType(txnType: string, txn: DiamondTxnModel){
		this.selectedTxnType.set(txnType);
		txn.TXN_TYPE = txnType
		this.editTransaction(txn)
	}
	
	getControl(field: string): FormControl {
		return this.editForm.get(field) as FormControl;
	}
	
	///////////////////////////////////////////////////////////////////////////// EDIT TXN
	
	ngOnDestroy(): void {
		this.txnSubscription?.unsubscribe();
	}
	
	/** Angular templates don't support `as` type casts — handle it here. */
	getInputValue(event: Event): string {
		return (event.target as HTMLInputElement).value;
	}
	
	clear(table: Table): void {
		table.clear();
		this.searchValue.set('');
	}
	
	getSeverity(value: string): 'success' | 'info' | 'warn' | 'danger' | null {
		if (!value) return null;
		const v = value.toUpperCase();
		if (v.includes('INCOME') || v.includes('credit')) return 'success';
		if (v.includes('EXPENSE') || v.includes('EXPENSE'))  return 'danger';
		if (v.includes('INCREASE')) return 'info';
		if (v.includes('DECREASE')) return 'warn';
		return null;
	}
	
	@Output() emitCopyTxnToForm = new EventEmitter<DiamondTxnModel>();
	// This emits from the TXN_TABLE to the ASIDE
	copyTxnToForm(TXN: DiamondTxnModel) {
		
		switch (this.TXN_TYPE) {
			case "CASH":
				TXN.SOURCE = "CASH";
				this.emitCopyTxnToForm.emit(TXN);
				break;
			
			case "CREDIT_CARD":
				TXN.SOURCE = "CREDIT_CARD"
				this.emitCopyTxnToForm.emit(TXN);
				break;
			
			default:
				return;
			
		}
	}
	// Replace the broken line with this proper class property declaration:
	
	getMonthName(monthNumber: number){
		const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
		return monthNames[monthNumber-1]
	}
	
	txnTypes: string [] = [
		"INCOME",
		"EXPENSE",
		"INCREASE",
		"DECREASE"
	];
	
	copyTxnToToday(txn: DiamondTxnModel){
		try{
			txn.DATE = this.dateService.currentTxnDate();
			this.diamondTxnService.addDiamondTxn(txn);
		} catch (e) {
			console.error({errorOnCopyToToday: e})
		}
	}
}
