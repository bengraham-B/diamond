"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Select from 'react-select' //? https://react-select.com/home#welcome

import dynamic from "next/dynamic";

import './DebtorTransactions.scss'

// Dynamically import react-select to disable SSR
const Select = dynamic(() => import("react-select"), { ssr: false });


import TransactionModal from "./AddDebtorTransaction/AddDebtorTransactionModal";
import EditTransactionModal from "./EditDebtorTransaction/EditDebtorTransactionModal";
import AddDebtorTransactionModal from "./AddDebtorTransaction/AddDebtorTransactionModal";
import EditDebtorTransactionModal from "./EditDebtorTransaction/EditDebtorTransactionModal";

export default function page({params}) {
	
	 const { id } = React.use(params) // ✅ unwrap the async params
	console.log(id)
	const debtorIDParam = id

		const fetchDebtorDetails = async () => {
			try {
				const response = await fetch(`${process.env.NEXT_PUBLIC_ENV_SERVER_BASE}/api/debtor/get_debtor_details`)
				
			} catch (error) {
				console.log(error)
			}
		}


		useEffect(() => {
			fetchDebtorDetails()
		}, [])


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

	const [debtorTransactions, setDebtorTransactions] = useState();
	
	const fetchDebtorTransactionsByMonth = async () => {
		try {

			if(localStorage.getItem("accountID")){

			} else {
				notifyError("Cannot Retrive Account ID")
				//X Make a function to fetch Account ID's
			}
			
			try {

				const response = await fetch(`${process.env.NEXT_PUBLIC_ENV_SERVER_BASE}/api/debtorTransaction/getDebtorTransactions`, {
					method: "POST",
					body: JSON.stringify({
						accountID: accountID,
    					debtorID: debtorIDParam
					}),
					headers: {
						"Content-Type": "application/json"
					}
				})
				// const response = await fetch(`/api/transaction?accountId=${accountID}`)
				
				if(response.ok){
					const data = await response.json()
					console.log("Debtor Transactions", data.debtorTransactions)
					console.log(response.status)
					setDebtorTransactions(data.debtorTransactions)
				}
				
			} catch (error) {
				notifyError("Could not fetch Records: " + error)
				console.log("Could not fetch Records: " + error)
				
			}
		} catch (error) {
			console.log("Could not fetch Records: " + error)
		}	
	}

	useEffect(() => {
		fetchDebtorTransactionsByMonth()
	}, [])
	
	useEffect(() => {
		fetchDebtorTransactionsByMonth()
	}, [isOpenTransactionModal, isOpenEditModal])

	return (
		<main className="space-y-6 py-4 px-8">
			<section id="Title-Container" className="flex justify-center text-4xl">
				<h1>Debtor Transactions</h1>
			</section>

			<section id="Add-Transaction-Container" className="flex justify-end">
				<div className="flex space-x-4">
					<button onClick={showTransactionModal} className="add_transaction_button">
						Add Transaction
					</button>
				</div>
			</section>

			<section id="Add-Transaction-Container" className="flex justify-center">
				<div className="flex justify-around space-x-12">
					<div className="flex justify-center flex-col">
						<Select name="colors" options={YearFilterOptions} placeholder={ "Supplier"} className="basic-multi-select" classNamePrefix="select" onChange={(selectedOption) => setYearFilter(selectedOption.value)} />
					</div>
				   
					<div className="flex justify-center flex-col">
						<Select name="colors" options={YearFilterOptions} placeholder={"Category"} className="basic-multi-select" classNamePrefix="select" onChange={(selectedOption) => setYearFilter(selectedOption.value)} />
					</div>
					
					<div className="">
						<Select name="colors" options={transactionTypeFilterOptions} placeholder={transactionTypeFilter ? transactionTypeFilter : "Type"} className="basic-multi-select" classNamePrefix="select" onChange={(selectedOption) => setTransactionTypeFilter(selectedOption.value)} />
					</div>
					
					<div className="">
						<Select name="colors" options={MonthFilterOptions} placeholder={monthFilter ? monthFilter : "Month"} className="basic-multi-select" classNamePrefix="select" onChange={(selectedOption) => setMonthFilter(selectedOption.value)} />
					</div>

					<div className="flex justify-center flex-col">
						<Select name="colors" options={YearFilterOptions} placeholder={yearFilter ? yearFilter : "Year"} className="basic-multi-select" classNamePrefix="select" onChange={(selectedOption) => setYearFilter(selectedOption.value)} />
					</div>
					
					
				</div>
			</section>

		  

			<section id="Table-Container" className="mt-6">
				<table className="w-full border-collapse">
					<thead className="bg-gray-50 border-b-2 border-gray-200">
						<tr>

                           <th className="px-4 w-36 text-lg font-light tracking-wide text-left">Date</th>
                            <th className="px-4 w-56 text-lg font-light tracking-wide text-left">Details</th>
                            <th className="px-4 w-40 text-lg font-light tracking-wide text-left">Amount (R)</th>
                            <th className="px-4 w-40 text-lg font-light tracking-wide text-left">Type</th>
                            <th className="px-4 w-48 text-lg font-light tracking-wide text-left">Category</th>
                            <th className="px-4 w-64 text-lg font-light tracking-wide text-left">Supplier</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100">
						{debtorTransactions && debtorTransactions.filter(
						   (DTF) => DTF.year === yearFilter && 
						   DTF.monthname === monthFilter &&
						   (transactionTypeFilter === "all" || DTF.type === transactionTypeFilter)
						).map((DT) => (
							<tr key={DT.id} className={` hover:bg-gray-100`} onClick={() => showEditModal(
								{
									id: DT.id, 
									details: DT.details,
									amount: DT.amount,
									type: DT.type,
									date: dateFormater(DT.date),
									category: DT.category_name,
									categoryID: DT.category_id,
									supplierID: DT.supplier_id,
									accountID: DT.account_id
								})
							}>
						 

								<td className="p-3 text-sm text-gray-700">
									<span>{formatDate(DT.date)}</span>
								</td>

								<td className="p-3 text-sm text-gray-700">
									<span>{DT.details}</span>
								</td>

								<td className="p-3 text-sm text-gray-700">
									<div>
										<span className="text-gray-400 pr-1">(R)</span><span>{DT.amount}</span>
									</div>
								</td>

								<td className="p-3 text-sm text-gray-700">
									<span className={`px-2 py-1 text-xs font-medium tracking-wider uppercase rounded bg-opacity-70 ${DT.type == "debit" ? "text-red-800 bg-red-200" : "text-green-800 bg-green-200"}`}>
										{DT.type}
									</span>
								</td>

								<td className="p-3 text-sm text-gray-700">
									<span className="px-2 py-1 text-xs font-medium tracking-wider uppercase text-yellow-800 bg-yellow-200 rounded bg-opacity-70">
										{DT.category_name}
									</span>
								</td>
							   
								<td className="p-3 text-sm text-gray-700">
									<span className="px-2 py-1 text-xs font-medium tracking-wider uppercase text-orange-800 bg-orange-200 rounded bg-opacity-70">
										{DT.supplier_name}
									</span>
								</td>

							</tr>
						))}
					</tbody>
				</table>
			</section>
			<section>
				<AddDebtorTransactionModal isVisible={isOpenTransactionModal} onClose={() => setIsOpenTransactionModal(false)} debtorIDParam={debtorIDParam}/>
				<EditDebtorTransactionModal isVisible={isOpenEditModal} onClose={() => setIsOpenEditModal(false)} editObject={objectState}/>
				<ToastContainer/>
			</section>
		</main>
	);
}