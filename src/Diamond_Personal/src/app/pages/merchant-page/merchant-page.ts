import { Component } from '@angular/core';

// Table
import {MerchantGlAccountTable} from "../../merchant-gl-account/merchant-gl-account-table/merchant-gl-account-table";

@Component({
  selector: 'app-merchant-page',
	imports: [
		MerchantGlAccountTable
	],
  templateUrl: './merchant-page.html',
  styleUrl: './merchant-page.css',
})
export class MerchantPage {


}
