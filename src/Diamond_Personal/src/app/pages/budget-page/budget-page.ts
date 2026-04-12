import {Component, OnInit, signal, effect, computed} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';

// PrimeNG
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { PopoverModule } from 'primeng/popover';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { ContextMenuModule } from 'primeng/contextmenu';

// Services
import { ActualBudgetService } from "../../services/actual-budget-service";

// Models
import { ActualBudgetModel } from "../../models/ActualBudgetModel";

@Component({
	selector: 'app-txn-table',
	templateUrl: './budget-page.html',
	styleUrl: './budget-page.css',
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
		ContextMenuModule,
		ReactiveFormsModule,
	],
})
export class BudgetPage implements OnInit {
	
	// Signals
	actualBudgetsDisplayOnTable = signal<ActualBudgetModel[]>([]);
	unbudgetedItemsDisplayOnTable = signal<ActualBudgetModel[]>([]);
	loading= signal(true);
	searchValue= signal('');
	
	private actualBudgetSubscription!: Subscription;
	
	ACTUAL_BUDGETS$!: Observable<ActualBudgetModel[]>;
	
	constructor(
		private actualBudgetService: ActualBudgetService,
	) {
		this.ACTUAL_BUDGETS$ = this.actualBudgetService.globalActualBudget;
		
		effect(() => {
			this.actualBudgetService.fetchActualBudgets();
		})
	}
	
	ngOnInit(): void {
		this.actualBudgetSubscription = this.actualBudgetService.globalActualBudget.subscribe({
			next: (AB: ActualBudgetModel[]) => {
				this.actualBudgetsDisplayOnTable.set(AB);
				this.loading.set(false);
				console.log(this.actualBudgetsDisplayOnTable())
			},
			error: (err) => {
				console.error('Failed to load Actual Budgets', err);
				this.loading.set(false);
			},
		})
	}
	
	readonly MONTHS = ['jan','feb','mar','apr','may','jun','jul','aug','sept','oct','nov','dec'] as const;

// ── Section boundary helpers ──────────────────────────────────────────────
	isFirstOfType(budget: any, type: string): boolean {
		const items = this.actualBudgetsDisplayOnTable();
		const idx = items.indexOf(budget);
		return idx === items.findIndex(b => b.GL_ACCOUNT_TYPE === type);
	}
	
	isLastOfType(budget: any, type: string): boolean {
		const items = this.actualBudgetsDisplayOnTable();
		const idx = items.indexOf(budget);
		const lastIdx = items.map(b => b.GL_ACCOUNT_TYPE).lastIndexOf(type);
		return idx === lastIdx;
	}

// ── Month cell colouring ──────────────────────────────────────────────────
	monthClass(budget: any, type: string, monthValue: number) {
		if (type === 'INCOME') {
			if(budget.GL_ACCOUNT_NAME==="UNBUDGETED ITEM"){
				return {
					'bg-yellow-200 text-yellow-700 border border-solid border-yellow-800': true
				};
			}
			else {
				return {
					'bg-green-200 text-green-700 border border-solid border-green-800': monthValue >= budget.BUDGET_AMOUNT,
					'bg-red-200   text-red-700   border border-solid border-red-800':   monthValue <  budget.BUDGET_AMOUNT,
				};
			}
		}
		else {
			if(budget.GL_ACCOUNT_NAME==="UNBUDGETED ITEM") {
				return {
					'bg-yellow-200 text-yellow-700 border border-solid border-yellow-800': true,
				};
			}
			else {
				// EXPENSE: under budget is good (green), over is bad (red)
				return {
					'bg-green-200 text-green-700 border border-solid border-green-800': monthValue <= budget.BUDGET_AMOUNT,
					'bg-red-200   text-red-700   border border-solid border-red-800':   monthValue >  budget.BUDGET_AMOUNT,
				};
				
			}
		}
	}

// ── Totals helpers ────────────────────────────────────────────────────────
	private sumByType(type: string) {
		const rows = this.actualBudgetsDisplayOnTable().filter(b => b.GL_ACCOUNT_TYPE === type);
		const sum  = (key: keyof ActualBudgetModel) => rows.reduce((acc, b) => acc + ((b[key] as number) ?? 0), 0);
		return {
			budget:   sum('BUDGET_AMOUNT'),
			yearAmount: sum('BUDGET_YEAR_AMOUNT'),
			variance: sum('SURPLUS') - sum('DEFICIT'),
			jan: sum('JAN'), feb: sum('FEB'), mar: sum('MAR'), apr: sum('APR'),
			may: sum('MAY'), jun: sum('JUN'), jul: sum('JUL'), aug: sum('AUG'),
			sept: sum('SEPT'), oct: sum('OCT'), nov: sum('NOV'), dec: sum('DEC'),
		};
	}
	
	incomeTotals  = computed(() => this.sumByType('INCOME'));
	expenseTotals = computed(() => this.sumByType('EXPENSE'));
	
	netTotals = computed(() => {
		const i = this.incomeTotals();
		const e = this.expenseTotals();
		return {
			budget:   i.budget   - e.budget,
			yearAmount: i.yearAmount - e.yearAmount,
			variance: i.variance - e.variance,
			jan:  i.jan  - e.jan,  feb:  i.feb  - e.feb,  mar:  i.mar  - e.mar,
			apr:  i.apr  - e.apr,  may:  i.may  - e.may,  jun:  i.jun  - e.jun,
			jul:  i.jul  - e.jul,  aug:  i.aug  - e.aug,  sept: i.sept - e.sept,
			oct:  i.oct  - e.oct,  nov:  i.nov  - e.nov,  dec:  i.dec  - e.dec,
		};
	});
	
}
