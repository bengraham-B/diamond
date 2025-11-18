"use client"
import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useSession } from "next-auth/react";
import 'react-toastify/dist/ReactToastify.css';

export default function AddCategoryModal({ isVisible, onClose, accountIDParam }) {
    const { data: session } = useSession()

    const [name, setName] = useState("")
    const [details, setDetails] = useState("")

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

    //Y ----- Add Category  -----
    const postCategory = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_ENV_SERVER_BASE}/api/category/`, {
                method: "POST",
                body: JSON.stringify({
                    accountID: accountIDParam,
                    name: name,
                    details: details,
                }),
                headers: {
                    "content-Type": "application/json"
                }
            })

            if (response.ok) {
                notifySuccess("Successfully Added Category")
                const data = await response.json()

            } else {
                notifyError("Could not Add Category")
            }

        } catch (error) {
            notifyError("Could not Add Transaction", error)
        }
    }

    useEffect(() => {
        if(!session) return

    }, [session])

    // Early return moved after hook calls
    if (!isVisible) return null

    if (!session) return

    return (
        <main>
            <div   className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-10" id="wrapper" onClick={handleClose}>
                <div className="bg-white w-full max-w-[600px] rounded-lg flex flex-col p-6 mx-4 max-h-auto">
                    
            {accountIDParam}
                    {/* Modal Header */}
                    <div className="flex justify-center items-center mb-6">
                        <h1 className="text-3xl text-green-600">Add Category</h1>
                    </div>


                    <div className='space-y-4'>
                        {/* Name */}
                        <div className="w-full flex flex-col">
                            <label htmlFor="pilot" className="text-xl">Details</label>
                            <input name="colors"  className='pl-1 p-1 rounded border border-gray-400' onChange={(e) => setName(e.target.value)} />
                        </div>
                       
                        {/* Details */}
                        <div className="w-full flex flex-col">
                            <label htmlFor="pilot" className="text-xl">Details</label>
                            <input name="colors"  className='pl-1 p-1 rounded border border-gray-400' onChange={(e) => setDetails(e.target.value)} />
                        </div>
                                               
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between mt-6">
                        <button onClick={onClose} className="bg-red-600 hover:bg-red-700 text-white rounded text-lg px-6 py-2 w-48">Close</button>
                        <button onClick={postCategory} className="bg-green-600 hover:bg-green-700 text-white rounded text-lg px-6 py-2 w-48">Add Category</button>
                    </div>

                    {/* Toast Notification */}
                    <ToastContainer />
                </div>
            </div>
        </main>
    )
}