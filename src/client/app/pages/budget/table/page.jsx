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
			
			//X --- CREDIT ---
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

			//X --- DEBIT ---
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
                                    <td className={cb.jan_diff < 0 ? 'green-cell': 'red-cell'}>R{(cb.jan_diff || 0.00).toFixed(2)}</td>

                                    <td>R{(cb.feb_budget || 0.00).toFixed(2)}</td>
                                    <td>R{(cb.feb_actual || 0.00).toFixed(2)}</td>
                                    <td className={cb.feb_diff < 0 ? 'green-cell': 'red-cell'}>R{(cb.feb_diff || 0.00).toFixed(2)}</td>

                                    <td>R{(cb.mar_budget || 0.00).toFixed(2)}</td>
                                    <td>R{(cb.mar_actual || 0.00).toFixed(2)}</td>
                                    <td className={cb.mar_diff < 0 ? 'green-cell': 'red-cell'}>R{(cb.mar_diff || 0.00).toFixed(2)}</td>

                                    <td>R{(cb.apr_budget || 0.00).toFixed(2)}</td>
                                    <td>R{(cb.apr_actual || 0.00).toFixed(2)}</td>
                                    <td className={cb.apr_diff < 0 ? 'green-cell': 'red-cell'}>R{(cb.apr_diff || 0.00).toFixed(2)}</td>

                                    <td>R{(cb.may_budget).toFixed(2)}</td>
                                    <td >R{(cb.may_actual).toFixed(2)}</td>
                                    <td className={cb.may_diff < 0 ? 'green-cell': 'red-cell'}>R{(cb.may_diff).toFixed(2)}</td>

                                    <td>R{(cb.jun_budget || 0.00).toFixed(2)}</td>
                                    <td>R{(cb.jun_actual || 0.00).toFixed(2)}</td>
                                    <td className={cb.jun_diff < 0 ? 'green-cell': 'red-cell'}>R{(cb.jun_diff || 0.00).toFixed(2)}</td>

                                    <td>R{(cb.jul_budget || 0.00).toFixed(2)}</td>
                                    <td>R{(cb.jul_actual || 0.00).toFixed(2)}</td>
                                    <td className={cb.jul_diff < 0 ? 'green-cell': 'red-cell'}>R{(cb.jul_diff || 0.00).toFixed(2)}</td>

                                    <td>R{(cb.aug_budget || 0.00).toFixed(2)}</td>
                                    <td>R{(cb.aug_actual || 0.00).toFixed(2)}</td>
                                    <td className={cb.aug_diff < 0 ? 'green-cell': 'red-cell'}>R{(cb.aug_diff || 0.00).toFixed(2)}</td>

                                    <td>R{(cb.sept_budget || 0.00).toFixed(2)}</td>
                                    <td>R{(cb.sept_actual || 0.00).toFixed(2)}</td>
                                    <td className={cb.sept_diff < 0 ? 'green-cell': 'red-cell'}>R{(cb.sept_diff || 0.00).toFixed(2)}</td>

                                    <td>R{(cb.oct_budget || 0.00).toFixed(2)}</td>
                                    <td>R{(cb.oct_actual || 0.00).toFixed(2)}</td>
                                    <td className={cb.oct_diff < 0 ? 'green-cell': 'red-cell'}>R{(cb.oct_diff || 0.00).toFixed(2)}</td>

                                    <td>R{(cb.nov_budget || 0.00).toFixed(2)}</td>
                                    <td>R{(cb.nov_actual || 0.00).toFixed(2)}</td>
                                    <td className={cb.nov_diff < 0 ? 'green-cell': 'red-cell'}>R{(cb.nov_diff || 0.00).toFixed(2)}</td>

                                    <td>R{(cb.dec_budget || 0.00).toFixed(2)}</td>
                                    <td>R{(cb.dec_actual || 0.00).toFixed(2)}</td>
                                    <td className={cb.dec_diff < 0 ? 'green-cell': 'red-cell'}>R{(cb.dec_diff || 0.00).toFixed(2)}</td>

                                    <td className='th-total'>R{(cb.budget_year_total || 0.00).toFixed(2)}</td>
                                    <td className='th-total'>R{(cb.actual_year_total || 0.00).toFixed(2)}</td>
                                    <td className={cb.diff_year_total < 0 ? 'green-cell': 'red-cell'}>R{(cb.diff_year_total || 0.00).toFixed(2)}</td>
                                </tr>
                            ))}
							
							<tr>
								<td>Balance</td>
								<td>R{creditColunTotal.jan_budget}</td>
								<td>R{creditColunTotal.jan_actual}</td>
								<td className={creditColunTotal.jan_diff < 0 ? 'green-cell': 'red-cell'}>R{creditColunTotal.jan_diff}</td>

								<td>R{creditColunTotal.feb_budget}</td>
								<td>R{creditColunTotal.feb_actual}</td>
								<td className={creditColunTotal.feb_diff < 0 ? 'green-cell': 'red-cell'}>R{creditColunTotal.feb_diff}</td>

								<td>R{creditColunTotal.mar_budget}</td>
								<td>R{creditColunTotal.mar_actual}</td>
								<td className={creditColunTotal.mar_diff < 0 ? 'green-cell': 'red-cell'}>R{creditColunTotal.mar_diff}</td>
								
								<td>R{creditColunTotal.apr_budget}</td>
								<td>R{creditColunTotal.apr_actual}</td>
								<td className={creditColunTotal.apr_diff < 0 ? 'green-cell': 'red-cell'}>R{creditColunTotal.apr_diff}</td>
								
								<td>R{creditColunTotal.may_budget}</td>
								<td>R{creditColunTotal.may_actual}</td>
								<td className={creditColunTotal.may_diff < 0 ? 'green-cell': 'red-cell'}>R{creditColunTotal.may_diff}</td>
								
								<td>R{creditColunTotal.jun_budget}</td>
								<td>R{creditColunTotal.jun_actual}</td>
								<td className={creditColunTotal.jun_diff < 0 ? 'green-cell': 'red-cell'}>R{creditColunTotal.jun_diff}</td>
								
								<td>R{creditColunTotal.jul_budget}</td>
								<td>R{creditColunTotal.jul_actual}</td>
								<td className={creditColunTotal.jul_diff < 0 ? 'green-cell': 'red-cell'}>R{creditColunTotal.jul_diff}</td>
								
								<td>R{creditColunTotal.aug_budget}</td>
								<td>R{creditColunTotal.aug_actual}</td>
								<td className={creditColunTotal.aug_diff < 0 ? 'green-cell': 'red-cell'}>R{creditColunTotal.aug_diff}</td>
								
								<td>R{creditColunTotal.sept_budget}</td>
								<td>R{creditColunTotal.sept_actual}</td>
								<td className={creditColunTotal.sept_diff < 0 ? 'green-cell': 'red-cell'}>R{creditColunTotal.sept_diff}</td>
								
								<td>R{creditColunTotal.oct_budget}</td>
								<td>R{creditColunTotal.oct_actual}</td>
								<td className={creditColunTotal.oct_diff < 0 ? 'green-cell': 'red-cell'}>R{creditColunTotal.oct_diff}</td>
								
								<td>R{creditColunTotal.nov_budget}</td>
								<td>R{creditColunTotal.nov_actual}</td>
								<td className={creditColunTotal.nov_diff < 0 ? 'green-cell': 'red-cell'}>R{creditColunTotal.nov_diff}</td>
								
								<td>R{creditColunTotal.dec_budget}</td>
								<td>R{creditColunTotal.dec_actual}</td>
								<td className={creditColunTotal.dec_diff < 0 ? 'green-cell': 'red-cell'}>R{creditColunTotal.dec_diff}</td>
								
								<td>R {(creditColunTotal.budget_total || 0).toFixed(2)}</td>
								<td>R {(creditColunTotal.actual_total || 0).toFixed(2)}</td>
								<td className={creditColunTotal.diff_total < 0 ? 'green-cell': 'red-cell'}>R {(creditColunTotal.diff_total || 0).toFixed(2)}</td>

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
                                    <td className={cb.jan_diff > 0 ? 'green-cell': 'red-cell'}>R{(cb.jan_diff || 0.00).toFixed(2)}</td>

                                    <td>R{(cb.feb_budget || 0.00).toFixed(2)}</td>
                                    <td>R{(cb.feb_actual || 0.00).toFixed(2)}</td>
                                    <td className={cb.feb_diff > 0 ? 'green-cell': 'red-cell'}>R{(cb.feb_diff || 0.00).toFixed(2)}</td>

                                    <td>R{(cb.mar_budget || 0.00).toFixed(2)}</td>
                                    <td>R{(cb.mar_actual || 0.00).toFixed(2)}</td>
                                    <td className={cb.mar_diff > 0 ? 'green-cell': 'red-cell'}>R{(cb.mar_diff || 0.00).toFixed(2)}</td>

                                    <td>R{(cb.apr_budget || 0.00).toFixed(2)}</td>
                                    <td>R{(cb.apr_actual || 0.00 ).toFixed(2)}</td>
                                    <td className={cb.apr_diff > 0 ? 'green-cell': 'red-cell'}>R{(cb.apr_diff || 0.00).toFixed(2)}</td>

									<td>R{(cb.may_budget || 0.00).toFixed(2)}</td>
                                    <td>R{(cb.may_actual || 0.00).toFixed(2)}</td>
                                    <td className={cb.may_diff > 0 ? 'green-cell': 'red-cell'}>R{(cb.may_diff || 0.00).toFixed(2)}</td>

                                    <td>R{(cb.jun_budget || 0.00).toFixed(2)}</td>
                                    <td>R{(cb.jun_actual || 0.00).toFixed(2)}</td>
                                    <td className={cb.jun_diff > 0 ? 'green-cell': 'red-cell'}>R{(cb.jun_diff || 0.00).toFixed(2)}</td>

                                    <td>R{(cb.jul_budget || 0.00).toFixed(2)}</td>
                                    <td>R{(cb.jul_actual || 0.00).toFixed(2)}</td>
                                    <td className={cb.jul_diff > 0 ? 'green-cell': 'red-cell'}>R{(cb.jul_diff || 0.00).toFixed(2)}</td>

                                    <td>R{(cb.aug_budget || 0.00).toFixed(2)}</td>
                                    <td>R{(cb.aug_actual || 0.00).toFixed(2)}</td>
                                    <td className={cb.aug_diff > 0 ? 'green-cell': 'red-cell'}>R{(cb.aug_diff || 0.00).toFixed(2)}</td>

									<td>R{(cb.sept_budget || 0.00).toFixed(2)}</td>
                                    <td>R{(cb.sept_actual || 0.00).toFixed(2)}</td>
                                    <td className={cb.sept_diff > 0 ? 'green-cell': 'red-cell'}>R{(cb.sept_diff || 0.00).toFixed(2)}</td>

                                    <td>R{(cb.oct_budget || 0.00).toFixed(2)}</td>
                                    <td>R{(cb.oct_actual || 0.00).toFixed(2)}</td>
                                    <td className={cb.oct_diff > 0 ? 'green-cell': 'red-cell'}>R{(cb.oct_diff || 0.00).toFixed(2)}</td>

                                    <td>R{(cb.nov_budget || 0.00).toFixed(2)}</td>
                                    <td>R{(cb.nov_actual || 0.00).toFixed(2)}</td>
                                    <td className={cb.nov_diff > 0 ? 'green-cell': 'red-cell'}>R{(cb.nov_diff || 0.00).toFixed(2)}</td>

                                    <td>R{(cb.dec_budget || 0.00).toFixed(2)}</td>
                                    <td>R{(cb.dec_actual || 0.00.toFixed(2))}</td>
                                    <td className={cb.dec_diff > 0 ? 'green-cell': 'red-cell'}>R{(cb.dec_diff || 0.00).toFixed(2)}</td>

                                    <td>R{(cb.budget_year_total || 0.00).toFixed(2)}</td>
                                    <td>R{(cb.actual_year_total || 0.00).toFixed(2)}</td>
                                    <td className={cb.diff_year_total >0 ? 'green-cell': 'red-cell'}>R{(cb.diff_year_total || 0.00).toFixed(2)}</td>
                                </tr>
                            ))}

							<tr>
								<td>Balance</td>
								<td>R{(debitColunTotal.jan_budget|| 0).toFixed(2)}</td>
								<td>R{(debitColunTotal.jan_actual|| 0).toFixed(2)}</td>
								<td className={debitColunTotal.jan_diff > 0 ? 'green-cell': 'red-cell'}>R{(debitColunTotal.jan_diff|| 0).toFixed(2)}</td>

								<td>R{(debitColunTotal.feb_budget|| 0).toFixed(2)}</td>
								<td>R{(debitColunTotal.feb_actual|| 0).toFixed(2)}</td>
								<td className={debitColunTotal.feb_diff > 0 ? 'green-cell': 'red-cell'}>R{(debitColunTotal.feb_diff|| 0).toFixed(2)}</td>

								<td>R{(debitColunTotal.mar_budget || 0).toFixed(2)}</td>
								<td>R{(debitColunTotal.mar_actual || 0).toFixed(2)}</td>
								<td className={debitColunTotal.mar_diff > 0 ? 'green-cell': 'red-cell'}>R{(debitColunTotal.mar_diff || 0).toFixed(2)}</td>
								
								<td>R{(debitColunTotal.apr_budget || 0).toFixed(2)}</td>
								<td>R{(debitColunTotal.apr_actual || 0).toFixed(2)}</td>
								<td className={debitColunTotal.apr_diff > 0 ? 'green-cell': 'red-cell'}>R{(debitColunTotal.apr_diff || 0).toFixed(2)}</td>
								
								<td>R{(debitColunTotal.may_budget || 0).toFixed(2)}</td>
								<td>R{(debitColunTotal.may_actual || 0).toFixed(2)}</td>
								<td className={debitColunTotal.may_diff > 0 ? 'green-cell': 'red-cell'}>R{(debitColunTotal.may_diff || 0).toFixed(2)}</td>
								
								<td>R{(debitColunTotal.jun_budget || 0).toFixed(2)}</td>
								<td>R{(debitColunTotal.jun_actual || 0).toFixed(2)}</td>
								<td className={debitColunTotal.jun_diff > 0 ? 'green-cell': 'red-cell'}>R{(debitColunTotal.jun_diff || 0).toFixed(2)}</td>
								
								<td>R{(debitColunTotal.jul_budget || 0).toFixed(2)}</td>
								<td>R{(debitColunTotal.jul_actual || 0).toFixed(2)}</td>
								<td className={debitColunTotal.jul_diff > 0 ? 'green-cell': 'red-cell'}>R{(debitColunTotal.jul_diff || 0).toFixed(2)}</td>
								
								<td>R{(debitColunTotal.aug_budget || 0).toFixed(2)}</td>
								<td>R{(debitColunTotal.aug_actual || 0).toFixed(2)}</td>
								<td className={debitColunTotal.aug_diff > 0 ? 'green-cell': 'red-cell'}>R{(debitColunTotal.aug_diff || 0).toFixed(2)}</td>
								
								<td>R{(debitColunTotal.sept_budget || 0).toFixed(2)}</td>
								<td>R{(debitColunTotal.sept_actual || 0).toFixed(2)}</td>
								<td className={debitColunTotal.sept_diff > 0 ? 'green-cell': 'red-cell'}>R{(debitColunTotal.sept_diff || 0).toFixed(2)}</td>
								
								<td>R{(debitColunTotal.oct_budget || 0).toFixed(2)}</td>
								<td>R{(debitColunTotal.oct_actual || 0).toFixed(2)}</td>
								<td className={debitColunTotal.oct_diff > 0 ? 'green-cell': 'red-cell'}>R{(debitColunTotal.oct_diff || 0).toFixed(2)}</td>
								
								<td>R{(debitColunTotal.nov_budget || 0).toFixed(2)}</td>
								<td>R{(debitColunTotal.nov_actual || 0).toFixed(2)}</td>
								<td className={debitColunTotal.nov_diff > 0 ? 'green-cell': 'red-cell'}>R{(debitColunTotal.nov_diff || 0).toFixed(2)}</td>
								
								<td>R{(debitColunTotal.dec_budget || 0).toFixed(2)}</td>
								<td>R{(debitColunTotal.dec_actual || 0).toFixed(2)}</td>
								<td className={debitColunTotal.dec_diff > 0 ? 'green-cell': 'red-cell'}>R{(debitColunTotal.dec_diff || 0).toFixed(2)}</td>
								
								<td>R {(debitColunTotal.budget_total || 0).toFixed(2)}</td>
								<td>R {(debitColunTotal.actual_total || 0).toFixed(2)}</td>
								<td className={debitColunTotal.diff_total > 0 ? 'green-cell': 'red-cell'}>R {(debitColunTotal.diff_total || 0).toFixed(2)}</td>

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
