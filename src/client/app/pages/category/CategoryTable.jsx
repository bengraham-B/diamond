"use client"
import React, {useState, useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useSession } from 'next-auth/react'
import './CategoryTable.scss'

export default function CategoryTable() {
        const { data: session } = useSession()
    
    const [budgets, setBudgets] = useState([])
    const [creditBalance, setCreditBalance] = useState(0)
    const [debitBalance, setDebitBalance] = useState(0)
    

            //Y React Toast functions
            const notifySuccess = (msg) => {
                toast.success(msg, {
                    className: "toast-success"
                })
            }
        
            const notifyError = (msg) => {
                toast.error(msg, {
                    className: "toast-error"
                })
            }
    
    
        //Y Fetch Categories
        const fetchBudgets = async() => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_ENV_SERVER_BASE}/api/category/get_month_total_per_category`, {
                    method: "POST",
                    body: JSON.stringify({
                        accountID: session.diamond.accountID,
                        month: 11,
                        year: 2025
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                
                if(response.ok){
                    const data = await response.json()
                    setBudgets(data.budget)
                    setCreditBalance(data.balance[0].year_credit_total)
                    setDebitBalance(data.balance[0].year_debit_total)

    
                } else {
                    notifyError("Could not Fetch Budgets")
                }
    
            } catch (error) {
                notifyError("Could not Fetch Budgets", error)
            }
        }

        useEffect(() => {
            if(!session) return
            fetchBudgets()
        },[session])

        if (!session) return

    return (
        <section>
            <table className='content-table'>
                <thead>
                    <tr>
                        <th>Nr</th>
                        <th>Category</th>
                        <th>Jul</th>
                        <th>Aug</th>
                        <th>Sept</th>
                        <th>Oct</th>
                        <th>Nov</th>
                        <th>Dec</th>
                        <th>AVG</th>
                        <th>Count</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {budgets && budgets.filter((B) => B.cat_type === 'credit').map((B, i) => (
                        <tr key={B.id}>
                            <td>{i+1}</td>
                            <td>{B.name}</td>
                            <td>R{(B.jul).toFixed(2)}</td>
                            <td>R{(B.aug).toFixed(2)}</td>
                            <td>R{(B.sept).toFixed(2)}</td>
                            <td>R{(B.oct).toFixed(2)}</td>
                            <td>R{(B.nov).toFixed(2)}</td>
                            <td>R{(B.dec).toFixed(2)}</td>
                            <td className='text-green-500'>R{(B.avg_per_txn).toFixed(2)}</td>
                            <td>{(B.count)}</td>
                            <td>R{(B.total).toFixed(2)}</td>
                        </tr>
                    ))}
                    <tr>
                        <td></td>
                        <td className='font-bold text-green-500'>Credit Balance</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className='font-bold text-green-500'>R{creditBalance ? (creditBalance && creditBalance).toFixed(2) : 0.00}</td>
                    </tr>
                    {budgets && budgets.filter((B) => B.cat_type === 'debit').map((B, i) => (
                        <tr key={B.id}>
                            <td>{i+1}</td>
                            <td>{B.name}</td>
                            <td>R{(B.jul).toFixed(2)}</td>
                            <td>R{(B.aug).toFixed(2)}</td>
                            <td>R{(B.sept).toFixed(2)}</td>
                            <td>R{(B.oct).toFixed(2)}</td>
                            <td>R{(B.nov).toFixed(2)}</td>
                            <td>R{(B.dec).toFixed(2)}</td>
                            <td className='text-red-500'>R{(B.avg_per_txn).toFixed(2)}</td>
                            <td>{(B.count)}</td>
                            <td>R{(B.total).toFixed(2)}</td>
                        </tr>
                    ))}
                    <tr>
                        <td></td>
                        <td className='font-bold text-red-500'>Debit Balance</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className='font-bold text-red-500'>R{debitBalance ? (debitBalance && debitBalance).toFixed(2) : 0.00}</td>
                    </tr>
                </tbody>
            </table>
            <div>
                <ToastContainer />
            </div>
    </section>
  )
}
