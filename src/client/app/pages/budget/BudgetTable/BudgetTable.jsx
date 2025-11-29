"use client"
import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import "./BudgetTable.scss"

export default function BudgetTable() {
    const { data: session } = useSession()

    const [creditBudgetTable, setCreditBudgetTable] = useState([])
    const [debitBudgetTable, setDebitBudgetTable] = useState([])

    const [previousMonthTotals_CREDIT, setPreviousMonthTotals_CREDIT] = useState([])
    const [currentMonthTotals_CREDIT, setCurrentMonthTotals_CREDIT] = useState([])

    const [previousMonthTotals_DEBIT, setPreviousMonthTotals_DEBIT] = useState([])
    const [currentMonthTotals_DEBIT, setCurrentMonthTotals_DEBIT] = useState([])


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

    const fetchBudgetTotals_CREDIT = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_ENV_SERVER_BASE}/api/budget/credit_budget_total`, {
                method: "POST",
                body: JSON.stringify({
                    accountID: session.diamond.accountID,
                    month: 11
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await response.json()
            console.log("KJHGFDSA", data)
            setPreviousMonthTotals_CREDIT(data.prevoiousMonth_CREDIT[0])
            setCurrentMonthTotals_CREDIT(data.currentMonth_CREDIT[0])

        } catch(error) {
            console.error(error)

        }
    }
    
    const fetchBudgetTotals_DEBIT = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_ENV_SERVER_BASE}/api/budget/debit_budget_total`, {
                method: "POST",
                body: JSON.stringify({
                    accountID: session.diamond.accountID,
                    month: 11
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await response.json()
            console.log("KJHGFDSA", data)
            setPreviousMonthTotals_DEBIT(data.prevoiousMonth_DEBIT[0])
            setCurrentMonthTotals_DEBIT(data.currentMonth_DEBIT[0])

        } catch(error) {
            console.error(error)

        }
    }

    useEffect(() => {
        if(!session) return
        fetchBudgetCreditTable()
        fetchBudgetDebitTable()

        fetchBudgetTotals_CREDIT()
        fetchBudgetTotals_DEBIT()
    },[session])

    if (!session) return
    
    return (
        <section id='Budget-Table-Wrapper'>
            <table id='Budget-Table'>

                <thead>
                    <tr>
                        <th></th>
                        <th colSpan={3} className='previous-month'>SEPT</th>
                        <th colSpan={3} className='previous-month'>OCT</th>
                        <th colSpan={3} className='current-month'>NOV</th>
                        <th colSpan={3} className='current-month'>DEC</th>
                        <th colSpan={3} className='total'>TOTAL</th>
                    </tr>
                    <tr className='budget-details-hr'>
                        <th className='top-left-conrner'></th>
                        <th>BUDGET</th>
                        <th>ACTUAL</th>
                        <th>DIFF</th>
                       
                        <th>BUDGET</th>
                        <th>ACTUAL</th>
                        <th>DIFF</th>
                        
                        <th>BUDGET</th>
                        <th>ACTUAL</th>
                        <th>DIFF</th>
                        
                        <th>BUDGET</th>
                        <th>ACTUAL</th>
                        <th>DIFF</th>
                        
                        <th>BUDGET</th>
                        <th>ACTUAL</th>
                        <th>DIFF</th>
                    </tr>
                </thead>

                <tbody>
                    <tr className='credit-row-header bg-green-600 text-white text-left'>
                        <td colSpan={16} className='text-start'>CREDIT</td>
                    </tr>

                    {creditBudgetTable && creditBudgetTable.map((CB) => (
                        <tr key={CB.id}>
                            <td className='budget-name-credit'>{CB.name}</td>

                            <td>R{CB.sept_budget}</td>
                            <td>R{(CB.sept_actual).toFixed(2)}</td>
                            <td className={`${CB.sept_diff < 0 ? 'green-cell' : 'red-cell'}`}>R{(CB.sept_diff).toFixed(2) * -1}</td>
                            

                            <td>R{CB.oct_budget}</td>
                            <td>R{(CB.oct_actual).toFixed(2)}</td>
                            <td className={`${CB.oct_diff < 0 ? 'green-cell' : 'red-cell'}`}>R{(CB.oct_diff).toFixed(2) * -1}</td>
                            

                            <td>R{CB.nov_budget}</td>
                            <td>R{(CB.nov_actual).toFixed(2)}</td>
                            <td className={`${CB.nov_diff < 0 ? 'green-cell' : 'red-cell'}`}>R{(CB.nov_diff).toFixed(2) * -1}</td>
        
                            <td>R{CB.dec_budget}</td>
                            <td>R{(CB.dec_actual).toFixed(2)}</td>
                            <td className={`${CB.nov_diff < 0 ? 'green-cell' : 'red-cell'}`}>R{(CB.dec_diff).toFixed(2) * -1}</td>
        
                            
                            <td>DEC B</td>
                            <td>DEC A</td>
                            <td>DEC D</td>
                            
                        </tr>
                    ))}
                    
                    <tr className='balance-row'>
                        <td className='text-green-600'>CREDIT BALANCE</td>
                        <td>R{previousMonthTotals_CREDIT.previous_credit_budget}</td>
                        <td>R{previousMonthTotals_CREDIT.previous_credit_actual}</td>
                        <td>R{previousMonthTotals_CREDIT.previous_credit_diff}</td>
                        
                        <td>R{currentMonthTotals_CREDIT.current_credit_budget}</td>
                        <td>R{currentMonthTotals_CREDIT.current_credit_actual}</td>
                        <td>R{currentMonthTotals_CREDIT.current_credit_diff}</td>
                        
                        <td>DEC B</td>
                        <td>DEC A</td>
                        <td>DEC D</td>
                    </tr>
                    
                    <tr className='text-white'>
                        <td>Blank</td>
                        <td>Blank</td>
                        <td>Blank</td>
                        <td>Blank</td>

                        <td>Blank</td>
                        <td>Blank</td>
                        <td>Blank</td>
                        <td>Blank</td>
                        <td>Blank</td>

                   
                    </tr>
                    

                    <tr className='bg-red-600 text-white text-left'>
                        <td colSpan={16} className='text-start'>DEBIT</td>
                    </tr>

                    {debitBudgetTable && debitBudgetTable.map((DB) => (
                        <tr key={DB.id}>
                            <td>{DB.name}</td>
                            <td>R{DB.sept_budget}</td>
                            <td>R{(DB.sept_actual).toFixed(2)}</td>
                            <td className={`${DB.sep_diff < 0 ? 'green-cell' : 'red-cell'}`}>R{(DB.sept_diff).toFixed(2) * -1}</td>
                            
                            <td>{DB.name}</td>
                            <td>R{DB.oct_budget}</td>
                            <td>R{(DB.oct_actual).toFixed(2)}</td>
                            <td className={`${DB.oct_diff < 0 ? 'green-cell' : 'red-cell'}`}>R{(DB.oct_diff).toFixed(2) * -1}</td>

                            <td>R{DB.nov_budget}</td>
                            <td>R{(DB.nov_actual).toFixed(2)}</td>
                            <td className={`${DB.nov_diff < 0 ? 'green-cell' : 'red-cell'}`}>R{(DB.nov_diff).toFixed(2) * -1}</td>
        
                            <td>R{DB.dec_budget}</td>
                            <td>R{(DB.dec_actual).toFixed(2)}</td>
                            <td className={`${DB.nov_diff < 0 ? 'green-cell' : 'red-cell'}`}>R{(DB.dec_diff).toFixed(2) * -1}</td>
        
                            
                            <td>DEC B</td>
                            <td>DEC A</td>
                            <td>DEC D</td>
                        </tr>
                    ))}
                    <tr className='balance-row'>
                        <td className='text-red-600'>DEBIT BALANCE</td>
                        <td>R{previousMonthTotals_DEBIT.previous_debit_budget}</td>
                        <td>R{previousMonthTotals_DEBIT.previous_debit_actual}</td>
                        <td>R{(previousMonthTotals_DEBIT.previous_debit_diff || 0).toFixed(2)}</td>

                        <td>R{currentMonthTotals_DEBIT.current_debit_budget}</td>
                        <td>R{currentMonthTotals_DEBIT.current_debit_actual}</td>
                        <td>R{(currentMonthTotals_DEBIT.current_debit_diff || 0).toFixed(2) || 0}</td>
                        
                        {/* <td>DEC B</td>
                        <td>DEC A</td>
                        <td>DEC D</td> */}
                    </tr>
                </tbody>

            </table>
        </section>
    )
}
