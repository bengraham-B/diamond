"use client"
import { useSession } from "next-auth/react"

export default function Dashboard() {
    const { data: session } = useSession()

    if (!session) return <p>Loading...</p>
	console.log(session.diamond.accountID)

    return (
        <div>
            <h1>Welcome {session.diamond.accountID}</h1>
            <h1>{session.user.email}</h1>

            <h2>Diamond User Data:</h2>
            <pre>{JSON.stringify(session.diamond, null, 2)}</pre>
        </div>
    )
}
