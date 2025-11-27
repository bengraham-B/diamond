import withAuth from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
    function middleware(req){
        // console.log(req.nextUrl.pathname)
        // console.log(req.nextauth.token.role)

        //Y Implement Logic - can customise
            //Y Only Admins can visit a specific page

        if(req.nextUrl.pathname.startsWith("/CreateUser") && req.nextauth.token.role !== "admin"){
            return NextResponse.rewrite(new URL("/Denied", req.url)) // Sends logedin user to the denied page because they are not an admin
        }
    },
    {
        callBacks: {
            authorized: ({token}) => !token
        }
    }
)

// Protects everying
// With Middleware you do not need to do the auth on the page

export const config = { matcher: ["/pages"] }