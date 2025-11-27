"use client"
import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useSession } from "next-auth/react";
import 'react-toastify/dist/ReactToastify.css';

import Select from 'react-select' //? https://react-select.com/home#welcome


export default function EditCategoryModal({ isVisible, onClose, accountIDParam, categoryIDParam, nameParam, detailsParam, categotyTypeParam }) {
    const { data: session } = useSession()
    console.log({detailsParam, nameParam, categoryIDParam, accountIDParam, categotyTypeParam})

    const [name, setName] = useState("")
    const [details, setDetails] = useState("")
    const [categoryType, setCategoryType] = useState("")

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
            const response = await fetch(`${process.env.NEXT_PUBLIC_ENV_SERVER_BASE}/api/category/`, {
                method: "PUT",
                body: JSON.stringify({
                    categoryID: categoryIDParam,
                    accountID: session.diamond.accountID, 
                    name: name,
                    details: details,
                    categoryType: categoryType
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
    }
    
    // ----- React Select -----
    const optionCategoryType = [
        { value: 'debit', label: 'debit' },
        { value: 'credit', label: 'credit' },
    ]

    useEffect(() => {
        if (!isVisible) return;

        setName(nameParam || "")
        setDetails(detailsParam || "")
        setCategoryType(categotyTypeParam || "")

    }, [isVisible , nameParam, detailsParam, categotyTypeParam])

    // Early return moved after hook calls
    if (!isVisible) return null

    if (!session) return

    return (
        <main>
            <div   className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-10" id="wrapper" onClick={handleClose}>
                <div className="bg-white w-full max-w-[600px] rounded-lg flex flex-col p-6 mx-4 max-h-auto">
                    {nameParam}
                    {detailsParam}
                    {categotyTypeParam}
                    
                    {/* Modal Header */}
                    <div className="flex justify-center items-center mb-6">
                        <h1 className="text-3xl text-green-600">Edit Category</h1>
                    </div>

                    <div className='space-y-4'>
                        {/* Name */}
                        <div className="w-full flex flex-col">
                            <label htmlFor="pilot" className="text-xl">Details</label>
                            <input name="colors"  className='pl-1 p-1 rounded border border-gray-400' value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                       
                        {/* Details */}
                        <div className="w-full flex flex-col">
                            <label htmlFor="pilot" className="text-xl">Details</label>
                            <input name="colors"  className='pl-1 p-1 rounded border border-gray-400' value={details} onChange={(e) => setDetails(e.target.value)} />
                        </div>

                         {/* Category Type */}
                        <div className="w-full">
                            <label htmlFor="category-type-select" className="text-xl">Category Type</label>
                            <Select name="category-type-select" options={optionCategoryType} value={optionCategoryType.find((option) => option.value === categoryType)} className="basic-multi-select" classNamePrefix="select" onChange={(selectedOption) => setCategoryType(selectedOption.value)} />
                        </div>
                                               
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between mt-6">
                        <button onClick={onClose} className="bg-red-600 hover:bg-red-700 text-white rounded text-lg px-6 py-2 w-48">Close</button>
                        <button onClick={updateCategory} className="bg-blue-600 hover:bg-blue-700 text-white rounded text-lg px-6 py-2 w-48">Edit Category</button>
                    </div>

                    {/* Toast Notification */}
                    <ToastContainer />
                </div>
            </div>
        </main>
    )
}