"use client"
import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useSession } from "next-auth/react";
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select' //? https://react-select.com/home#welcome



export default function AddDebtorModal({ isVisible, onClose }) {
    const { data: session } = useSession()

    const [categories, setCategories] = useState([])
    const [suppliers, setSuppliers] = useState([])

    //Y State Variables For Transaction
    const [name, setName] = useState()
    const [details, setDetails] = useState()

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
   

    //Y ----- Add Debtor  -----
    const AddDebtor = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_ENV_SERVER_BASE}/api/debtor`, {
                method: "POST",
                body: JSON.stringify({
                    accountID: session.diamond.accountID,
                    name: name,
                    details: details,
                }),
                headers: {
                    "content-Type": "application/json"
                }
            })

            if (response.ok) {
                notifySuccess("Successfully Added Debtor")
                const data = await response.json()

            } else {
                notifyError("Could not Add Debtor")
            }

        } catch (error) {
            notifyError("Could not Add Debtor", error)
        }
    }

    // Early return moved after hook calls
    if (!isVisible) return null

    if (!session) return ""

    return (
        <main>
            <div   className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center" id="wrapper" onClick={handleClose}>
                <div className="bg-white w-full max-w-[600px] rounded-lg flex flex-col p-6 mx-4 max-h-auto">
                    
                    {/* Modal Header */}
                    <div className="flex justify-center items-center mb-6">
                        <h1 className="text-3xl text-orange-500">Add Debtor</h1>
                    </div>


                    <div className='space-y-4'>
                        {/* Debtor Name */}
                        <div className="w-full flex flex-col">
                            <label htmlFor="debtor_details" className="text-xl">Debtor Name</label>
                            <input name="debtor_details"  className='pl-1 p-1 rounded border border-gray-400' onChange={(e) => setName(e.target.value)} />
                        </div>
                        
                        {/* Debtor Details */}
                        <div className="w-full flex flex-col">
                            <label htmlFor="debtor_details" className="text-xl">Debtor Details</label>
                            <input name="debtor_details"  className='pl-1 p-1 rounded border border-gray-400' onChange={(e) => setDetails(e.target.value)} />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between mt-6">
                        <button onClick={onClose} className="bg-red-600 hover:bg-red-700 text-white rounded text-lg px-6 py-2 w-48">Close</button>
                        <button onClick={AddDebtor} className="bg-orange-500 hover:bg-orange-600 text-white rounded text-lg px-6 py-2 w-48">Add Debtor</button>
                    </div>

                    {/* Toast Notification */}
                    <ToastContainer />
                </div>
            </div>
        </main>
    )
}