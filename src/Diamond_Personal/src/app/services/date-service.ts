import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
	
	date = new Date();
	displayMonth = signal(this.date.getMonth() + 1);
	dayToAddTxn = signal(this.date.getDay())
	
	increaseMonth(){
		if(this.displayMonth() === 12) return;
		this.displayMonth.update(d => d + 1)
	}
	
	decreaseMonth(){
		if(this.displayMonth() === 1) return;
		this.displayMonth.update(d => d - 1)
	}
	
	// This function converts the date into one which can be used by C#
	TxnDate(date: Date): string {
		return date.getFullYear() + "-" +
			String(date.getMonth() + 1).padStart(2, '0') + "-" +
			String( date.getDate()).padStart(2, '0');
	}
	
	currentTxnDate(): string {
		const date = new Date();
		return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
	}
	
}
