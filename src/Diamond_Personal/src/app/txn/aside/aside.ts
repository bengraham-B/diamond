/**
 * Note the ngPrime selects for the Category & Supplier are the template selects
 */

import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Observable, Subscription, take} from 'rxjs';

//Y Reactive Forms
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

//Y ngPrime
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';

//Y Models
import { MERCHANT } from '../../models/Merchant';
import { GL_ACCOUNT } from '../../models/GL_ACCOUNT';

//Y Services
import { GLACCOUNTService } from '../../services/gl-account-service';
import { UserService } from '../../services/user-service';
import { MerchantService } from '../../services/merchant-service';
import { DateService} from "../../services/date-service";
import {DiamondTxnModel} from "../../models/DiamondTxnModel";
import {DiamondTxnService} from "../../services/diamond-txn-service";

@Component({
	selector: 'app-aside',
    standalone: true,
	imports: [
		FormsModule,
		ButtonModule,
		SelectModule,
        DatePickerModule,
        InputTextModule,
        ReactiveFormsModule,
        AsyncPipe
	],
	templateUrl: './aside.html',
	styleUrls: ['./aside.css'],
})
export class Aside implements OnInit, OnChanges {
	//Y To Close the Aside it is emitted up to the parent
	@Output() close = new EventEmitter<void>();
	
    @Input() TXN_TYPE = "";
	@Input() receiveCopyTxnToForm: DiamondTxnModel | null = null;
	
    TXN_FORM: FormGroup;

    GL_ACCOUNTS$!: Observable<GL_ACCOUNT[]>;
    MERCHANTS$!: Observable<MERCHANT[]>;
	
	private TxnTypeSubscription!: Subscription | undefined;
	
	// When the user clicks the Copy_To_Form Context menu this will update the form to the values of that TXN
	ngOnChanges(changes: SimpleChanges) {
		if(changes['receiveCopyTxnToForm']?.currentValue){
			
			const copiedTxn = changes['receiveCopyTxnToForm']?.currentValue;
			
			this.TXN_FORM.patchValue({
				userDetails: copiedTxn.DETAILS,
				userAmount: copiedTxn.AMOUNT,
				userType: copiedTxn.TXN_TYPE,
				userGLAccount: copiedTxn.GL_ACCOUNT_ID,
				userMerchant: copiedTxn.MERCHANT_ID,
				userDate: copiedTxn.DATE ? new Date(copiedTxn.DATE) : null,
			})
			
			if(this.TXN_TYPE === "CREDIT_CARD" && copiedTxn.TXN_TYPE == "DECREASE" && copiedTxn.DETAILS === null){
				this.TXN_FORM.patchValue({
					userDetails: "REPAID"
				})
			}
		}
	}
	
	constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private glAccountService: GLACCOUNTService,
        private merchantService: MerchantService,
		private diamondTxnService: DiamondTxnService,
        private dateService: DateService
    ){
        //Y Creating FormGroup
        this.TXN_FORM = this.fb.group({
            userDetails: ['', ],
            userAmount: [],
            userType: [''],
            userGLAccount: '',
            userMerchant: '',
            userDate: [''],
        })

        //Y Getting GL_ACCOUNTS
        this.GL_ACCOUNTS$ = this.glAccountService.globalGL_ACCOUNTS;
        this.MERCHANTS$ = this.merchantService.globalMerchant;
    }

    onSubmit(): void{

        // if(this.TXN_FORM.invalid) return; //Y Ensures Transaction is correct before preceding

        const form = this.TXN_FORM.getRawValue();
		
        const SubmitTransaction: DiamondTxnModel = {
            ACCOUNT_ID: this.userService.accountID,
            SOURCE: this.TXN_TYPE, //Y The TXN type is passed down from the page, such as CashPage (CASH | CREDIT_CARD_TXN | DEBTOR_TXN | CREDITOR_TXN)

            DETAILS: form.userDetails,
            AMOUNT: form.userAmount,
            TXN_TYPE: form.userType,
            DATE: this.dateService.TxnDate(form.userDate),
            MERCHANT_ID: form.userMerchant ?? null,
            GL_ACCOUNT_ID : form.userGLAccount ?? null,
        }
		
		console.log({SubmitTXN: SubmitTransaction})
		try {
			this.diamondTxnService.addDiamondTxn(SubmitTransaction);
		} catch (error){
			console.error({"Error on Adding DiamondTxn":error})
		}
    }
	
	onClose(){
		this.close.emit()
	}

    date: Date | undefined;

	categories: any[] | undefined;
	countries: any[] | undefined;
    glaccounts: any[] | undefined
    transactionTypes: any[] | undefined
	creditCardTransactionTypes: any[] | undefined

    ngOnInit() {
        this.categories = []
        this.countries = []
        this.glaccounts = []
	    
        this.transactionTypes = [
            { label: "INCOME", value: "INCOME" },
            { label: "EXPENSE", value: "EXPENSE" }
        ]

        this.creditCardTransactionTypes = [
            { label: "INCREASE", value: "INCREASE" },
            { label: "DECREASE", value: "DECREASE" }
        ]
	    
	    // If the user has copied a TXN to Form
	    if(this.receiveCopyTxnToForm) console.log({CopyToForm: this.receiveCopyTxnToForm})
	    
	    this.TxnTypeSubscription = this.TXN_FORM.get('userType')?.valueChanges.subscribe(
			value => {
				if(this.TXN_TYPE === "CREDIT_CARD" && value === "DECREASE"){
					this.GL_ACCOUNTS$.pipe(take(1)).subscribe(
						acc => {
							const GLCode = acc.find(A => A.GL_ACCOUNT_CODE === -5001)
							console.log({GLCode})
						this.TXN_FORM.patchValue(
							{
								userDetails: "REPAID",
								userGLAccount: GLCode?.GL_ACCOUNT_ID ?? null
							}
						);
						}
					);
					
				}
				else {
					this.TXN_FORM.patchValue(
						{
							userDetails: "",
							userGLAccount: ""
						}
					);
				}
	        }
		);
    }
	
	ngOnDestroy(){
		this.TxnTypeSubscription?.unsubscribe();
	}

    setTodayDate(){
        this.TXN_FORM.get('userDate')?.setValue(new Date())
    }
}
