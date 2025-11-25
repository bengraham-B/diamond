"use client"
import React, {useState, useEffect} from 'react'
import { useSession } from 'next-auth/react'


import "./Table.scss"

import EditcategoryModal from './EditCategory/EditCategoryModal'
import { ToastContainer, toast } from 'react-toastify'

export default function Table() {
    const { data: session } = useSession()

    const [isOpenEditCategoryModal, setIsOpenEditCategoryModal] = useState(false)
    const [objectState, setObjectState] = useState()
    
    const [categories, setCategories] = useState();

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
    const fetchCategories = async() => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_ENV_SERVER_BASE}/api/category/balance_per_debtor_&_txn`, {
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
                setCategories(data.balances)
                console.log(data.categories)

            } else {
                notifyError("Could not Fetch Categories")
            }

        } catch (error) {
            notifyError("Could not Fetch Categories", error)
        }
    }

    const showEditModal = ({name, details, categoryID, accountID}) => {
        setObjectState({categoryID, name, details, categoryID, accountID}); // Extract and set the admin's ID
        setIsOpenEditCategoryModal(true);
    };

    useEffect(() => {
        if(!session) return
        fetchCategories()
    },[session, isOpenEditCategoryModal])

    if (!session) return

    return (
        <main className='category-table-main'>

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
                    {categories && categories.map((C, i) => (
                        <tr key={C.id}>
                            <td>{i+1}</td>
                            <td>{C.name}</td>
                            <td>{C.details}</td>
                            <td>
                                <p className={`pill ${C.type === 'debit' ? 'debit-pill' : 'credit-pill'}`}>R{ ((C.txn || 0) < 0 ? ((C.txn || 0).toFixed(2)) * -1 : (C.txn || 0).toFixed(2))  }</p> 
                            </td>
                            <td>
                                {/* <p className='pill'>R{ ( (C.debtor || 0) < 0 ? ((C.debtor || 0).toFixed(2)) * -1 : (C.debtor || 0).toFixed(2) ) }</p>  */}
                                <p className='pill'>R{ (C.debtor || 0).toFixed(2)  }</p> 
                            </td>
                            <td>Status</td>
                            <td><button onClick={() => showEditModal({name: C.name, details: C.details, categoryID: C.id, accountID: C.account_id}) } className='bg-blue-600 rounded px-4 py-1 hover:bg-blue-700 text-center text-white'>Edit</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <section>
                <EditcategoryModal isVisible={isOpenEditCategoryModal} onClose={() => setIsOpenEditCategoryModal(false)} editObject={objectState}/>
                <ToastContainer />
            </section>
        </main>
    )
}
