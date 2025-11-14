"use client"
import React from 'react'
import { useSession } from "next-auth/react"
import { redirect } from 'next/navigation'

export default  function Member() {
	const {data: session} = useSession({
		required: true,
		onUnauthenticated(){
			redirect("/api/auth/signin?callbackUrl=/ClientMember")
		}
	})
	return (
		<div>
			<h1>Member Client Session</h1>
			<p>Auth on client components</p>
			<p>{session?.user?.email}</p>
			<p>{session?.user?.role}</p>
			<p>{session?.user?.name}</p>
			<p>{session?.user?.id}</p>
			<p>{session?.user?.name}</p>
		</div>
	)
}
