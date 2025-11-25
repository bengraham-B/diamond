"use client"
import React from 'react'
import styles from "./nav.module.scss"
import Link from 'next/link'

export default function Nav() {
	return (
		<main className={styles.nav}>

			<Link href="/pages/transaction" className={styles.route_btn}>Transaction</Link>

			<Link href="/pages/debtor" className={styles.route_btn}>Debtor</Link>

			<Link href="/pages/creditor" className={styles.route_btn}>Creditor</Link>
		
			<Link href="/pages/category" className={styles.route_btn}>Category</Link>
		
			<Link href="/pages/supplier" className={styles.route_btn}>Suppliers</Link>
			
			<Link href="/pages/budget" className={styles.route_btn}>Budget</Link>

		</main>
	)
}
