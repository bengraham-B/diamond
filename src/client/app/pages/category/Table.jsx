"use client"
import React, {useState, useEffect} from 'react'
import { useSession } from 'next-auth/react'

import "./Table.scss"

import EditcategoryModal from './EditCategory/EditCategoryModal'

export default function Table() {
    const { data: session } = useSession()

    const [isOpenEditCategoryModal, setIsOpenEditCategoryModal] = useState(false)
        const [objectState, setObjectState] = useState()
    
    
    

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

    const showEditModal = ({name, details, categoryID, accountID}) => {
        setObjectState({categoryID, name, details, categoryID, accountID}); // Extract and set the admin's ID
        setIsOpenEditCategoryModal(true);
    };

    useEffect(() => {
        if(!session) return
        fetchCategories()
    },[session, isOpenEditCategoryModal])

    if (!session) return

    return (
        <main className='category-table-main'>
            <table>
                <thead cellSpacing="0">
                    <tr>
                        <th>Nr</th>
                        <th>name</th>
                        <th>Details</th>
                        <th>Transactions</th>
                        <th>Debtor Transaction</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {categories && categories.map((C, i) => (
                        <tr key={C.id}>
                            <td>{i+1}</td>
                            <td>{C.name}</td>
                            <td>{C.details}</td>
                            <td>Transactions</td>
                            <td>Debtor Transaction</td>
                            <td>Status</td>
                            <td><button onClick={() => showEditModal({name: C.name, details: C.details, categoryID: C.id, accountID: C.account_id}) }>Edit</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <section>
                <EditcategoryModal isVisible={isOpenEditCategoryModal} onClose={() => setIsOpenEditCategoryModal(false)} editObject={objectState}/>
            </section>
        </main>
    )
}
