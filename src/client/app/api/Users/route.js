import { NextResponse } from "next/server";
import bcrypt from "bcrypt"

export async function POST(req, res){
    const {firstName, lastName, email, password} = await req.json()
    const hashPassword = await bcrypt.hash(password, 10) // Hasing password
    console.log("Hashed Password", hashPassword)

    try {

        // Confirm Data exists
        if(!email || !password){
            console.log("Email or Password Missing")
            return NextResponse.json({message: "Email or password missing"}, {status: 400})
        }

        try {
            //Y This API ROUTE handles all auth for Diamond 
            const response = await fetch(`${process.env.NEXT_PUBLIC_ENV_SERVER_BASE}/api/diamond_user/diamond_user_auth`, {
                method: "POST",
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    passwordHash: password
                    
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if(response.ok){
                const data = await response.json()
                console.log("Verifu User exists", data)
                return NextResponse.json({data}, {status: 200})
            }
            
        } catch (error) {
            console.log(error)
            return NextResponse.json({message: "Could not make API call to Verify that DIMAOND_USER exists"}, {status: 500})
        }

        return NextResponse.json({message: "Could not make API call to Verify that DIMAOND_USER exists"}, {status: 500})

        
    } catch (error) {
console.log(error)
        return NextResponse.json({message: error}, {status: 500})
    }
}