import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

export const options = {
    providers: [
        GithubProvider({
            profile(profile){
                console.log("Profile Github: ", profile)

                let userRole = "Github User"
                if(profile?.email === "grahamben7@gmail.com"){
                    userRole = "admin"
                }

                return {
                    ...profile,
                    role: userRole,
                    DiamondLoginProvider: "github"

                }
            },

            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_Secret
        }),
       
        GoogleProvider({
            profile(profile){
                console.log("Profile Google: ", profile)

                let userRole = "Google User"
                if(profile?.email === "grahamben7@gmail.com"){
                    userRole = "admin"
                }

                return {
                    ...profile,
                    id: profile.sub,
                    role: userRole,
                    DiamondLoginProvider: "google"
                }
            },
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_Secret,

            authorization: {
                params: {
                    prompt: "select_account", // 👈 forces Google to show the account chooser
                    access_type: "offline",
                    response_type: "code",
                }
            }


        }),

        CredentialsProvider({
            name:"Credentials",
            credentials: {

                email: {
                    label:"Email",
                    type: "text",
                    placeholder: "Email"
                },
                
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Password"
                },
                
            },

            async authorize(credentials){
                console.log("Credentials Provider", credentials)
                try {
                    //Y API call to express Server to verify if the user exists
                    const response = await fetch(`${process.env.NEXT_PUBLIC_ENV_SERVER_BASE}/api/diamond_user/diamond_user_auth`, {
                        method: "POST",
                        body: JSON.stringify({
                            email: credentials.email,
                            passwordHash: credentials.password
                            
                        }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    
                    //! Error in the API call
                    if(!response.ok){
                        console.log("Error Credientials provider [API call to DIAMOND_USER_AUTH]")
                        return null
                    }
                    
                    else {
                        console.log("Credentials Provider: User exists")
                        console.log({credentials})
                        const data = await response.json()
                        console.log("Authenticated User", {data})

                        //Y If the user is found 1:23:08 & Return User
                        console.log(data.authenticatedDiamondUser)
                        return data.authenticatedDiamondUser
                    }

                    return null; //Y This means that. the credentials where incorrect so will not return a user
                    
                } catch (error) {
                    console.log("Credentials Provider Error", error)
                    
                }
                return null //Y This means we do not return a user, so authentication failed
            }
        }),

        // GoogleProvider({})
    ],

    //Y Adding Role to Token
    callbacks: {
        // X Server Side
        async jwt({token, user}){
            if(user) token.role = user.role
            return token
        }, 

        // X Client Side
        async session({session, token}){
            if(session?.user) session.user.role = token.role
            return session
        }
    }
}

