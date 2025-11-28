"use client"
import React from 'react'
import "./BudgetTable.scss"

export default function BudgetTable() {
    return (
        <section id='Budget-Table-Wrapper'>
            <table id='Budget-Table'>

                <thead>
                    <tr>
                        <th></th>
                        <th colSpan={3}>OCT</th>
                        <th colSpan={3}>NOV</th>
                        <th colSpan={3}>TOTAL</th>
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
                    <tr>
                        <td className='text-green-600'>CREDIT</td>
                        <td>OCT B</td>
                        <td>OCT A</td>
                        <td>OCT D</td>
                        
                        <td>NOV B</td>
                        <td>NOV A</td>
                        <td>NOV D</td>
                        
                        <td>DEC B</td>
                        <td>DEC A</td>
                        <td>DEC D</td>
                    </tr>
                    
                    <tr className='balance-row'>
                        <td className='text-green-600'>CREDIT BALANCE</td>
                        <td>OCT B</td>
                        <td>OCT A</td>
                        <td>OCT D</td>
                        
                        <td>NOV B</td>
                        <td>NOV A</td>
                        <td>NOV D</td>
                        
                        <td>DEC B</td>
                        <td>DEC A</td>
                        <td>DEC D</td>
                    </tr>
                    
                    <tr>
                        <td>Blank</td>
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
                    
                    <tr>
                        <td className='text-red-600'>DEBIT</td>
                        <td>R200</td>
                        <td>R150</td>
                        <td className='red-cell'>R150</td>
                        
                        <td>NOV B</td>
                        <td>NOV A</td>
                        <td>NOV D</td>
                        
                        <td>DEC B</td>
                        <td>DEC A</td>
                        <td>DEC D</td>
                    </tr>

                    <tr className='balance-row'>
                        <td className='text-red-600'>DEBIT BALANCE</td>
                        <td>OCT B</td>
                        <td>OCT A</td>
                        <td>OCT D</td>
                        
                        <td>NOV B</td>
                        <td>NOV A</td>
                        <td>NOV D</td>
                        
                        <td>DEC B</td>
                        <td>DEC A</td>
                        <td>DEC D</td>
                    </tr>
                </tbody>

            </table>
        </section>
    )
}
