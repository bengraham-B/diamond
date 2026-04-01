import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Table, TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { BudgetService } from '../../services/budget-service';
import { BudgetModel } from '../../models/BudgetModel';
import { Observable } from 'rxjs';
import { AsyncPipe, CurrencyPipe } from '@angular/common';

@Component({
	selector: 'app-budget',
	templateUrl: './budget-page.html',
	styleUrl: './budget-page.css',
	imports: [
		IconFieldModule,
		InputIconModule,
		TableModule,
		InputTextModule,
		TagModule,
		FormsModule,
		AsyncPipe,
		CurrencyPipe
	]
})
export class BudgetPage implements OnInit {
	
	budgets$!: Observable<BudgetModel[]>;
	loading: boolean = true;
	
	constructor(private budgetService: BudgetService) {}
	
	ngOnInit() {
		this.budgetService.fetchBudgets();
		this.budgets$ = this.budgetService.globalBudget;
		this.loading = false;
	}
	
	clear(table: Table) {
		table.clear();
	}
	
	getPeriodSeverity(period: string): 'info' | 'warn' {
		return period === 'MONTH' ? 'info' : 'warn';
	}
}
