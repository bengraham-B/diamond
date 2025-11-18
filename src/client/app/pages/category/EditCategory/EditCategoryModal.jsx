"use client"
import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useSession } from "next-auth/react";
import 'react-toastify/dist/ReactToastify.css';

export default function EditcategoryModal({ isVisible, onClose, editObject }) {
    const { data: session } = useSession()

    //Y State Variables For Transaction
    const [details, setDetails] = useState()
    const [name, setName] = useState()

    useEffect(() => {
        if (editObject) {
            setName(editObject.name || "");
            setDetails(editObject.details || "");
        }
    }, [editObject]);

    console.log({editObject})

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

   
    //Y --------------------- Update Category ---------------------
    const updateCategory = async () => {
        try {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_ENV_SERVER_BASE}/api/category/`, {
                    method: "PUT",
                    body: JSON.stringify({
                        categoryID: editObject.categoryID,
                        accountID: session.diamond.accountID, 
                        name: name,
                        details: details
                    }),
                    headers: {
                        "content-Type": "application/json"
                    }
                })
    
                if (response.ok) {
                    notifySuccess("Successfully Update Transaction")
                    const data = await response.json()
                    console.log(data.flight)
    
                } else {
                    notifyError("Could not Update Transaction")
                }
    
            } catch (error) {
                notifyError("Could not Update Transaction", error)
                console.log(error)
            }
        } catch (error) {
            notifyError("Could Get Account ID ", error)
        }
       
    }

    //Y --------------------- Delete Transaction ---------------------
    const deleteCategory = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_ENV_SERVER_BASE}/api/category/`, {
                method: "DELETE",
                body: JSON.stringify({
                    categoryID: editObject.categoryID,
                    accountID: editObject.accountID
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json()
            if (response.ok){
                notifySuccess("Successfully Deleted Transaction")
                
            } else {
                notifyError("Could not Delete Transaction")
                console.log(data.error)
            }
        } catch (error) {
            notifyError("Could not Delete Transaction: " + error)
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
            <div   className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-10 " id="wrapper" onClick={handleClose}>
                <div className="bg-white w-full max-w-[600px] rounded-lg flex flex-col p-6 mx-4 max-h-auto">
                    
                    {/* Modal Header */}
                    <div className="flex justify-center items-center mb-6">
                        <h1 className="text-3xl text-blue-600">Edit Transaction</h1>
                    </div>


                    <div className='space-y-4'>
                        {/* Name */}
                        <div className="w-full flex flex-col">
                            <label htmlFor="pilot" className="text-xl">Details</label>
                            <input name="colors"  className='pl-1 p-1 rounded border border-gray-400' value={name ? name: ""} onChange={(e) => setName(e.target.value)} />
                        </div>
                        
                        {/* Details */}
                        <div className="w-full flex flex-col">
                            <label htmlFor="pilot" className="text-xl">Details</label>
                            <input name="colors"  className='pl-1 p-1 rounded border border-gray-400' value={details ? details: ""} onChange={(e) => setDetails(e.target.value)} />
                        </div>
                       
                    </div>

                     {/* Action Buttons */}
                    <div className='flex flex-col space-y-8'>

                        <div className="flex justify-between mt-6">
                            <button onClick={onClose} className=" bg-orange-600 hover:bg-orange-700 text-white rounded text-lg px-6 w-44 py-2">Close</button>
                            <button onClick={updateCategory} className="bg-blue-600 hover:bg-blue-700 text-white rounded text-lg px-6  w-44 py-2">Update</button>
                        </div>

                        <div className='flex justify-center'>
                            <button onClick={deleteCategory} className="w-full bg-red-600 hover:bg-red-700 text-white rounded text-lg px-6 py-2">Delete</button>
                        </div>
                    </div>

                    {/* Toast Notification */}
                    <ToastContainer />
                </div>
            </div>
        </main>
    )
}