"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Select from 'react-select' //? https://react-select.com/home#welcome
import { useSession } from "next-auth/react";
const Select = dynamic(() => import("react-select"), { ssr: false });

import dynamic from "next/dynamic";

import "./transactionPage.scss"

import TransactionModal from "./AddTransaction/AddTransactionModal";
import EditTransactionModal from "./EditTransaction/EditTransactionModal";

export default function page() {
    const { data: session } = useSession()

    const [transactions, setTransactions] = useState([]);
    
    //Y Modal
    const [isOpenTransactionModal, setIsOpenTransactionModal] = useState(false)
    const [isOpenEditModal, setIsOpenEditModal] = useState(false)
    const [isOpenCategoryModal, setIsOpenCategoryModal] = useState(false)
    const [objectState, setObjectState] = useState()

    //Y Filters State
    const date = new Date()
    const currentYearForFilter = date.getFullYear()
    const currentMonthForFilter = date.getMonth()
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "June",
        "Jul", "Aug", "Sept", "Oct", "Nov", "Dec",
    ];
    const [monthFilter, setMonthFilter] = useState('Nov')
    // const [monthFilter, setMonthFilter] = useState(monthNames[currentMonthForFilter])
    const [yearFilter, setYearFilter] = useState(currentYearForFilter)
    const [transactionTypeFilter, setTransactionTypeFilter] = useState("all")

    //Y ---------- Filter Select ----------
    const [supplierSelect, setSupplierSelect] = useState([])
    const [categorySelect, setCategorySelect] = useState([])

    
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
        { value: 'June', label: 'Jun'},
        { value: 'Jul', label: 'Jul' },
        { value: 'Aug', label: 'Aug' },
        { value: 'Sept', label: 'Sept'},
        { value: 'Oct', label: 'Oct' },
        { value: 'Nov', label: 'Nov' },
        { value: 'Dec', label: 'Dec' },
    ];

    //Y ----------- Filter Options From API -----------
    const [categoryFilterOptions, setCategoryFilterOptions] = useState([])
    const [SupplierFilterOptions, setSupplierFilterOptions] = useState([])

    //? React Toast functions
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

    //? Modals
    const showTransactionModal = (id) => {
        setObjectState(id); // Extract and set the admin's ID
        setIsOpenTransactionModal(true);
    };
   
    const showEditModal = (id) => {
        setObjectState(id); // Extract and set the admin's ID
        setIsOpenEditModal(true);
    };

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
        console.log(date)
        const isoDate = date;
        return isoDate.split("T")[0]; // Extracts '2025-03-14'
    }

    const fetchTransactions = async () => {
        try {

            const response = await fetch(`${process.env.NEXT_PUBLIC_ENV_SERVER_BASE}/api/transaction/get_transactions`, {
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
                setTransactions(data.txn)
            }

            else {
                throw new Error("Could not connect to Server")
            }
            
        } catch (error) {
            console.error("Could not fetch Records: " + error)
        }	
	}
	
    const fetchCategories = async () => {
        try {
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
                    let cat_TEMP = []
                    data.categories.map((C) => (
                        cat_TEMP.push({value: C.name, label: C.name})
                    ))
                    setCategoryFilterOptions(cat_TEMP)
                }

                else {
                    throw new Error("Could not connect to Server")
                }
                
            } catch (error) {
                console.error("Could not fetch Records: " + error)
                
            }
        } catch (error) {
            console.error("Could not fetch Records: " + error)
        }	
	}
   
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
                let tempSuppliers = []
                data.suppliers.map((S) => (
                    tempSuppliers.push({value: S.name, label: S.name})
                ))

                setSupplierFilterOptions(tempSuppliers)
            }

            else {
                throw new Error("Could not connect to server")
            }
        
        } catch (error) {
            console.error("Could not fetch Records: " + error)
        }	
	}
	
    useEffect(() => {
        if (!session) return 
		fetchTransactions()
        fetchCategories()
        fetchSuppliers()
	}, [isOpenTransactionModal, isOpenEditModal, session])

    if (!session) return 

    return (
        <main className="" id="TXN-PAGE" >

            <section id="header-section">
                <h1>Transaction</h1>
            </section>

            <section id="filter-add-txn-section">

                <div className="select-wrapper">
                    <Select name="colors" options={SupplierFilterOptions} placeholder={ "Supplier"} className="supplier basic-multi-select" classNamePrefix="select" onChange={(selectedOption) => setSupplierSelect(selectedOption.value)} />
                    <Select name="colors" options={categoryFilterOptions} placeholder={"Category"} className="category basic-multi-select" classNamePrefix="select" onChange={(selectedOption) => setCategorySelect(selectedOption.value)} />
                    <Select name="colors" options={transactionTypeFilterOptions} placeholder={"Type"} className="basic-multi-select" classNamePrefix="select" onChange={(selectedOption) => setTransactionTypeFilter(selectedOption.value)} />
                    <Select name="colors" options={MonthFilterOptions} placeholder={monthFilter ? monthFilter : "Month"} className="basic-multi-select" classNamePrefix="select" onChange={(selectedOption) => setMonthFilter(selectedOption.value)} />
                    <Select name="colors" options={YearFilterOptions} placeholder={yearFilter ? yearFilter : "Year"} className="basic-multi-select" classNamePrefix="select" onChange={(selectedOption) => setYearFilter(selectedOption.value)} />
                </div>

                <div className="button-wrapper">
                    <button>Add Transaction</button>
                </div>

            </section>

            <section id="table-container">

                <table id="txn-table">
                    <thead>
                        <tr>
                            <th className="day">Day</th>
                            <th className="time">Time</th>
                            <th className="details">Details</th>
                            <th className="amount">Amount (R)</th>
                            <th className="type">Type</th>
                            <th className="category">Category</th>
                            <th className="supplier">Supplier</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions && transactions.filter((TF) =>
                            TF.year === yearFilter &&
                            TF.month_name === monthFilter &&
                            (transactionTypeFilter === "all" || TF.type === transactionTypeFilter)
                            // && (!categorySelect || TF.category_name === categorySelect.value)
                        ).map((T) => (
                                <tr key={T.id}>
                                    <td>{T.day}</td>
                                    <td>{T.time}</td>
                                    <td>{T.details}</td>
                                    <td>R{(T.amount || 0.00).toFixed(2)}</td>
                                    <td className={T.type === "debit" ? 'pill debit-pill' : 'pill credit-pill'}><p>{T.type}</p></td>
                                    <td>{T.category_name}</td>
                                    <td>{T.supplier_name}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>



            </section>

        </main>
    );
}