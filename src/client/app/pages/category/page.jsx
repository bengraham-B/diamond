"use client"
import React, {useState, useEffect} from 'react'
import { useSession } from "next-auth/react";
import "./page.scss"

// =======================================================================================================
//  										Category Page
// =======================================================================================================

import CategoryTable from './CategoryTable';

import AddCategoryModal from './AddCategory/AddCategoryModal'
import EditcategoryModal from './CategoryModalTable/CategoryModalTable';

export default function Page() {
	const { data: session } = useSession()
	
	const [isOpenAddCategoryModal, setIsOpenAddCategoryModal] = useState(false)
	const [isOpenEditCategoryModal, setIsOpenEditCategoryModal] = useState(false)

	

	const showAddCategoryModal = (id) => {
		// setObjectState(id); // Extract and set the admin's ID
		setIsOpenAddCategoryModal(true);
	};

	const showEditCategoryModal = () => {
		setIsOpenEditCategoryModal(true)
	}

	  useEffect(() => {
		if(!session) return
	
		}, [session])
	
		if (!session) return 
	
	return (
		<main className='category-page'>
			
			<section className='header-section'>
				<h1>Categories</h1>
			</section>

			<section className="add-cat-section">
				<div className='name flex justify-end p-2 pr-4 '>
					<button onClick={showAddCategoryModal} className='bg-yellow-300 py-2 px-4 mx-6 my-2 rounded'>Add Category</button>
					<button onClick={showEditCategoryModal} className='bg-yellow-300 py-2 px-4 mx-6 my-2 rounded'>Edit Category</button>
				</div>
			</section>

			<section className="category-body-section">
				<div className="table-container space-y-4 my-2">
					<CategoryTable/>
				</div>

			</section>
			
			<section>
				<AddCategoryModal isVisible={isOpenAddCategoryModal} onClose={() => setIsOpenAddCategoryModal(false)} accountIDParam={session.diamond.accountID}/>
				<EditcategoryModal isVisible={isOpenEditCategoryModal} onClose={() => setIsOpenEditCategoryModal(false)} accountIDParam={session.diamond.accountID}/>
			</section>
		</main>
	)
}
