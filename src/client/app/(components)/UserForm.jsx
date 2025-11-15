"use client"
const { useRouter } = require("next/navigation")
import React, { useState } from "react"

export default function UserForm() {
	const router = useRouter()
	const [formData, setFormData] = useState({})
	const [errorMessage, setErrorMessage] = useState("")

	const handleChange = (e) => {
		const value = e.target.value 
		const name = e.target.name

		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}))

	}

	const handleSubmit = async (e) => {

		setErrorMessage("")
		const response = await fetch("/api/Users", {
			method: "POST",
			body: JSON.stringify({
				firstName: "DEV", 
				lastName: "DEV", 
				email: "DEV6@gmail.com", 
				password: "dev" 

			}),
			headers: {
				"Content-Type": "application/json"
			}
		})

		if(!response.ok){
			const data = await response.json()
			setErrorMessage(data.message)
		} else {
			const data = await response.json()

			console.log(data)
			// router.refresh()
			// router.push("/")
		}
	}


	return (
		<main>
			<button onClick={handleSubmit}>Submit</button>
			<form onSubmit={handleSubmit} method="post" className="flex flex-col gap-3 w-1/2">

				<h1>Create New User</h1>
				<label htmlFor="">Full Name</label>
				<input type="text" name="name" onChange={handleChange} required={true}  value={formData.name || ""} className="m-2 bg-slate-400 rounded"/>
				
				<label htmlFor="">Email</label>
				<input id="email" type="email" name="email" onChange={handleChange} required={true}  value={formData.email || ""} className="m-2 bg-slate-400 rounded"/>
				
				<label htmlFor="">Password</label>
				<input id="password" type="text" name="password" onChange={handleChange} required={true}  value={formData.password || ""} className="m-2 bg-slate-400 rounded"/>

				<input type="submit" value="create user" className="bg-blue-300 hover:bg-blue-100" />

			</form>
			<p className="text-red-500">{errorMessage ? errorMessage : null}</p>
			
		</main>
	)
}
