"use client"
import React, {useState, useEffect} from 'react'
import { useSession } from "next-auth/react";
import "./page.scss"

// =======================================================================================================
//  										Category Page
// =======================================================================================================


import Table from './Table'
import AddCategoryModal from './AddCategory/AddCategoryModal'

export default function Page() {
	const { data: session } = useSession()
	
	const [isOpenAddCategoryModal, setIsOpenAddCategoryModal] = useState(false)

	const showTransactionModal = (id) => {
		// setObjectState(id); // Extract and set the admin's ID
		setIsOpenAddCategoryModal(true);
	};

	  useEffect(() => {
		if(!session) return
	
		}, [session])
	
		// Early return moved after hook calls
	
		if (!session) return 
	
	return (
		<main className='category-page'>
			
			<section className='header-section'>
				<h1>Categories</h1>
			</section>

			<section className="add-cat-section">
				<div className='name flex justify-end p-2 '>
					<button onClick={showTransactionModal} className='bg-yellow-300 py-2 px-4 mx-6 my-2 rounded'>Add Category</button>
				</div>
			</section>

			<section className="category-body-section">
				<div className="table-container">
					<Table/>
				</div>

			</section>
			
			<section>
				<AddCategoryModal isVisible={isOpenAddCategoryModal} onClose={() => setIsOpenAddCategoryModal(false)} accountIDParam={session.diamond.accountID}/>
			</section>
		</main>
	)
}
