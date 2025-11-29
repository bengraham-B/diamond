"use client"
import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import './sandbox.scss'

export default function Sandbox() {
        const { data: session } = useSession()
        const [creditBudgetTable, setCreditBudgetTable] = useState([])
        
    
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
    
    useEffect(() => {
        if(!session) return
        fetchBudgetCreditTable()

    },[session])

    if (!session) return
        
    return (
        <main id="sand-box-main">
            
            <section id="table-section">
                <div className='table-wrapper'>
                    <table>
                        <thead>
                            <tr className='month-th-row'>
                                <th className='top-left-bloc'></th>
                                <th colSpan={3} className='jan'>JAN</th>
                                <th colSpan={3} className='jan'>FEB</th>
                                <th colSpan={3} className='jan'>MAR</th>
                                <th colSpan={3} className='jan'>APR</th>
                                <th colSpan={3} className='jan'>MAY</th>
                                <th colSpan={3} className='jan'>JUN</th>
                                <th colSpan={3} className='jan'>JUL</th>
                                <th colSpan={3} className='jan'>AUG</th>
                                <th colSpan={3} className='jan'>SEPT</th>
                                <th colSpan={3} className='jan'>OCT</th>
                                <th colSpan={3} className='jan'>NOV</th>
                                <th colSpan={3} className='jan'>DEC</th>
                                <th colSpan={3} className='jan'>TOTAL</th>
                            </tr>
                            <tr>
                                <th className='th-name'>Name</th>
                                <th>Budget</th>
                                <th>Actual</th>
                                <th>Diff</th>
                                <th>Budget</th>
                                <th>Actual</th>
                                <th>Diff</th>
                                <th>Budget</th>
                                <th>Actual</th>
                                <th>Diff</th>
                                <th>Budget</th>
                                <th>Actual</th>
                                <th>Diff</th>
                                <th>Budget</th>
                                <th>Actual</th>
                                <th>Diff</th>
                                <th>Budget</th>
                                <th>Actual</th>
                                <th>Diff</th>
                                <th>Budget</th>
                                <th>Actual</th>
                                <th>Diff</th>
                                <th>Budget</th>
                                <th>Actual</th>
                                <th>Diff</th>
                                <th>Budget</th>
                                <th>Actual</th>
                                <th>Diff</th>
                                <th>Budget</th>
                                <th>Actual</th>
                                <th>Diff</th>
                                <th>Budget</th>
                                <th>Actual</th>
                                <th>Diff</th>
                                <th>Budget</th>
                                <th>Actual</th>
                                <th>Diff</th>
                                <th className='th-total'>Total</th>
                                <th className='th-total'>Total</th>
                                <th className='th-total'>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {creditBudgetTable && creditBudgetTable.map((cb) => (
                                <tr key={cb.id}>
                                    <td className='th-name'>{cb.name}</td>
                                    <td>{cb.nov_budget}</td>
                                    <td>{cb.nov_actual}</td>
                                    <td>{cb.nov_diff}</td>
                                    <td>Budget</td>
                                    <td>Actual</td>
                                    <td>Diff</td>
                                    <td>Budget</td>
                                    <td>Actual</td>
                                    <td>Diff</td>
                                    <td>Budget</td>
                                    <td>Actual</td>
                                    <td>Diff</td>
                                    <td>Budget</td>
                                    <td>Actual</td>
                                    <td>Diff</td>
                                    <td>Budget</td>
                                    <td>Actual</td>
                                    <td>Diff</td>
                                    <td>Budget</td>
                                    <td>Actual</td>
                                    <td>Diff</td>
                                    <td>Budget</td>
                                    <td>Actual</td>
                                    <td>Diff</td>
                                    <td>Budget</td>
                                    <td>Actual</td>
                                    <td>Diff</td>
                                    <td>Budget</td>
                                    <td>Actual</td>
                                    <td>Diff</td>
                                    <td>{cb.nov_budget}</td>
                                    <td>{cb.nov_actual}</td>
                                    <td>{cb.nov_diff}</td>
                                    <td>{cb.dec_budget}</td>
                                    <td>{cb.dec_actual}</td>
                                    <td>{cb.dec_diff}</td>
                                    <td className='th-total'>Total</td>
                                    <td className='th-total'>Total</td>
                                    <td className='th-total'>Total</td>
                                </tr>
                            ))}
                         
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    )
}
