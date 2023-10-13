import { redirect } from "react-router-dom"

export async function authRequired ( request ) {

    const isLoggedIn = localStorage.getItem('isLoggedIn')

    const pathname = new URL(request.url).pathname
    
    if(!isLoggedIn) {
        throw redirect(`/Authenticate?message=You must Log In. Test any Email&redirectTo=${pathname}`)
    }

    return null
}