
# Backend test 

https://backend-demo-eight.vercel.app/

This project was created using Next.JS. It is hosted using vercel and makes use of a serverless function. Other libraries and frameworks are listed below


| Library | Description |
| ----------- | ----------- |
| React | Frontend framework for handling render logic and states |
| Tailwind-css | A small styling library |
| Typescript | A library for enforcing types in Javascript |
| NextAuth.JS | A library for authentication and authorization |

## Code walk through
### Front end
NextAuth.js provides a straight-forward way to incorporate authorization and authentication. First, we wrap our entire app inside a sesionProvider. This enables us to retrieve information about the user anywhere inside the App component.

To then retrieve information about the user, NextAuth.JS provides a useSession hook. Looking at index.tsx in the pages folder, we use the information retrieved to determine if the user is logged in and who the user is.

If the user is not logged in, we show a login button. Otherwise, we show a logout button.


### Back end
Next.JS handles the separation of the backend and frontend a little differently and blurs the line between them slightly.

API's live in the folder pages/api/*

For auth in particular, this lives in pages/api/auth

NextAuth.JS is kind enough to provide a dynamic route handler for common operations such as signIn, callback and signout. What this means, is we can make just one file ([...nextauth].ts) instead of many files to handle the different operations.

This file looks as follows:

```
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.clientId ?? "",
            clientSecret: process.env.clientSecret ?? "",
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
    ],

}

export default NextAuth({
    ...authOptions,
    secret: process.env.secret,
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            const isAllowedToSignIn = true
            if (isAllowedToSignIn) {
                return true
            } else {
                return false
            }
        }
    }
})
```

Since the requirement for the project was to allow users to signin using their google accounts, the provider array only specifies Google. If we wanted to add more providers, we would do so here.

along with our auth options, we then also pass in some additional options. The secret is simply a hidden string and is there just to make it work in a production enviroment in my case. As for the callbacks, this is a way to define logic for where users should redirect too. I don't do anything with this but its here for debug sake.

#### Google API setup
To signin with google, I needed to register an app with google. This provided me with my own clientId and ClientSecrets which are then provided to NextAuth.JS.

In addition to this, I needed to let the app know which redirect urls were allowed and which origins were allowed. I added the usual localhosts for local developement and then added urls I would recieve from Vercel later on for production.


### Deployment
To deploy this app, I used Vercel because it was the fastest way I knew to get my app and api's hosted.

After linking my git repo that housed this project, I added in sensitive information such as secrets as enviroment variables in vercel. A few minutes later, and I had my project up and ready to go.

