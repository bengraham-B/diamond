"use client"
import React from 'react'
import UserForm from '../(components)/UserForm'



export default function CreateUser() {
	return (
		<div>
			<h1>Only Admins</h1>
			<p>Uses middlware for Auth</p>
			<UserForm/>
		</div>
	)
}
