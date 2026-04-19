import { Component, OnInit, Input } from '@angular/core';

// NgPrime
import { TableModule } from 'primeng/table';
import {form} from "@angular/forms/signals";

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
	// DisplayData!: DisplayDataModel[];
	DisplayData!: any[];
	
	constructor(
		private glAccountService: GLACCOUNTService,
		private merchantService: MerchantService,
	) {
	}
	
	@Input() INPUT__data: string = "";
	
	
	ngOnInit() {
		
		switch (this.INPUT__data){
			case "MERCHANT":
				// this.merchantService.fetchMerchants();
				console.log(this.merchantService.globalMerchant);
				break
			
			case "GL_ACCOUNT":
			case "CATEGORY":
				break;
				
			default:
				return;
		}

		
		this.DisplayData = [
			{
				NAME: "Spar Home",
				TOTAL: 2007.25,
				JAN: 200,
				FEB: 150,
				MAR: 37.52,
				APR: 89.96,
				MAY: 400.56,
				JUN: 789,
				JUL: 45,
				AUG: 69,
				SEPT: 632,
				OCT: 78,
				NOV: 78,
				DEC: 0,
			},
		];
	}
	
	formatCurrency(value: number) {
		return value.toLocaleString('en-US', { style: 'currency', currency: 'ZAR' });
	}
	
	protected readonly form = form;
}
