import {Component, OnInit, inject, signal, effect} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { SliderModule } from 'primeng/slider';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import {Subscription} from "rxjs";
import {ActualBudgetService} from "../../services/actual-budget-service";

@Component({
	selector: 'app-budget-page',
	standalone: true,
	templateUrl: './budget-page.html',
	styleUrl: './budget-page.css',
	imports: [ButtonModule, SelectModule, IconFieldModule, InputIconModule, MultiSelectModule, ProgressBarModule, SliderModule, TableModule, TagModule, InputTextModule, FormsModule],
})
export class BudgetPage implements OnInit {
	
	// Signals()
	budgets = signal<ActualBudgetModel[]>([]);
	
	private budgetSubscription!: Subscription;
	
	constructor(
		private actualBudgetService: ActualBudgetService
	) {
	}
	
	ngOnInit() {
		this.ACTUAL_BUDGET = this.actualBudgetService.globalActualBudget;
		
		effect(() => {
			this.actualBudgetService.fetchActualBudgets();
		});
	}
}
