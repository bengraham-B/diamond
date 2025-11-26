"use client"
import React, {useState, useEffect} from 'react'
import { useSession } from 'next-auth/react'

import "./BudgetPage.scss"
import BudgetTable from './BudgetTable'

// =======================================================================================================
//Y  										Budget Page
// =======================================================================================================

export default function Page() {
    const { data: session } = useSession()

    useEffect(() => {
        if(!session) return

    },[session])

    if (!session) return
    
    return (
        <main>

			<section className='header-section'>
				<h1>Budget</h1>
			</section>

            <section id="Filter">

            </section>

            <section id="Table">
                <BudgetTable/>
            </section>
            
        </main>
    )
}
