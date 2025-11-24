"use client"
import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useSession } from "next-auth/react";
import 'react-toastify/dist/ReactToastify.css';


import Select from 'react-select' //? https://react-select.com/home#welcome

export default function TransactionModal({ isVisible, onClose }) {
    const { data: session } = useSession()

    const [categories, setCategories] = useState([])
    const [suppliers, setSuppliers] = useState([])

    //Y State Variables For Transaction
    const [details, setDetails] = useState()
    const [amount, setAmount] = useState()
    const [transactionType, setTransactionType] = useState()
    const [categoryID, setCategoryID] = useState()
    const [supplierID, setSupplierID] = useState()
    const [date, setDate] = useState(new Date())
    const [time, setTime] = useState()

    function postgresDate(date){
		if (!date) return ''; // Return an empty string if date is null or undefined
		const timestamp = date;
		return timestamp.split('T')[0];
	}

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

    //Y Prevents user from closing the modal when they click on the modal body
    const handleClose = (e) => {
        if (e.target.id === "wrapper") onClose()
    }

    //X Fetch the Categories

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_ENV_SERVER_BASE}/api/category/get_user_categories`, {
                method: "POST",
                body: JSON.stringify({
                    accountID: session.diamond.accountID
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            
            if(response.ok){
                const data = await response.json()
                setCategories(data.categories)
                console.log(data.categories)

            } else {
                notifyError("Could not Fetch Categories")
            }

        } catch (error) {
            notifyError("Could not Fetch Categories", error)
        }
    }
   
    //X Fetch Suppliers
    const fetchSuppliers = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_ENV_SERVER_BASE}/api/supplier/get_user_suppliers`, {
                method: "POST",
                body: JSON.stringify({
                    accountID: session.diamond.accountID
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            
            if(response.ok){
                const data = await response.json()
                setSuppliers(data.suppliers)
                console.log(data.suppliers)

            } else {
                notifyError("Could not Fetch Suppliers")
            }

        } catch (error) {
            notifyError("Could not Fetch Suppliers", error)
        }
    }



    //Y ----- Add Transaction  -----
    const postTransaction = async () => {
        console.log(time)

        if(!date) return notifyError("Missing Date")
        else if(!transactionType) return notifyError("Missing Type")
        else if(!amount) return notifyError("Missing Amount")
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_ENV_SERVER_BASE}/api/transaction`, {
                method: "POST",
                body: JSON.stringify({
                    accountID: session.diamond.accountID,
                    amount: amount,
                    details: details,
                    date: postgresDate(date),
                    time: time,
                    type: transactionType,
                    categoryID: categoryID,
                    supplierID: supplierID
                }),
                headers: {
                    "content-Type": "application/json"
                }
            })

            if (response.ok) {
                notifySuccess("Successfully Added Transaction")
                const data = await response.json()

            } else {
                notifyError("Could not Add Transaction")
            }

        } catch (error) {
            notifyError("Could not Add Transaction", error)
        }
    }

    // ----- React Select -----
    const optionTransactionType = [
        { value: 'debit', label: 'debit' },
        { value: 'credit', label: 'credit' },
    ]

    const optionCategories = (categories || []).map((C) => ({
        value: C.id,
        label: C.name,
    }));
    
    const optionSuppliers = (suppliers || []).map((S) => ({
        value: S.id,
        label: S.name,
    }));
    
    // Ensure "None" is at the end
    const noneOption = { value: "", label: "None" }; // Use an empty string for compatibility
    const sundryOption = { value: "sundry", label: "Sundry" }; // TODO Get the user's sundry ID & Maybe Sundry can just be text
    optionCategories.push(noneOption );
    optionSuppliers.push(noneOption)

    useEffect(() => {
        fetchCategories()
        fetchSuppliers()

    }, [session])

    // Early return moved after hook calls
    if (!isVisible) return null

    if (!session) return ""

    return (
        <main>
            {session.diamond.accountID}
            <div   className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-10" id="wrapper" onClick={handleClose}>
                <div className="bg-white w-full max-w-[600px] rounded-lg flex flex-col p-6 mx-4 max-h-auto">
                    
                    {/* Modal Header */}
                    <div className="flex justify-center items-center mb-6">
                        <h1 className="text-3xl text-green-600">Add Transaction</h1>
                    </div>


                    <div className='space-y-4'>
                        {/* Details */}
                        <div className="w-full flex flex-col">
                            <label htmlFor="pilot" className="text-xl">Details</label>
                            <input name="colors"  className='pl-1 p-1 rounded border border-gray-400' onChange={(e) => setDetails(e.target.value)} />
                        </div>
                        
                        {/* Amount */}
                        <div className="w-full flex flex-col">
                            <label htmlFor="pilot" className="text-xl">Amount</label>
                            <input name="colors" type="number" className={`pl-1 p-1 rounded border border-gray-400 `} onChange={(e) => setAmount(e.target.value)} />
                        </div>
                        
                         {/* Category */}
                         <div className="w-full">
                            <label htmlFor="pilot" className="text-xl">Category</label>
                            <Select name="colors" options={optionCategories} className="basic-multi-select" classNamePrefix="select" onChange={(selectedOption) => setCategoryID(selectedOption.value)} />
                        </div>
                        
                         {/* Supplier */}
                         <div className="w-full">
                            <label htmlFor="pilot" className="text-xl">Supplier</label>
                            <Select name="colors" options={optionSuppliers} className="basic-multi-select" classNamePrefix="select" onChange={(selectedOption) => setSupplierID(selectedOption.value)} />
                        </div>

                        {/* Transaction Type */}
                        <div className="w-full">
                            <label htmlFor="pilot" className="text-xl">Transaction Type</label>
                            <Select name="colors" options={optionTransactionType} className="basic-multi-select" classNamePrefix="select" onChange={(selectedOption) => setTransactionType(selectedOption.value)} />
                        </div>

                         {/* Date */}
                         <div className="w-full flex flex-col">
                            <label htmlFor="pilot" className="text-xl">Date</label>
                            <input name="colors" type="date" className='pl-1 p-1 rounded border border-gray-400' onChange={(e) => setDate(e.target.value)} />
                        </div>
                         
                         {/* Time */}
                         <div className="w-full flex flex-col">
                            <label htmlFor="pilot" className="text-xl">Time</label>
                            <input name="colors" type="time" className='pl-1 p-1 rounded border border-gray-400' onChange={(e) => setTime(e.target.value)} />
                        </div>

                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between mt-6">
                        <button onClick={onClose} className="bg-red-600 hover:bg-red-700 text-white rounded text-lg px-6 py-2 w-48">Close</button>
                        <button onClick={postTransaction} className="bg-green-600 hover:bg-green-700 text-white rounded text-lg px-6 py-2 w-48">Add Transaction</button>
                    </div>

                    {/* Toast Notification */}
                    <ToastContainer />
                </div>
            </div>
        </main>
    )
}