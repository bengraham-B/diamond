"use client"
import React, {useState, useEffect} from 'react'
import { useSession } from 'next-auth/react'
import "./Table.scss"

// =======================================================================================================
//Y  										Budget Page
// =======================================================================================================

export default function Page() {
    const { data: session } = useSession()
    const [budgets, setBudgets] = useState([])

    useEffect(() => {
        if(!session) return

    },[session])

    if (!session) return
    
    return (
        <main>

            <section>
                <h1>Budget</h1>
            </section>

            <section id="Filter">

            </section>

            <section id="Table">
                <table className='content-table'>
                    <thead>
                        <tr>
                            <th>Nr</th>
                            <th>name</th>
                            <th>Details</th>
                            <th>Transactions</th>
                            <th>Debtor Transaction</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {budgets && budgets.map((B, i) => (
                            <tr key={B.id}>
                                <td>{i+1}</td>
                                <td>{B.name}</td>
                                <td>{B.details}</td>
                                <td>Transactions</td>
                                <td>Debtor Transaction</td>
                                <td>Status</td>
                                <td><button onClick={() => showEditModal({name: C.name, details: C.details, categoryID: C.id, accountID: C.account_id}) }>Edit</button></td>
                            </tr>
                        ))}
                    </tbody>
            </table>

            </section>
            
        </main>
    )
}
