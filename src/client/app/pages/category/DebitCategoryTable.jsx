"use client"
import React, {useState, useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useSession } from 'next-auth/react'
import './CategoryTable.scss'

export default function DebitCategoryTable() {
        const { data: session } = useSession()
    
    const [budgets, setBudgets] = useState([])

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
                const response = await fetch(`${process.env.NEXT_PUBLIC_ENV_SERVER_BASE}/api/budget/get_budgets`, {
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
                    setBudgets(data.budget)
                    console.log("JJJKJK")
                    console.log(data.budget)
    
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
                    {budgets && budgets.map((B, i) => (
                        <tr key={B.id}>
                            <td>{i+1}</td>
                            <td>{B.name}</td>
                            <td>R{(B.jul).toFixed(2)}</td>
                            <td>R{(B.aug).toFixed(2)}</td>
                            <td>R{(B.sept).toFixed(2)}</td>
                            <td>R{(B.oct).toFixed(2)}</td>
                            <td>R{(B.nov).toFixed(2)}</td>
                            <td>R{(B.dec).toFixed(2)}</td>
                            <td className='text-orange-500'>R{(B.avg_per_txn).toFixed(2)}</td>
                            <td>{(B.count)}</td>
                            <td>R{(B.total).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <ToastContainer />
            </div>
    </section>
  )
}
