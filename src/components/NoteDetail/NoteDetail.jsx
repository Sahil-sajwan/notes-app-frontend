import React from "react";
import { getToken } from "../../utils/auth";
import { useLoaderData } from "react-router-dom";
import classes from "./NoteDetail.module.css"
import axios from "axios";
import { BASE_URL } from "../../utils/info";

function NoteDetail(){
    const data = useLoaderData()
   
return <div className={classes.note}>
  <h1>{data.title}</h1>
  <p>{data.content}</p>
</div>
}

async function noteLoader({params}){
    const headers = {
        'Authorization': getToken(),
        'Content-Type': 'application/json'
      };
      
    const response = await axios.get(BASE_URL+`/api/notes/${params.id}`,{headers})
    return response.data
}

export default NoteDetail;
export {noteLoader};