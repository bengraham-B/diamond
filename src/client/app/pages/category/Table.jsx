"use client"
import React, {useState, useEffect} from 'react'
import { useSession } from 'next-auth/react'
import "./Table.scss"
export default function Table() {
    const { data: session } = useSession()
    

    const [categories, setCategories] = useState();

    //Y Fetch Categories
    const fetchCategories = async() => {
try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_ENV_SERVER_BASE}/api/category/get_user_categories`, {
                method: "POST",
                body: JSON.stringify({
                    accountID: session.diamond.accountID
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            
            if(response.ok){
                const data = await response.json()
                setCategories(data.categories)
                console.log(data.categories)

            } else {
                notifyError("Could not Fetch Categories")
            }

        } catch (error) {
            notifyError("Could not Fetch Categories", error)
        }
    }

    useEffect(() => {
        if(!session) return
        fetchCategories()
    },[session])

    if (!session) return

    return (
        <main className='category-table-main'>
            <table>
                <thead cellSpacing="0">
                    <tr>
                        <th>Nr</th>
                        <th>name</th>
                        <th>Details</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {categories && categories.map((C, i) => (
                        <tr key={C.id}>
                            <td>{i+1}</td>
                            <td>{C.name}</td>
                            <td>{C.details}</td>
                            <td><button>Edit</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    )
}
