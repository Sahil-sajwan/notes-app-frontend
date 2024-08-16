import React, { useState } from "react";
import { getToken } from "../../utils/auth";
import { redirect, useLoaderData, useSubmit } from "react-router-dom";
import classes from "./NoteDetail.module.css"
import CreateArea from "../CreateArea";
import axios from "axios";
import { BASE_URL } from "../../utils/info";
import BoldText from "../BoldText/BoldText";

function NoteDetail() {
  const [message, setMessage] = useState("")
  const submit = useSubmit()

  const [toggle, setToggle] = useState(false)
  function onError(m) {
    setMessage(m)
  }
  function handleClick() {
    setToggle(!toggle)
  }

  function handleDelete() {
    const headers = {
      'Authorization': getToken(),
    };
    axios.delete(BASE_URL + `/api/notes/${data.id}`, { headers }).then(data => {
      submit(null, {
        method: "post",
        action: "/notes",
      });

    }).catch(err => {
      onError(err.response.data.message)

    })
  }



  const data = useLoaderData()
  function onPost(note) {

    axios.put(BASE_URL + `/api/notes/${data.id}`, note, {
      headers: {
        'Authorization': getToken(),
        'Content-Type': 'application/json',
      }
    }).then(d => {
      setToggle(!toggle)
      submit({ id: data.id }, {
        method: "post",
        action: "/edit",
        encType: "application/json",
      });

    }).catch(err => {
      onError(err.response.data.message)

    })
  }



  return <div>
    <button className={classes.btn} onClick={handleClick}>{!toggle ? 'EDIT' : 'VIEW'}</button><button className={classes.btn} onClick={handleDelete}>DELETE</button>
    {!toggle ?
      <div className={classes.note}>
        <h1>{data.title}</h1>
        <p>{data.content}</p>

      </div> : <div><BoldText>{message}</BoldText><CreateArea title={data.title} content={data.content} postAction={onPost} onError={onError} button="Save" /></div>}

  </div>
}

async function noteLoader({ params }) {
  const headers = {
    'Authorization': getToken(),
    'Content-Type': 'application/json'
  };

  const response = await axios.get(BASE_URL + `/api/notes/${params.id}`, { headers })
  return response.data
}

async function editAction({ request }) {
  let formData = await request.json();
  return redirect(`/note/${formData.id}`)
}

export default NoteDetail;
export { noteLoader, editAction };