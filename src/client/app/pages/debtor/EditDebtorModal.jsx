"use client"
import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useSession } from "next-auth/react";
import 'react-toastify/dist/ReactToastify.css';

export default function EditDebtorModal({ isVisible, onClose, editObject }) {
    const { data: session } = useSession()


    //Y State Variables For Debtor
    const [name, setName] = useState()
    const [details, setDetails] = useState()

    useEffect(() => {
        if(!editObject) return

        setName(editObject.debtorName)
        setDetails(editObject.debtorDetails || "");

    }, [editObject]);

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


    //Y --------------------- Update Transaction ---------------------
    const updateDebtor = async () => {

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_ENV_SERVER_BASE}/api/debtor/`, {
                method: "PUT",
                body: JSON.stringify({
                    debtorID: editObject.debtorID,
                    accountID: session.diamond.accountID,
                    name: name,
                    details: details
                }),
                headers: {
                    "content-Type": "application/json"
                }
            })

            if (response.ok) {
                notifySuccess("Successfully Update Debtor")
                const data = await response.json()

            } else {
                notifyError("Could not Update Debtor")
                throw new Error("Could not Update Debtor")
            }

        } catch (error) {
            notifyError("Could not Update Debtor", error)
            console.error(error)
        }   
    }

    //Y --------------------- Delete Transaction ---------------------
    const deleteDebtor = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_ENV_SERVER_BASE}/api/debtor/`, {
                method: "DELETE",
                body: JSON.stringify({
                    debtorID: editObject.debtorID,
                    accountID: session.diamond.accountID
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json()
            if (response.ok){
                notifySuccess("Successfully Deleted Debtor")
                
            } else {
                notifyError("Could not Delete Debtor")
                console.error(data.error)
            }
        } catch (error) {
            notifyError("Could not Delete Debtor: " + error)
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
                        <h1 className="text-3xl text-blue-600">Edit Debtor</h1>
                    </div>


                    <div className='space-y-4'>
                        {/* Debtor Name */}
                        <div className="w-full flex flex-col">
                            <label htmlFor="pilot" className="text-xl">Debtor Name</label>
                            <input name="colors"  className='pl-1 p-1 rounded border border-gray-400' value={name ? name: ""} onChange={(e) => setName(e.target.value)} />
                        </div>
                        
                        {/* Debtor Details */}
                        <div className="w-full flex flex-col">
                            <label htmlFor="pilot" className="text-xl">Debtor Details</label>
                            <input name="colors"  className='pl-1 p-1 rounded border border-gray-400' value={details ? details: ""} onChange={(e) => setDetails(e.target.value)} />
                        </div>
                    </div>

                     {/* Action Buttons */}
                    <div className='flex flex-col space-y-8'>

                        <div className="flex justify-between mt-6">
                            <button onClick={onClose} className=" bg-orange-600 hover:bg-orange-700 text-white rounded text-lg px-6 w-44 py-2">Close</button>
                            <button onClick={updateDebtor} className="bg-blue-600 hover:bg-blue-700 text-white rounded text-lg px-6  w-44 py-2">Update</button>
                        </div>

                        <div className='flex justify-center'>
                            <button onClick={deleteDebtor} className="w-full bg-red-600 hover:bg-red-700 text-white rounded text-lg px-6 py-2">Delete</button>
                        </div>
                    </div>

                    {/* Toast Notification */}
                    <ToastContainer />
                </div>
            </div>
        </main>
    )
}