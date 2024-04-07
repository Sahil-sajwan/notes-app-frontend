import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import classes from "./SignUp.module.css"
import BoldText from "../BoldText/BoldText";
import { BASE_URL } from "../../utils/info";

function SignUp(){
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("")
const [postData, setPostData] = useState({
    username:"",
    password:""
})
    function handleClick(event){
        event.preventDefault()
       // console.log(BASE_URL+"/users")
        axios.post(BASE_URL+"/users",postData/*,{
        /*  headers:{
            'Content-Type': 'application/json',
        }
        }*/).then(data => {

             navigate("/login");
        }).catch(err => {
            console.log(err)
            setErrorMessage(err.response.data.message)
        })
       
     

    }

    function handleFocus(){
        setErrorMessage("")
    }

function handleChange(event){
const {name, value} = event.target

setPostData((prev) => {
    return {
    ...prev,
    [name]: value
}
})

}

return <div>
    <BoldText>Registration</BoldText>
    <BoldText>{errorMessage}</BoldText>
    <div className={classes.signup}>
<form>
<label htmlFor="username">Enter username: </label>
    <input id="username" name="username" type="text" onChange={handleChange} onFocus={handleFocus} value={postData.username}></input>
    <br></br>
    <label htmlFor="password">Enter password: </label>
    <input id="password" name="password" type="password" onChange={handleChange} onFocus={handleFocus} value={postData.password}></input>
    <br></br>
    <button onClick={handleClick}>Sign up</button>
</form>
</div>
</div>
}

export default SignUp;