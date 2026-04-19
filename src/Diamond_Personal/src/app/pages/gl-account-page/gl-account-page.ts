import { Component } from '@angular/core';

// Table
import {MerchantGlAccountTable} from "../../merchant-gl-account/merchant-gl-account-table/merchant-gl-account-table";

@Component({
  selector: 'app-gl-account-page',
  imports: [MerchantGlAccountTable],
  templateUrl: './gl-account-page.html',
  styleUrl: './gl-account-page.css',
})
export class GlAccountPage {

}
