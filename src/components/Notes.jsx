import React, { useState } from "react"
import Note from "./Note/Note"
import CreateArea from "./CreateArea"
import useFetchData from "../hooks/useFetchData"
import BoldText from "./BoldText/BoldText"
import axios from "axios"
import { BASE_URL } from "../utils/info"
import { getToken } from "../utils/auth"
import { redirect } from "react-router-dom"

function trimContent(note) {
    if (note.length > 100) {
        note = note.substring(0, 100)
        note += "..."
    }
    return note
}



function Notes() {

    const { data: notes, setData: setNotes, isLoading, error } = useFetchData(BASE_URL + '/api/notes')
    const [message, setMessage] = useState("")
    function onError(m) {
        setMessage(m)
    }

    function addNote(note) {

        setNotes(
            prev => {
                return [...prev, note]
            })

    }

    function onPost(note) {
        axios.post(BASE_URL + "/api/notes", note, {
            headers: {
                'Authorization': getToken(),
                'Content-Type': 'application/json',
            }
        }).then(data => {

            addNote({ ...note, id: data.data.id })
        }).catch(err => {
            onError(err.response.data.message)

        })
    }

    if (error) {
        return <BoldText>some error occurred (try to login again)</BoldText>
    }

    else if (!isLoading && notes.length > 0) {

        return <div className="app">
            <BoldText>{message}</BoldText>
            <CreateArea title="" content="" onError={onError} postAction={onPost} button="Add note" />
            {notes.map((note, index) => {
                return <Note id={note.id} key={index} title={note.title} content={trimContent(note.content)} />
            })}

        </div>
    }

    else if (!isLoading && notes.length === 0) {

        return <div>
            <CreateArea title="" content="" onError={onError} postAction={onPost} button="Add note" />
            <BoldText>
                <p>No notes to show &#x1F605;</p>
                <p>feel free to add them</p>
            </BoldText>
        </div>
    }

    else if (isLoading) {
        return <BoldText>loading data ...</BoldText>

    }

}

function noteAction() {
    return redirect('/notes')
}

export default Notes;

export { noteAction };