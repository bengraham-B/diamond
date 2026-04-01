import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

// PrimeNg
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';

// Services / Models
import { CashService } from '../../services/cash-service';
import { TRANSACTION } from '../../models/Transaction.model';


@Component({
	templateUrl: './transaction-page.html',
	styleUrl: './transaction-page.css',
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
	],
})
export class TransactionPage implements OnInit, OnDestroy {
	
	transactions = signal<TRANSACTION[]>([]);
	statuses     = signal<any[]>([]);
	glAccounts   = signal<any[]>([]);
	loading      = signal(true);
	searchValue  = signal('');
	
	private txnSubscription!: Subscription;
	
	constructor(
		private cashService: CashService
	) {}
	
	ngOnInit(): void {
		this.txnSubscription = this.cashService.globalCashTXN.subscribe({
			next: (txns: TRANSACTION[]) => {
				const parsed = txns.map(t => ({
					...t,
					DATE: t.DATE ? new Date(t.DATE as string) : t.DATE,
				}));
				this.transactions.set(parsed);
				
				// Build unique GL account options from the actual data
				const unique = [...new Set(txns.map(t => t.GL_ACCOUNT).filter(Boolean))];
				this.glAccounts.set(unique.map(name => ({ label: name, value: name })));
				
				this.loading.set(false);
			},
			error: (err) => {
				console.error('Failed to load transactions', err);
				this.loading.set(false);
			},
		});
		
		// Populate with your real GL account names / statuses as needed
		this.statuses.set([
			{ label: 'Income',   value: 'income' },
			{ label: 'Expense',  value: 'expense' },
			{ label: 'Transfer', value: 'transfer' },
			{ label: 'Savings',  value: 'savings' },
		]);
	}
	
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
		const v = value.toLowerCase();
		if (v.includes('income') || v.includes('credit')) return 'success';
		if (v.includes('expense') || v.includes('debit'))  return 'danger';
		if (v.includes('transfer'))                         return 'info';
		if (v.includes('saving'))                           return 'warn';
		return null;
	}
}
