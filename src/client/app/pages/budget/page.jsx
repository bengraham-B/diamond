"use client"
import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import './table.scss'

export default function Page() {
			const { data: session } = useSession()

			//Y BUDGET TABLES
			const [creditBudgetTable, setCreditBudgetTable] = useState([])
			const [debitBudgetTable, setDebitBudgetTable] = useState([])

			//Y COLUMN TOTALS
			const [creditColunTotal, setCreditColumnTotal] = useState([])
			const [debitColunTotal, setDebitColumnTotal] = useState([])
			
			//X ------------ CREDIT ---------------
			const fetchBudgetCreditTable = async () => {
				try {
					const response = await fetch(`${process.env.NEXT_PUBLIC_ENV_SERVER_BASE}/api/budget/credit_budget_table`, {
						method: "POST",
						body: JSON.stringify({
							accountID: session.diamond.accountID,
							year: 2025
						}),
						headers: {
							"Content-Type": "application/json"
						}
					})
		
					if(response.ok){
						const data = await response.json()
						console.log(data.creditBudgetTable)
						setCreditBudgetTable(data.creditBudgetTable)
					}
				} catch (error) {
					console.error(error)
				}
			}

			const fetchCreditColumnTotal = async () => {
				try {
					const response = await fetch(`${process.env.NEXT_PUBLIC_ENV_SERVER_BASE}/api/budget/credit_column_totals`, {
						method: "POST",
						body: JSON.stringify({
							accountID: session.diamond.accountID,
							year: 2025
						}),
						headers: {
							"Content-Type": "application/json"
						}
					})
		
					if(response.ok){
						const data = await response.json()
						console.log({"Credit-Total": data.creditColumnTotals[0]})
						setCreditColumnTotal(data.creditColumnTotals[0])
					}

				} catch(error) {

				}
			}

			//X ------------ DEBIT ------------
			const fetchBudgetDebitTable = async () => {
				try {
					const response = await fetch(`${process.env.NEXT_PUBLIC_ENV_SERVER_BASE}/api/budget/debit_budget_table`, {
						method: "POST",
						body: JSON.stringify({
							accountID: session.diamond.accountID,
							year: 2025
						}),
						headers: {
							"Content-Type": "application/json"
						}
					})
		
					if(response.ok){
						const data = await response.json()
						console.log(data.creditBudgetTable)
						setDebitBudgetTable(data.debitBudgetTable)
					}
				} catch (error) {
					console.error(error)
				}
			}

			const fetchDebitColumnTotal = async () => {
				try {
					const response = await fetch(`${process.env.NEXT_PUBLIC_ENV_SERVER_BASE}/api/budget/debit_column_totals`, {
						method: "POST",
						body: JSON.stringify({
							accountID: session.diamond.accountID,
							year: 2025
						}),
						headers: {
							"Content-Type": "application/json"
						}
					})
		
					if(response.ok){
						const data = await response.json()
						setDebitColumnTotal(data.debitColumnTotals[0])
					}

				} catch(error) {

				}
			}

			
		
		useEffect(() => {
			if(!session) return
			fetchBudgetCreditTable()
			fetchBudgetDebitTable()
			fetchCreditColumnTotal()
			fetchDebitColumnTotal()
	
		},[session])
	
		if (!session) return
	return (
		<main>
			<div className="outer-wrapper">
				<div className="table-wrapper">
					<table id="budget-table">
						<thead>
							<tr>
								<th>DIAMOND</th>
								<th colSpan={3}>JAN</th>
								<th colSpan={3}>FEB</th>
								<th colSpan={3}>MAR</th>
								<th colSpan={3}>APR</th>
								<th colSpan={3}>MAY</th>
								<th colSpan={3}>JUN</th>
								<th colSpan={3}>JUL</th>
								<th colSpan={3}>AUG</th>
								<th colSpan={3}>SEPT</th>
								<th colSpan={3}>OCT</th>
								<th colSpan={3}>NOV</th>
								<th colSpan={3}>DEC</th>
								<th colSpan={3}>TOTAL</th>
							</tr>
							<tr className='bottom-header'>
								<th>2025</th>
								<th>BUDGET</th>
								<th>ACTUTAL</th>
								<th>DIFF</th>
								<th>BUDGET</th>
								<th>ACTUTAL</th>
								<th>DIFF</th>
								<th>BUDGET</th>
								<th>ACTUTAL</th>
								<th>DIFF</th>
								<th>BUDGET</th>
								<th>ACTUTAL</th>
								<th>DIFF</th>
								<th>BUDGET</th>
								<th>ACTUTAL</th>
								<th>DIFF</th>
								<th>BUDGET</th>
								<th>ACTUTAL</th>
								<th>DIFF</th>
								<th>BUDGET</th>
								<th>ACTUTAL</th>
								<th>DIFF</th>
								<th>BUDGET</th>
								<th>ACTUTAL</th>
								<th>DIFF</th>
								<th>BUDGET</th>
								<th>ACTUTAL</th>
								<th>DIFF</th>
								<th>BUDGET</th>
								<th>ACTUTAL</th>
								<th>DIFF</th>
								<th>BUDGET</th>
								<th>ACTUTAL</th>
								<th>DIFF</th>
								<th>BUDGET</th>
								<th>ACTUTAL</th>
								<th>DIFF</th>
								<th>BUDGET</th>
								<th>ACTUTAL</th>
								<th>DIFF</th>
							</tr>
						</thead>

						<tbody>
							<tr className='bg-green-600 text-white credit-header'>
								<td>CREDIT</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>

							{creditBudgetTable && creditBudgetTable.map((cb) => (
                                <tr key={cb.id}>
                                    <td className='th-name'>{cb.name}</td>

                                    <td>R{(cb.jan_budget || 0.00).toFixed(2)}</td>
                                    <td>R{(cb.jan_actual || 0.00).toFixed(2)}</td>
                                    <td className={cb.jan_diff < 0 ? 'green-cell': 'red-cell'}>{cb.jan_diff > 0 ? '-' : '+'} R{(cb.jan_diff < 0 ? -1 * cb.jan_diff : cb.jan_diff  || 0.00).toFixed(2)}</td>

                                    <td>R{(cb.feb_budget || 0.00).toFixed(2)}</td>
                                    <td>R{(cb.feb_actual || 0.00).toFixed(2)}</td>
                                    <td className={cb.feb_diff < 0 ? 'green-cell': 'red-cell'}>{cb.feb_diff > 0 ? '-' : '+'} R{(cb.feb_diff < 0 ? -1 * cb.feb_diff : cb.feb_diff  || 0.00).toFixed(2)}</td>

                                    <td onClick={() => alert(cb.mar_budget)}>R{(cb.mar_budget || 0.00).toFixed(2)}</td>
                                    <td onClick={() => alert(cb.mar_actual)}>R{(cb.mar_actual || 0.00).toFixed(2)}</td>
                                    <td className={cb.mar_diff < 0 ? 'green-cell': 'red-cell'}>{cb.mar_diff > 0 ? '-' : '+'} R{(cb.mar_diff < 0 ? -1 * cb.mar_diff : cb.mar_diff  || 0.00).toFixed(2)}</td>

                                    <td>R{(cb.apr_budget || 0.00).toFixed(2)}</td>
                                    <td>R{(cb.apr_actual || 0.00).toFixed(2)}</td>
                                    <td className={cb.apr_diff < 0 ? 'green-cell': 'red-cell'}>{cb.apr_diff > 0 ? '-' : '+'} R{(cb.apr_diff < 0 ? -1 * cb.apr_diff : cb.apr_diff  || 0.00).toFixed(2)}</td>

                                    <td>R{(cb.may_budget).toFixed(2)}</td>
                                    <td >R{(cb.may_actual).toFixed(2)}</td>
                                    <td className={cb.may_diff < 0 ? 'green-cell': 'red-cell'}>{cb.may_diff > 0 ? '-' : '+'} R{(cb.may_diff < 0 ? -1 * cb.may_diff : cb.may_diff  || 0.00).toFixed(2)}</td>

                                    <td>R{(cb.jun_budget || 0.00).toFixed(2)}</td>
                                    <td>R{(cb.jun_actual || 0.00).toFixed(2)}</td>
                                    <td className={cb.june_diff < 0 ? 'green-cell': 'red-cell'}>{cb.june_diff > 0 ? '-' : '+'} R{(cb.jun_diff < 0 ? -1 * cb.jun_diff : cb.jun_diff  || 0.00).toFixed(2)}</td>

                                    <td>R{(cb.jul_budget || 0.00).toFixed(2)}</td>
                                    <td>R{(cb.jul_actual || 0.00).toFixed(2)}</td>
                                    <td className={cb.jul_diff < 0 ? 'green-cell': 'red-cell'}>{cb.jul_diff > 0 ? '-' : '+'} R{(cb.jul_diff < 0 ? -1 * cb.jul_diff : cb.jul_diff  || 0.00).toFixed(2)}</td>

                                    <td>R{(cb.aug_budget || 0.00).toFixed(2)}</td>
                                    <td>R{(cb.aug_actual || 0.00).toFixed(2)}</td>
                                    <td className={cb.aug_diff < 0 ? 'green-cell': 'red-cell'}>{cb.aug_diff > 0 ? '-' : '+'} R{(cb.aug_diff < 0 ? -1 * cb.aug_diff : cb.aug_diff  || 0.00).toFixed(2)}</td>

                                    <td>R{(cb.sept_budget || 0.00).toFixed(2)}</td>
                                    <td>R{(cb.sept_actual || 0.00).toFixed(2)}</td>
                                    <td className={cb.sept_diff < 0 ? 'green-cell': 'red-cell'}>{cb.sept_diff > 0 ? '-' : '+'} R{(cb.sept_diff < 0 ? -1 * cb.sept_diff : cb.sept_diff  || 0.00).toFixed(2)}</td>

                                    <td>R{(cb.oct_budget || 0.00).toFixed(2)}</td>
                                    <td>R{(cb.oct_actual || 0.00).toFixed(2)}</td>
                                    <td className={cb.oct_diff < 0 ? 'green-cell': 'red-cell'}>{cb.oct_diff > 0 ? '-' : '+'} R{(cb.oct_diff < 0 ? -1 * cb.oct_diff : cb.oct_diff  || 0.00).toFixed(2)}</td>

                                    <td>R{(cb.nov_budget || 0.00).toFixed(2)}</td>
                                    <td>R{(cb.nov_actual || 0.00).toFixed(2)}</td>
                                    <td className={cb.nov_diff < 0 ? 'green-cell': 'red-cell'}>{cb.nov_diff > 0 ? '-' : '+'} R{(cb.nov_diff < 0 ? -1 * cb.nov_diff : cb.nov_diff  || 0.00).toFixed(2)}</td>

                                    <td>R{(cb.dec_budget || 0.00).toFixed(2)}</td>
                                    <td>R{(cb.dec_actual || 0.00).toFixed(2)}</td>
                                    <td className={cb.dec_diff < 0 ? 'green-cell': 'red-cell'}>{cb.dec_diff > 0 ? '-' : '+'} R{(cb.dec_diff < 0 ? -1 * cb.dec_diff : cb.dec_diff  || 0.00).toFixed(2)}</td>

                                    <td className='th-total'>R{(cb.budget_year_total || 0.00).toFixed(2)}</td>
                                    <td className='th-total'>R{(cb.actual_year_total || 0.00).toFixed(2)}</td>
                                    <td className={cb.diff_year_total < 0 ? 'green-cell': 'red-cell'}>{cb.diff_year_total > 0 ? '-' : '+'} R{(cb.diff_year_total < 0 ? -1 * cb.diff_year_total : cb.diff_year_total  || 0.00).toFixed(2)}</td>
									
                                </tr>
                            ))}
							
							<tr className='balance-row'>
								<td>Balance</td>

								<td>R{creditColunTotal.jan_budget}</td>
								<td>R{creditColunTotal.jan_actual}</td>
								<td className={creditColunTotal.jan_diff < 0 ? 'green-cell': 'red-cell'}>{creditColunTotal.jan_diff > 0 ? '-' : '+'} R{(creditColunTotal.jan_diff < 0 ? -1 * creditColunTotal.jan_diff : creditColunTotal.jan_diff || 0).toFixed(2)}</td>

								<td>R{creditColunTotal.feb_budget}</td>
								<td>R{creditColunTotal.feb_actual}</td>
								<td className={creditColunTotal.feb_diff < 0 ? 'green-cell': 'red-cell'}>{creditColunTotal.feb_diff > 0 ? '-' : '+'} R{(creditColunTotal.feb_diff < 0 ? -1 * creditColunTotal.feb_diff : creditColunTotal.feb_diff || 0).toFixed(2)}</td>

								<td>R{creditColunTotal.mar_budget}</td>
								<td>R{creditColunTotal.mar_actual}</td>
								<td className={creditColunTotal.mar_diff < 0 ? 'green-cell': 'red-cell'}>{creditColunTotal.mar_diff > 0 ? '-' : '+'} R{(creditColunTotal.mar_diff < 0 ? -1 * creditColunTotal.mar_diff : creditColunTotal.mar_diff || 0).toFixed(2)}</td>
								
								<td>R{creditColunTotal.apr_budget}</td>
								<td>R{creditColunTotal.apr_actual}</td>
								<td className={creditColunTotal.apr_diff < 0 ? 'green-cell': 'red-cell'}>{creditColunTotal.apr_diff > 0 ? '-' : '+'} R{(creditColunTotal.apr_diff < 0 ? -1 * creditColunTotal.apr_diff : creditColunTotal.apr_diff || 0).toFixed(2)}</td>
								
								<td>R{creditColunTotal.may_budget}</td>
								<td>R{creditColunTotal.may_actual}</td>
								<td className={creditColunTotal.may_diff < 0 ? 'green-cell': 'red-cell'}>{creditColunTotal.may_diff > 0 ? '-' : '+'} R{(creditColunTotal.may_diff < 0 ? -1 * creditColunTotal.may_diff : creditColunTotal.may_diff || 0).toFixed(2)}</td>
								
								<td>R{creditColunTotal.jun_budget}</td>
								<td>R{creditColunTotal.jun_actual}</td>
								<td className={creditColunTotal.jun_diff < 0 ? 'green-cell': 'red-cell'}>{creditColunTotal.jun_diff > 0 ? '-' : '+'} R{(creditColunTotal.jun_diff < 0 ? -1 * creditColunTotal.jun_diff : creditColunTotal.jun_diff || 0).toFixed(2)}</td>
								
								<td>R{creditColunTotal.jul_budget}</td>
								<td>R{creditColunTotal.jul_actual}</td>
								<td className={creditColunTotal.jul_diff < 0 ? 'green-cell': 'red-cell'}>{creditColunTotal.jul_diff > 0 ? '-' : '+'} R{(creditColunTotal.jul_diff < 0 ? -1 * creditColunTotal.jul_diff : creditColunTotal.jul_diff || 0).toFixed(2)}</td>
								
								<td>R{creditColunTotal.aug_budget}</td>
								<td>R{creditColunTotal.aug_actual}</td>
								<td className={creditColunTotal.aug_diff < 0 ? 'green-cell': 'red-cell'}>{creditColunTotal.aug_diff > 0 ? '-' : '+'} R{(creditColunTotal.aug_diff < 0 ? -1 * creditColunTotal.aug_diff : creditColunTotal.aug_diff || 0).toFixed(2)}</td>
								
								<td>R{creditColunTotal.sept_budget}</td>
								<td>R{creditColunTotal.sept_actual}</td>
								<td className={creditColunTotal.sept_diff < 0 ? 'green-cell': 'red-cell'}>{creditColunTotal.sept_diff > 0 ? '-' : '+'} R{(creditColunTotal.sept_diff < 0 ? -1 * creditColunTotal.sept_diff : creditColunTotal.sept_diff || 0).toFixed(2)}</td>
								
								<td>R{creditColunTotal.oct_budget}</td>
								<td>R{creditColunTotal.oct_actual}</td>
								<td className={creditColunTotal.oct_diff < 0 ? 'green-cell': 'red-cell'}>{creditColunTotal.oct_diff > 0 ? '-' : '+'} R{(creditColunTotal.oct_diff < 0 ? -1 * creditColunTotal.oct_diff : creditColunTotal.oct_diff || 0).toFixed(2)}</td>
								
								<td>R{creditColunTotal.nov_budget}</td>
								<td>R{creditColunTotal.nov_actual}</td>
								<td className={creditColunTotal.nov_total < 0 ? 'green-cell': 'red-cell'}>{creditColunTotal.nov_diff > 0 ? '-' : '+'} R{(creditColunTotal.nov_diff < 0 ? -1 * creditColunTotal.nov_diff : creditColunTotal.nov_diff || 0).toFixed(2)}</td>
								
								<td>R{creditColunTotal.dec_budget}</td>
								<td>R{creditColunTotal.dec_actual}</td>
								<td className={creditColunTotal.dec_total < 0 ? 'green-cell': 'red-cell'}>{creditColunTotal.dec_diff > 0 ? '-' : '+'} R{(creditColunTotal.dec_diff < 0 ? -1 * creditColunTotal.dec_diff : creditColunTotal.dec_diff || 0).toFixed(2)}</td>
								
								<td>R {(creditColunTotal.budget_total || 0).toFixed(2)}</td>
								<td>R {(creditColunTotal.actual_total || 0).toFixed(2)}</td>
								<td className={creditColunTotal.diff_total < 0 ? 'green-cell': 'red-cell'}>{creditColunTotal.diff_total > 0 ? '-' : '+'} R{(creditColunTotal.diff_total < 0 ? -1 * creditColunTotal.diff_total : creditColunTotal.diff_total || 0).toFixed(2)}</td>


							</tr>

							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>

							<tr className='bg-red-600 text-white credit-header'>
								<td>DEBIT</td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>

							{debitBudgetTable && debitBudgetTable.map((cb) => (
                                <tr key={cb.id}>
                                    <td className='th-name'>{cb.name}</td>

                                    <td>R{(cb.jan_budget || 0.00).toFixed(2)}</td>
                                    <td>R{(cb.jan_actual || 0.00).toFixed(2)}</td>
                                    <td className={cb.jan_diff > 0 ? 'green-cell': 'red-cell'}>{cb.jan_diff > 0 ? '-' : '+'} R{(cb.jan_diff < 0 ? -1 * cb.jan_diff : cb.jan_diff  || 0.00).toFixed(2)}</td>

                                    <td>R{(cb.feb_budget || 0.00).toFixed(2)}</td>
                                    <td>R{(cb.feb_actual || 0.00).toFixed(2)}</td>
                                    <td className={cb.feb_diff > 0 ? 'green-cell': 'red-cell'}>{cb.feb_diff > 0 ? '-' : '+'} R{(cb.feb_diff < 0 ? -1 * cb.feb_diff : cb.feb_diff  || 0.00).toFixed(2)}</td>

                                    <td>R{(cb.mar_budget || 0.00).toFixed(2)}</td>
                                    <td>R{(cb.mar_actual || 0.00).toFixed(2)}</td>
                                    <td className={cb.mar_diff > 0 ? 'green-cell': 'red-cell'}>{cb.mar_diff > 0 ? '-' : '+'} R{(cb.mar_diff < 0 ? -1 * cb.mar_diff : cb.mar_diff  || 0.00).toFixed(2)}</td>

                                    <td>R{(cb.apr_budget || 0.00).toFixed(2)}</td>
                                    <td>R{(cb.apr_actual || 0.00).toFixed(2)}</td>
                                    <td className={cb.apr_diff > 0 ? 'green-cell': 'red-cell'}>{cb.apr_diff > 0 ? '-' : '+'} R{(cb.apr_diff < 0 ? -1 * cb.apr_diff : cb.apr_diff  || 0.00).toFixed(2)}</td>

                                    <td>R{(cb.may_budget).toFixed(2)}</td>
                                    <td >R{(cb.may_actual).toFixed(2)}</td>
                                    <td className={cb.may_diff > 0 ? 'green-cell': 'red-cell'}>{cb.may_diff > 0 ? '-' : '+'} R{(cb.may_diff < 0 ? -1 * cb.may_diff : cb.may_diff  || 0.00).toFixed(2)}</td>

                                  	<td>R{(cb.jun_budget || 0.00).toFixed(2)}</td>
                                    <td>R{(cb.jun_actual || 0.00).toFixed(2)}</td>
                                    <td className={cb.june_diff > 0 ? 'green-cell': 'red-cell'}>{cb.june_diff > 0 ? '-' : '+'} R{(cb.jun_diff < 0 ? -1 * cb.jun_diff : cb.jun_diff  || 0.00).toFixed(2)}</td>

                                    <td>R{(cb.jul_budget || 0.00).toFixed(2)}</td>
                                    <td>R{(cb.jul_actual || 0.00).toFixed(2)}</td>
                                    <td className={cb.jul_diff > 0 ? 'green-cell': 'red-cell'}>{cb.jul_diff > 0 ? '-' : '+'} R{(cb.jul_diff < 0 ? -1 * cb.jul_diff : cb.jul_diff  || 0.00).toFixed(2)}</td>

                                    <td>R{(cb.aug_budget || 0.00).toFixed(2)}</td>
                                    <td>R{(cb.aug_actual || 0.00).toFixed(2)}</td>
                                    <td className={cb.aug_diff > 0 ? 'green-cell': 'red-cell'}>{cb.aug_diff > 0 ? '-' : '+'} R{(cb.aug_diff < 0 ? -1 * cb.aug_diff : cb.aug_diff  || 0.00).toFixed(2)}</td>

                                    <td>R{(cb.sept_budget || 0.00).toFixed(2)}</td>
                                    <td>R{(cb.sept_actual || 0.00).toFixed(2)}</td>
                                    <td className={cb.sept_diff > 0 ? 'green-cell': 'red-cell'}>{cb.sept_diff > 0 ? '-' : '+'} R{(cb.sept_diff < 0 ? -1 * cb.sept_diff : cb.sept_diff  || 0.00).toFixed(2)}</td>

                                   	<td>R{(cb.oct_budget || 0.00).toFixed(2)}</td>
                                    <td>R{(cb.oct_actual || 0.00).toFixed(2)}</td>
                                    <td className={cb.oct_diff > 0 ? 'green-cell': 'red-cell'}>{cb.oct_diff > 0 ? '-' : '+'} R{(cb.oct_diff < 0 ? -1 * cb.oct_diff : cb.oct_diff  || 0.00).toFixed(2)}</td>

                                    <td>R{(cb.nov_budget || 0.00).toFixed(2)}</td>
                                    <td>R{(cb.nov_actual || 0.00).toFixed(2)}</td>
                                    <td className={cb.nov_diff > 0 ? 'green-cell': 'red-cell'}>{cb.nov_diff > 0 ? '-' : '+'} R{(cb.nov_diff < 0 ? -1 * cb.nov_diff : cb.nov_diff  || 0.00).toFixed(2)}</td>

                                    <td>R{(cb.dec_budget || 0.00).toFixed(2)}</td>
                                    <td>R{(cb.dec_actual || 0.00).toFixed(2)}</td>
                                    <td className={cb.dec_diff > 0 ? 'green-cell': 'red-cell'}>{cb.dec_diff > 0 ? '-' : '+'} R{(cb.dec_diff < 0 ? -1 * cb.dec_diff : cb.dec_diff  || 0.00).toFixed(2)}</td>

                                    <td className='th-total'>R{(cb.budget_year_total || 0.00).toFixed(2)}</td>
                                    <td className='th-total'>R{(cb.actual_year_total || 0.00).toFixed(2)}</td>
                                    <td className={cb.diff_year_total > 0 ? 'green-cell': 'red-cell'}>{cb.diff_year_total > 0 ? '-' : '+'} R{(cb.diff_year_total < 0 ? -1 * cb.diff_year_total : cb.diff_year_total  || 0.00).toFixed(2)}</td>
																	
                                </tr>
                            ))}

							<tr className='balance-row'>
								<td>Balance</td>
								<td>R{debitColunTotal.jan_budget}</td>
								<td>R{debitColunTotal.jan_actual}</td>
								<td className={debitColunTotal.jan_diff > 0 ? 'green-cell': 'red-cell'}>{debitColunTotal.jan_diff > 0 ? '-' : '+'} R{(debitColunTotal.jan_diff < 0 ? -1 * debitColunTotal.jan_diff : debitColunTotal.jan_diff || 0).toFixed(2)}</td>

								<td>R{debitColunTotal.feb_budget}</td>
								<td>R{debitColunTotal.feb_actual}</td>
								<td className={debitColunTotal.feb_diff > 0 ? 'green-cell': 'red-cell'}>{debitColunTotal.feb_diff > 0 ? '-' : '+'} R{(debitColunTotal.feb_diff < 0 ? -1 * debitColunTotal.feb_diff : debitColunTotal.feb_diff || 0).toFixed(2)}</td>

								<td>R{debitColunTotal.mar_budget}</td>
								<td>R{debitColunTotal.mar_actual}</td>
								<td className={debitColunTotal.mar_diff > 0 ? 'green-cell': 'red-cell'}>{debitColunTotal.mar_diff > 0 ? '-' : '+'} R{(debitColunTotal.mar_diff < 0 ? -1 * debitColunTotal.mar_diff : debitColunTotal.mar_diff || 0).toFixed(2)}</td>
								
								<td>R{debitColunTotal.apr_budget}</td>
								<td>R{debitColunTotal.apr_actual}</td>
								<td className={debitColunTotal.apr_diff > 0 ? 'green-cell': 'red-cell'}>{debitColunTotal.apr_diff > 0 ? '-' : '+'} R{(debitColunTotal.apr_diff < 0 ? -1 * debitColunTotal.apr_diff : debitColunTotal.apr_diff || 0).toFixed(2)}</td>
								
								<td>R{debitColunTotal.may_budget}</td>
								<td>R{debitColunTotal.may_actual}</td>
								<td className={debitColunTotal.may_diff > 0 ? 'green-cell': 'red-cell'}>{debitColunTotal.may_diff > 0 ? '-' : '+'} R{(debitColunTotal.may_diff < 0 ? -1 * debitColunTotal.may_diff : debitColunTotal.may_diff || 0).toFixed(2)}</td>
								
								<td>R{debitColunTotal.jun_budget}</td>
								<td>R{debitColunTotal.jun_actual}</td>
								<td className={debitColunTotal.jun_diff > 0 ? 'green-cell': 'red-cell'}>{debitColunTotal.jun_diff > 0 ? '-' : '+'} R{(debitColunTotal.jun_diff < 0 ? -1 * debitColunTotal.jun_diff : debitColunTotal.jun_diff || 0).toFixed(2)}</td>
								
								<td>R{debitColunTotal.jul_budget}</td>
								<td>R{debitColunTotal.jul_actual}</td>
								<td className={debitColunTotal.jul_diff > 0 ? 'green-cell': 'red-cell'}>{debitColunTotal.jul_diff > 0 ? '-' : '+'} R{(debitColunTotal.jul_diff < 0 ? -1 * debitColunTotal.jul_diff : debitColunTotal.jul_diff || 0).toFixed(2)}</td>
								
								<td>R{debitColunTotal.aug_budget}</td>
								<td>R{debitColunTotal.aug_actual}</td>
								<td className={debitColunTotal.aug_diff > 0 ? 'green-cell': 'red-cell'}>{debitColunTotal.aug_diff > 0 ? '-' : '+'} R{(debitColunTotal.aug_diff < 0 ? -1 * debitColunTotal.aug_diff : debitColunTotal.aug_diff || 0).toFixed(2)}</td>
								
								<td>R{debitColunTotal.sept_budget}</td>
								<td>R{(debitColunTotal.sept_actual || 0).toFixed(2)}</td>
								<td className={debitColunTotal.sept_diff > 0 ? 'green-cell': 'red-cell'}>{debitColunTotal.sept_diff > 0 ? '-' : '+'} R{(debitColunTotal.sept_diff < 0 ? -1 * debitColunTotal.sept_diff : debitColunTotal.sept_diff || 0).toFixed(2)}</td>
								
								<td>R{debitColunTotal.oct_budget}</td>
								<td>R{debitColunTotal.oct_actual}</td>
								<td className={debitColunTotal.oct_diff > 0 ? 'green-cell': 'red-cell'}>{debitColunTotal.oct_diff > 0 ? '-' : '+'} R{(debitColunTotal.oct_diff < 0 ? -1 * debitColunTotal.oct_diff : debitColunTotal.oct_diff || 0).toFixed(2)}</td>
								
								<td>R{debitColunTotal.nov_budget}</td>
								<td>R{debitColunTotal.nov_actual}</td>
								<td className={debitColunTotal.nov_diff > 0 ? 'green-cell': 'red-cell'}>{debitColunTotal.nov_diff > 0 ? '-' : '+'} R{(debitColunTotal.nov_diff < 0 ? -1 * debitColunTotal.nov_diff : debitColunTotal.nov_diff || 0).toFixed(2)}</td>
								
								<td>R{debitColunTotal.dec_budget}</td>
								<td>R{debitColunTotal.dec_actual}</td>
								<td className={debitColunTotal.dec_diff > 0 ? 'green-cell': 'red-cell'}>{debitColunTotal.dec_diff > 0 ? '-' : '+'} R{(debitColunTotal.dec_diff < 0 ? -1 * debitColunTotal.dec_diff : debitColunTotal.dec_diff || 0).toFixed(2)}</td>
								
								<td>R {(debitColunTotal.budget_total || 0).toFixed(2)}</td>
								<td>R {(debitColunTotal.actual_total || 0).toFixed(2)}</td>
								<td className={debitColunTotal.diff_total > 0 ? 'green-cell': 'red-cell'}>{debitColunTotal.diff_total > 0 ? '-' : '+'} R{(debitColunTotal.diff_total < 0 ? -1 * debitColunTotal.diff_total : debitColunTotal.diff_total || 0).toFixed(2)}</td>


							</tr>

							<tr>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</main>
	)
}