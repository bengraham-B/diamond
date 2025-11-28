"use client"
import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import "./BudgetTable.scss"

export default function BudgetTable() {
    const { data: session } = useSession()

    const [previousMonthBudget, setPreviousMonthBudget] = useState([])
    const [currentMonthBudget, setCurrentMonthBudget] = useState([])

    const [previousMonthTotals_CREDIT, setPreviousMonthTotals_CREDIT] = useState([])
    const [currentMonthTotals_CREDIT, setCurrentMonthTotals_CREDIT] = useState([])

    const [previousMonthTotals_DEBIT, setPreviousMonthTotals_DEBIT] = useState([])
    const [currentMonthTotals_DEBIT, setCurrentMonthTotals_DEBIT] = useState([])


    const fetchBudget = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_ENV_SERVER_BASE}/api/budget/get_budget`, {
                method: "POST",
                body: JSON.stringify({
                    accountID: session.diamond.accountID,
                    month: 11
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if(response.ok){
                const data = await response.json()
                setPreviousMonthBudget(data.previous_month)
                setCurrentMonthBudget(data.current_month)

                console.log(data.month_totals)
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
        fetchBudget()
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
                        <th colSpan={3} className='previous-month'>OCT</th>
                        <th colSpan={3} className='current-month'>NOV</th>
                        <th colSpan={3} className='total'>TOTAL</th>
                    </tr>
                    <tr className='budget-details-hr'>
                        <th></th>
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
                    <tr className='bg-green-600 text-white text-left'>
                        <td colSpan={10} className='text-start'>CREDIT</td>
                    </tr>

                    {previousMonthBudget && previousMonthBudget.filter((PB) => PB.budget_type === 'credit').map((PB) => (
                        <tr key={PB.id}>
                            <td>{PB.category_name}</td>
                            <td>R{PB.budget}</td>
                            <td>R{(PB.actual).toFixed(2)}</td>
                            <td className={`${PB.diff < 0 ? 'green-cell' : 'red-cell'}`}>R{(PB.diff).toFixed(2) * -1}</td>
                            
                            <td>NOV B</td>
                            <td>NOV A</td>
                            <td>NOV D</td>
                            
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
                        <td>Blank</td>
                    </tr>
                    

                    <tr className='bg-red-600 text-white text-left'>
                        <td colSpan={10} className='text-start'>DEBIT</td>
                    </tr>

                    {previousMonthBudget && previousMonthBudget.filter((PB) => PB.budget_type === 'debit').map((PB) => (
                        <tr key={PB.id}>
                            <td>{PB.category_name}</td>
                            <td>R{PB.budget}</td>
                            <td>R{(PB.actual).toFixed(2)}</td>
                            <td className={`${PB.diff > 0 ? 'green-cell' : 'red-cell'}`}>R{(PB.diff).toFixed(2)}</td>
                            
                            <td>NOV B</td>
                            <td>NOV A</td>
                            <td>NOV D</td>
                            
                            <td>DEC B</td>
                            <td>DEC A</td>
                            <td>DEC D</td>
                        </tr>
                    ))}
                    <tr className='balance-row'>
                        <td className='text-red-600'>DEBIT BALANCE</td>
                        <td>R{previousMonthTotals_DEBIT.previous_debit_budget}</td>
                        <td>R{previousMonthTotals_DEBIT.previous_debit_actual}</td>
                        <td>R{previousMonthTotals_DEBIT.previous_debit_diff}</td>

                        <td>R{currentMonthTotals_DEBIT.current_debit_budget}</td>
                        <td>R{currentMonthTotals_DEBIT.current_debit_actual}</td>
                        <td>R{(currentMonthTotals_DEBIT.current_debit_diff).toFixed(2)}</td>
                        
                        <td>DEC B</td>
                        <td>DEC A</td>
                        <td>DEC D</td>
                    </tr>
                </tbody>

            </table>
        </section>
    )
}
