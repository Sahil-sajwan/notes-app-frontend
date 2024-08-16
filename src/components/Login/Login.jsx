import React, { useState } from "react";
import BoldText from "../BoldText/BoldText";
import classes from "../SignUp/SignUp.module.css";
import { logout } from "../../utils/auth";
import axios from "axios";
import { redirect, useSubmit } from "react-router-dom";
import { BASE_URL } from "../../utils/info";



function Login() {


    const submit = useSubmit()

    const [errorMessage, setErrorMessage] = useState("")
    const [postData, setPostData] = useState({
        username: "",
        password: ""
    })
    function handleClick(event) {
        event.preventDefault()
        axios.post(BASE_URL + "/login", postData)
            .then(data => {
                localStorage.setItem("token", data.data.token)
                const date = new Date()
                localStorage.setItem("exp", date.getTime() + 60 * 60 * 1000)
                submit(null, { action: "/login", method: "post" })


            }).catch(err => {
                setErrorMessage(err.response.data.message)
            })

    }

    function handleChange(event) {
        const { name, value } = event.target

        setPostData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })

    }

    function handleFocus() {
        setErrorMessage("")

    }

    return <div>
        <BoldText>Log in</BoldText>
        <BoldText>{errorMessage}</BoldText>
        <div className={classes.signup}>
            <form>
                <label htmlFor="username">Enter username: </label>
                <input id="username" name="username" type="text" onFocus={handleFocus} onChange={handleChange} value={postData.username}></input>
                <br></br>
                <label htmlFor="password">Enter password: </label>
                <input id="password" name="password" type="password" onFocus={handleFocus} onChange={handleChange} value={postData.password}></input>
                <br></br>
                <button onClick={handleClick}>Log in</button>
            </form>
        </div>
    </div>
}

function loginAction() {

    return redirect('/')
}
function logoutAction() {
    logout()
    localStorage.removeItem("exp")
    return redirect('/')
}

export default Login;
export { loginAction, logoutAction };
