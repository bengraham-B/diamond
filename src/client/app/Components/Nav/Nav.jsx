"use client"
import React from 'react'
import styles from "./nav.module.scss"
import Link from 'next/link'

export default function Nav() {
	return (
		<main className={styles.nav}>

			<span className={styles.route_btn}>
				<Link href="/pages/dashboard">Dashboard</Link>
			</span>

			<span className={styles.route_btn}>
				<Link href="/pages/transaction">Transaction</Link>
			</span>

			<span className={styles.route_btn}>
				<Link href="/pages/debtor">Debtor</Link>
			</span>

			<span className={styles.route_btn}>
				<Link href="/pages/creditor">Creditor</Link>
			</span>
			
			<span className={styles.route_btn}>
				<Link href="/pages/category">Category</Link>
			</span>
			
			<span className={styles.route_btn}>
				<Link href="/pages/supplier">Suppliers</Link>
			</span>

		</main>
	)
}
