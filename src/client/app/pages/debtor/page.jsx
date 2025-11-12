"use client"
import React, { useEffect, useState } from 'react'
import "./debtor.scss"
import Link from 'next/link'

export default function page() {
	const [debtors, setDebtors] = useState()


    const fetchDebtors = async () => {
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_ENV_SERVER_BASE}/api/debtor/get_balance_per_outstanding_debtor`, {
				method: "POST",
				body: JSON.stringify({
					accountID: process.env.NEXT_PUBLIC_ACCOUNT_ID
				}),
				headers: {
					"Content-Type": "application/json"
				}
			})
			if(response.ok){
				const data = await response.json()
				console.log(data)
				console.log(response.status)
				setDebtors(data.balance)
			}
			
		} catch (error) {
			// notifyError("Could not fetch Records: " + error)
			console.log("Could not fetch Records: " + error)
		}
	}

    useEffect(() => {
		fetchDebtors()
	}, [])

	return (
		<main className='debtor'>
			<section id="Table-Container" className="mt-6">
                <table className="w-full border border-gray-300 rounded-md border-collapse ">
                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                        <tr>
                            <th className="px-4  text-lg font-light tracking-wide text-left">Nr</th>
                            <th className="px-4 text-lg font-light tracking-wide text-left">Debtor Name</th>
                            <th className="px-4 text-lg font-light tracking-wide text-left">Debtails</th>
                            <th className="px-4  text-lg font-light tracking-wide text-left">% Outstanding</th>
                            <th className="px-4  text-lg font-light tracking-wide text-left">Outstanding Balance</th>
                            <th className="px-4  text-lg font-light tracking-wide text-left"></th>
                            <th className="px-4  text-lg font-light tracking-wide text-left"></th>


                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {debtors && debtors.map((D, i) => (
                            <tr key={D.debtor_id} >
                         
                                <td className="p-3 text-md text-gray-700">
                                    <span>{i+1}</span>
                                </td>

                                <td className="p-3 text-md text-gray-700">
                                    <span>{D.name}</span>
                                </td>
                                
								<td className="p-3 text-md text-gray-700">
                                    <span>{D.details}</span>
                                </td>
								
								<td className="p-3 text-md text-gray-700">
                                    <span>{((D.ob / D.debit_amount) *100).toFixed(2)}%</span>
                                </td>

                                <td className="p-3 text-md text-gray-700">
                                    <div>
                                        <span className="text-gray-400 pr-1">(R)</span><span>{D.ob.toFixed(2)}</span>
                                    </div>
                                </td>

                                <td className="p-3 text-md text-gray-700">
                                    <Link href={`/pages/debtor/${D.debtor_id}`} className='view-txn-btn action-btn'>Transactions</Link>
                                </td>
                               
							    <td className="p-3 text-md text-gray-700">
                                    <button className='edit-debtor-btn action-btn'>Edit Debtor</button>
                                </td>
                               
                   

                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
		</main>
	)
}
