import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

const fetchProviderUserDetails = async (emailFromProvider, nameFromProvider, provider) => {
    if(!emailFromProvider) throw new Error("Could not get Email 0001")
     //Y API call to get all User Info
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_ENV_SERVER_BASE}/api/auth`, {
            method: "POST",
            body: JSON.stringify({
                email: emailFromProvider,
                name: nameFromProvider
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json()
        if(response.ok){
            console.log({data}, "00001")
        }else {
            throw new Error(error, "00001")
        }
        return data
    } catch (error) {
        throw new Error(`Could not make API call to get Diamond User's details from Server using Provider:[${provider}] 0001.1`, error)
    }
}

export const options = {
    
    providers: [
        GithubProvider({
            profile(profile){
                console.log("Profile Github: 001", profile)

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
                console.log("Profile Google: 002", profile)

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

        // CredentialsProvider({
        //     name:"Credentials",
        //     credentials: {

        //         email: {
        //             label:"Email",
        //             type: "text",
        //             placeholder: "Email"
        //         },
                
        //         password: {
        //             label: "Password",
        //             type: "password",
        //             placeholder: "Password"
        //         },
                
        //     },

        //     async authorize(credentials){
        //         // console.log("Credentials Provider 003", credentials)
        //         try {
        //             //Y API call to express Server to verify if the user exists
        //             const response = await fetch(`${process.env.NEXT_PUBLIC_ENV_SERVER_BASE}/api/auth`, {
        //                 method: "POST",
        //                 body: JSON.stringify({
        //                     email: credentials.email,
        //                     password: credentials.password
                            
        //                 }),
        //                 headers: {
        //                     "Content-Type": "application/json"
        //                 }
        //             })
                    
        //             //! Error in the API call
        //             if(!response.ok){
        //                 const data = response.json()
        //                 console.log("Error Credientials provider [API call to DIAMOND_USER_AUTH] 004", data)
        //                 return null
        //             }
                    
        //             else {
        //                 console.log("Credentials Provider: User exists 005")
        //                 console.log({credentials}, "006")
        //                 const data = await response.json()
        //                 console.log("Authenticated User 007", {data})

        //                 //Y If the user is found 1:23:08 & Return User
        //                 console.log(data.authenticatedDiamondUser, "008")
        //                 return data.authenticatedDiamondUser
        //             }

                    
        //         } catch (error) {
        //             console.log("Credentials Provider Error 009", error)
        //             return null; //Y This means that. the credentials where incorrect so will not return a user
        //         }
        //         return null //Y This means we do not return a user, so authentication failed
        //     }
        // }),

        // GoogleProvider({})
    ],

    //Y Adding Role to Token
    callbacks: {
        // X Server Side
        async jwt({token, user}){
            if (user) {
                const diamondUser = await fetchProviderUserDetails(user.email, user.name, "Github") 
                console.log({diamondUser}, "0010")
                token.role = user.role;          // you already have this
                token.user = user;            // store ENTIRE authenticatedDiamondUser object
                token.diamond = diamondUser //Y This is the Auth Object for DIAMOND_AUTH
            }
            return token;
        }, 

        // X Client Side
        async session({session, token}){
            if (session.user) {
                session.user.role = token.role;  // your existing code
                session.diamond = token.diamond.authenticatedDiamondUser; // expose diamond user data to client 
            }
            return session;
        }
    }
}

