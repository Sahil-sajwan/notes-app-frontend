import React, { useEffect } from "react";
import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer";

function RootLayout(){
   const token = useLoaderData()
    const submit = useSubmit()
    useEffect(()=>{
        if(!token){
            return
        }
        const currentDate= new Date()
        const expiry=localStorage.getItem("exp")
        if(currentDate.getTime()>expiry){
            submit(null,{action:"/logout",method:"post"})
        }

    },[token,submit])
return <div>
<Header />
<Outlet />
<Footer />
</div>
}

export default RootLayout;