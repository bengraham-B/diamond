"use cleint"
import React from 'react'
import "./page.scss"

import Table from './Table'

export default function Page() {
	return (
		<main className='category-page'>
			
			<section className='header-section'>
				<h1>Categories</h1>
			</section>

			<section className="category-body-section">
				<span className="left">
					
					<div className="table-container">
						<Table/>
					</div>

				</span>
				<span className="right">

				</span>
			</section>
		</main>
	)
}
