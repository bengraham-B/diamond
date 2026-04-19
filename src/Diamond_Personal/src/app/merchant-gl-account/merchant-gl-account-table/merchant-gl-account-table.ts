import {Component, OnInit, Input, ChangeDetectorRef} from '@angular/core';

// NgPrime
import { TableModule } from 'primeng/table';

// Services
import { GLACCOUNTService } from "../../services/gl-account-service";
import { MerchantService } from "../../services/merchant-service";
import {DisplayDataModel} from "../../models/DisplayDataModel";

@Component({
  selector: 'app-merchant-gl-account-table',
  imports: [TableModule],
  templateUrl: './merchant-gl-account-table.html',
  styleUrl: './merchant-gl-account-table.css',
})
export class MerchantGlAccountTable implements OnInit{
	DisplayData!: DisplayDataModel[];
	// DisplayData!: any[];
	
	constructor(
		private glAccountService: GLACCOUNTService,
		private merchantService: MerchantService,
		private cdr: ChangeDetectorRef,
	) {
	}
	
	@Input() INPUT__data: string = "";
	
	
	ngOnInit() {
		
		switch (this.INPUT__data){
			case "MERCHANT":

				this.merchantService.globalMerchantMonthlyReport.subscribe(data => {
					this.DisplayData = data
					this.cdr.detectChanges() // <-- Tells angular to re-check | Look into using the async pipe
				})
				break
			
			case "GL_ACCOUNT":
			case "CATEGORY":
				break;
				
			default:
				return;
		}
	}
	
	formatCurrency(value: number) {
		return value.toLocaleString('en-US', { style: 'currency', currency: 'ZAR' });
	}
	
}
