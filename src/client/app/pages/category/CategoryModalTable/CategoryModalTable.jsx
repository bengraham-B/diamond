"use client"
import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useSession } from "next-auth/react";
import 'react-toastify/dist/ReactToastify.css';
import "./CategoryModalTable.scss"

import EditCategoryModal from './EditCategory/EditCategoryModal';
import AddCategoryModal from '../AddCategory/AddCategoryModal';

// =======================================================================================================
//  										Edit Category Modal
// =======================================================================================================


export default function CategoryModalTable({ isVisible, onClose }) {
    const { data: session } = useSession()

    const [isOpenEditCategoryModal, setIsOpenEditCategoryModal] = useState(false)
    const [isOpenAddCategoryModal, setIsOpenAddCategoryModal] = useState(false)
    
    const [categoryID, setCategoryID] = useState()
    const [categoryName, setCategoryName] = useState()
    const [categoryDetails, setCategoryDetails] = useState()
    const [categoryType, setCategoryType] = useState()
    
    const showEditCategoryModal = ({name, details, id, type}) => {
		setIsOpenEditCategoryModal(true)
        setCategoryID(id)
        setCategoryName(name)
        setCategoryDetails(details)
        setCategoryType(type)
	}

    const showAddCategoryModal = () => {
		setIsOpenAddCategoryModal(true);
	};
    

    //Y State Variables For Transaction
    const [details, setDetails] = useState("")
    const [name, setName] = useState("")
    const [categories, setCategories] = useState([])


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

    //Y --------------------- Get Category ---------------------
    const getUserCategories = async () => {
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_ENV_SERVER_BASE}/api/category/get_user_categories`, {
                method: "POST",
                body: JSON.stringify({
                    accountID: session.diamond.accountID 
                }),
                headers: {
                    "content-Type": "application/json"
                }
            })

            if(!response) throw new Error(`Could not fetch Categories`)
            const data = await response.json()
            setCategories(data.categories)

        } catch(error){
            notifyError(`Could not Fetch Categories: ${error}`)
        }
    }



    //Y --------------------- Delete Category ---------------------
    const deleteCategory = async (accountID, categoryID) => {
        console.log(`DELETE: ${accountID,categoryID}`)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_ENV_SERVER_BASE}/api/category/`, {
                method: "DELETE",
                body: JSON.stringify({
                    accountID: accountID,
                    categoryID: categoryID
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
        getUserCategories()
    }, [session, showAddCategoryModal])

    // Early return moved after hook calls
    if (!isVisible) return null

    if (!session) return

    return (
        <main>
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-20 " id="wrapper" onClick={handleClose}>
                <div className="bg-white w-full max-w-[950px] h-[75vh] rounded-lg flex flex-col p-6 mx-4 max-h-auto">
                    
                    {/* Modal Header */}
                    <div className="flex justify-center items-center mb-6">
                        <h1 className="text-3xl text-blue-600">Edit Categories</h1>
                    </div>

                    <section id='Category-Table' className='scrollable-table overflow-auto w-full h-full'>

                        <table className='edit-content-table'>
                            <thead>
                                <tr>
                                    <th>Nr</th>
                                    <th>Name</th>
                                    <th>Details</th>
                                    <th>Type</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories && categories.map((C, i) => (
                                    <tr key={C.id}>
                                        <td>{i + 1}</td>
                                        <td>{C.name}</td>
                                        <td>{C.details}</td>
                                        <td>
                                            <span className={`${C.type === 'credit' ? 'bg-green-300 text-green-600' : 'bg-red-300 text-red-600'}  rounded px-4 py-1 text-center`}>
                                                {C.type}
                                            </span>
                                        </td>
                                        <td>
                                            <button className='bg-blue-600 rounded px-4 py-1 text-center  text-white hover:bg-blue-700' onClick={() => showEditCategoryModal({name: C.name, details: C.details, id: C.id, type: C.type})}>
                                                Edit
                                            </button>
                                        </td>
                                        <td>
                                            <button className='bg-red-600 rounded px-4 py-1 text-center  text-white hover:bg-red-700' onClick={() => deleteCategory(session.diamond.accountID, C.id)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </section>



                     {/* Action Buttons */}
                    <div className='flex flex-col space-y-8'>

                        <div className="flex justify-between mt-6">
                            <button onClick={onClose} className=" bg-orange-600 hover:bg-orange-700 text-white rounded text-lg px-6 w-44 py-2">Close</button>
                            <button onClick={showAddCategoryModal} className="bg-blue-600 hover:bg-blue-700 text-white rounded text-lg px-6  w-44 py-2">Add Category</button>
                        </div>

                        {/* <div className='flex justify-center'>
                            <button onClick={deleteCategory} className="w-full bg-red-600 hover:bg-red-700 text-white rounded text-lg px-6 py-2">Delete</button>
                        </div> */}
                    </div>

                    <EditCategoryModal isVisible={isOpenEditCategoryModal} onClose={() => setIsOpenEditCategoryModal(false)} accountIDParam={session.diamond.accountID} nameParam={categoryName} detailsParam={categoryDetails} categoryIDParam={categoryID} categotyTypeParam={categoryType}/>
                    <AddCategoryModal isVisible={isOpenAddCategoryModal} onClose={() => setIsOpenAddCategoryModal(false)} accountIDParam={session.diamond.accountID}/>
                    <ToastContainer />
                </div>
            </div>
        </main>
    )
}