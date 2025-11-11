"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Select from 'react-select' //? https://react-select.com/home#welcome

import dynamic from "next/dynamic";

import "./transactionPage.scss"

// Dynamically import react-select to disable SSR
const Select = dynamic(() => import("react-select"), { ssr: false });


import TransactionModal from "./AddTransaction/AddTransactionModal";
// import EditModal from "./EditModal";
// import CategoryModal from "./CategoryModal";

export default function page() {
    const [transactions, setTransactions] = useState();

    //Y Modal
    const [isOpenTransactionModal, setIsOpenTransactionModal] = useState(false)
    const [isOpenEditModal, setIsOpenEditModal] = useState(false)
    const [isOpenCategoryModal, setIsOpenCategoryModal] = useState(false)
    const [objectState, setObjectState] = useState()

     // React Toast functions
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

    const showTransactionModal = (id) => {
        setObjectState(id); // Extract and set the admin's ID
        setIsOpenTransactionModal(true);
    };

    //X Shows The Category Modal
    const showCategoryModal = (id) => {
        setIsOpenCategoryModal(true)
    }
   
    const showEditModal = (id) => {
        setObjectState(id); // Extract and set the admin's ID
        setIsOpenEditModal(true);
    };

    //Y Filters State
    const date = new Date()
    const currentYearForFilter = date.getFullYear()
    const currentMonthForFilter = date.getMonth()
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "June",
        "Jul", "Aug", "Sept", "Oct", "Nov", "Dec",
    ];
    const [monthFilter, setMonthFilter] = useState(monthNames[currentMonthForFilter])
    const [yearFilter, setYearFilter] = useState(currentYearForFilter)
    const [transactionTypeFilter, setTransactionTypeFilter] = useState("all")

    console.log(yearFilter, monthFilter)
    

    const transactionTypeFilterOptions = [
        { value: 'all', label: 'All' },
        { value: 'debit', label: 'debit' },
        { value: 'credit', label: 'credit' },
    ]
    
    const YearFilterOptions = [
        { value: 2025, label: '2025' },
        { value: 2024, label: '2024' },
    ]
   
    const MonthFilterOptions = [
        { value: 'Jan', label: 'Jan' },
        { value: 'Feb', label: 'Feb' },
        { value: 'Mar', label: 'Mar' },
        { value: 'Apr', label: 'Apr' },
        { value: 'May', label: 'May' },
        { value: 'June', label: 'June' },
        { value: 'Jul', label: 'Jul' },
        { value: 'Aug', label: 'Aug' },
        { value: 'Sept', label: 'Sept' },
        { value: 'Oct', label: 'Oct' },
        { value: 'Nov', label: 'Nov' },
        { value: 'Dec', label: 'Dec' },
    ];

    function formatDate(timestamp) {
        const monthNames = [
            "Jan", "Feb", "Mar", "Apr", "May", "June",
            "Jul", "Aug", "Sept", "Oct", "Nov", "Dec",
        ];

        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = monthNames[date.getMonth()];
        const day = String(date.getDate()).padStart(2, "0");

        return `${day} ${month} ${year}`;
    }

    function postgresDate(date){
		if (!date) return ''; // Return an empty string if date is null or undefined
		const timestamp = date;
		return timestamp.split('T')[0];
	}

    



    //Y Converst date so that it can be used by the HTML Date Element
    function dateFormater(date){
        const isoDate = date;
        return isoDate.split("T")[0]; // Extracts '2025-03-14'
    }

    const [serverbase, setServerBase] = useState("")

    const fetchServerBase = async () => {
        const response = await fetch("/api/")
        const data = await response.json()
        console.log(data)
        setServerBase(data.server)
        
    }

        const fetchTransactions = async () => {
        try {

            if(localStorage.getItem("accountID")){
                notifySuccess("Got Account ID")
            } else {
                notifyError("Cannot Retrive Account ID")
                //X Make a function to fetch Account ID's
            }
            
            try {
                console.log("Server Base", serverbase)
                console.log(`${serverbase}transaction/get_transactions`)
                const accountID = 'ced66b1b-be88-4163-8ba1-77207ec20ca9'
                const response = await fetch(`${serverbase}transaction/get_transactions`, {
                    method: "POST",
                    body: JSON.stringify({
                        // accountID: localStorage.getItem("accountID")
                        accountID: accountID
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                // const response = await fetch(`/api/transaction?accountId=${accountID}`)
                
                if(response.ok){
                    const data = await response.json()
                    console.log(data.txn)
                    console.log(response.status)
                    setTransactions(data.txn)
                }
                
            } catch (error) {
                // notifyError("Could not fetch Records: " + error)
                console.log("Could not fetch Records: " + error)
                
            }
        } catch (error) {
            console.log("Could not fetch Records: " + error)
        }	
	}

    // Sets the User Account ID to Local Storage
	useEffect(() => {
        fetchServerBase()
		localStorage.setItem("accountID", '51d6f15b-8625-4d50-9b7c-8f10a1a7adf5');

	}, [])

	useEffect(() => {
		fetchTransactions()
	}, [serverbase])
	
    useEffect(() => {
		// fetchTransactions()
	}, [isOpenTransactionModal, isOpenEditModal])

    return (
        <main className="space-y-6 py-4 px-8">
            <section id="Title-Container" className="flex justify-center text-4xl">
                <h1>Transactions</h1>
            </section>

            {serverbase}
            <section id="Add-Transaction-Container" className="flex justify-end">
                <div className="flex space-x-4">
                    {/* <button onClick={showCategoryModal} className="flex justify-center w-44 text-purple-600 text-lg tracking-wide border border-purple-600 px-4 py-2 rounded hover:bg-purple-600 hover:text-white">
                        Add Category
                    </button> */}
                    <button onClick={showTransactionModal} className="add_transaction_button">
                        Add Transaction
                    </button>
                </div>
            </section>

            <section id="Add-Transaction-Container" className="flex justify-center">
                <div className="flex justify-around space-x-12">
                    <div className="flex justify-center flex-col">
                        {/* <label htmlFor="pilot" className="text-xl">Year</label> */}
                        <Select name="colors" options={YearFilterOptions} placeholder={ "Supplier"} className="basic-multi-select" classNamePrefix="select" onChange={(selectedOption) => setYearFilter(selectedOption.value)} />
                    </div>
                   
                    <div className="flex justify-center flex-col">
                        {/* <label htmlFor="pilot" className="text-xl">Year</label> */}
                        <Select name="colors" options={YearFilterOptions} placeholder={"Category"} className="basic-multi-select" classNamePrefix="select" onChange={(selectedOption) => setYearFilter(selectedOption.value)} />
                    </div>
                    
                    <div className="">
                        {/* <label htmlFor="pilot" className="text-xl">Month</label> */}
                        <Select name="colors" options={transactionTypeFilterOptions} placeholder={transactionTypeFilter ? transactionTypeFilter : "Type"} className="basic-multi-select" classNamePrefix="select" onChange={(selectedOption) => setTransactionTypeFilter(selectedOption.value)} />
                    </div>
                    
                    <div className="">
                        {/* <label htmlFor="pilot" className="text-xl">Month</label> */}
                        <Select name="colors" options={MonthFilterOptions} placeholder={monthFilter ? monthFilter : "Month"} className="basic-multi-select" classNamePrefix="select" onChange={(selectedOption) => setMonthFilter(selectedOption.value)} />
                    </div>

                    <div className="flex justify-center flex-col">
                        {/* <label htmlFor="pilot" className="text-xl">Year</label> */}
                        <Select name="colors" options={YearFilterOptions} placeholder={yearFilter ? yearFilter : "Year"} className="basic-multi-select" classNamePrefix="select" onChange={(selectedOption) => setYearFilter(selectedOption.value)} />
                    </div>
                    
                    
                </div>
            </section>

          

            <section id="Table-Container" className="mt-6">
                <table className="w-full border-collapse">
                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                        <tr>

                            <th className="px-4 w-44 text-lg font-light tracking-wide text-left">Date</th>
                            <th className="px-4 text-lg font-light tracking-wide text-left">Details</th>
                            <th className="px-4 w-40 text-lg font-light tracking-wide text-left">Amount (R)</th>
                            <th className="px-4 w-40 text-lg font-light tracking-wide text-left">Type</th>
                            <th className="px-4 w-48 text-lg font-light tracking-wide text-left">Category</th>
                            <th className="px-4 w-56 text-lg font-light tracking-wide text-left">Supplier</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {transactions && transactions.filter(
                           (TF) => TF.year === yearFilter && 
                           TF.month_name === monthFilter &&
                           (transactionTypeFilter === "all" || TF.type === transactionTypeFilter)
                        ).map((T) => (
                            <tr key={T.id} className={` hover:bg-gray-100`} onClick={() => showEditModal(
                                {
                                    id: T.transaction_id, 
                                    details: T.details,
                                    amount: T.amount,
                                    transactionType: T.transaction_type,
                                    date: dateFormater(T.date),
                                    category: T.category_name,
                                    categoryID: T.category_id,
                                    accountID: localStorage.getItem("accountID")
                                })
                            }>
                         

                                <td className="p-3 text-sm text-gray-700">
                                    <span>{formatDate(T.date)}</span>
                                </td>

                                <td className="p-3 text-sm text-gray-700">
                                    <span>{T.details}</span>
                                </td>

                                <td className="p-3 text-sm text-gray-700">
                                    <div>
                                        <span className="text-gray-400 pr-1">(R)</span><span>{T.amount}</span>
                                    </div>
                                </td>

                                <td className="p-3 text-sm text-gray-700">
                                    <span className={`px-2 py-1 text-xs font-medium tracking-wider uppercase rounded bg-opacity-70 ${T.type == "debit" ? "text-red-800 bg-red-200" : "text-green-800 bg-green-200"}`}>
                                        {T.type}
                                    </span>
                                </td>

                                <td className="p-3 text-sm text-gray-700">
                                    <span className="px-2 py-1 text-xs font-medium tracking-wider uppercase text-yellow-800 bg-yellow-200 rounded bg-opacity-70">
                                        {T.category_name}
                                    </span>
                                </td>
                               
                                <td className="p-3 text-sm text-gray-700">
                                    <span className="px-2 py-1 text-xs font-medium tracking-wider uppercase text-orange-800 bg-orange-200 rounded bg-opacity-70">
                                        {T.supplier_name}
                                    </span>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            <section>
                <TransactionModal isVisible={isOpenTransactionModal} onClose={() => setIsOpenTransactionModal(false)}/>
                {/* <EditModal isVisible={isOpenEditModal} editObject={objectState} onClose={() => setIsOpenEditModal(false)}/> */}
                {/* <CategoryModal isVisible={isOpenCategoryModal} onClose={() => setIsOpenCategoryModal(false)}/> */}
            </section>
        </main>
    );
}