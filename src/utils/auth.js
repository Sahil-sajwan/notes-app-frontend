import { redirect } from "react-router-dom"

function getToken(){
    return localStorage.getItem("token")

}

function tokenLoader(){
    return getToken()
}
function logout(){
    localStorage.removeItem("token")
}

function checkAuthLoader(){
    const token = getToken()
    if(!token){
        return redirect("/login")
    }
    return null
}
export  {getToken,tokenLoader,logout, checkAuthLoader};