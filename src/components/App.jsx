import React from 'react';
import Notes, { noteAction } from './Notes';
import RootLayout from './layout/RootLayout';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from './pages/HomePage/HomePage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import SignUp from './SignUp/SignUp';
import Login, { loginAction, logoutAction } from './Login/Login';
import NoteDetail, { editAction, noteLoader } from './NoteDetail/NoteDetail';
import { checkAuthLoader, tokenLoader } from '../utils/auth';


const router = createBrowserRouter([{
  path: '/',
  element: <RootLayout />,
  errorElement: <ErrorPage />,
  id:'root',
  loader: tokenLoader,
  children:[
    
      {
      //  path:'',
      index:true,
        element: <HomePage />,
        
      },
      {
        path: 'notes',
        element: <Notes />,
        loader:checkAuthLoader,
        action: noteAction
        
    
      },
      {
        path: 'signup',
        element: <SignUp />
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction
      },
      {
        path: 'note/:id',
        element: <NoteDetail />,
        loader: noteLoader
      },
    {
      path: 'logout',
      action: logoutAction
    },
    {
      path: 'edit',
      action: editAction
    }
    
  ]
 
}])

function App(){
  return <RouterProvider router={router}/>
}

export default App;


/*import React, { useState } from "react"
import Note from "./Note/Note"
import CreateArea from "./CreateArea"
import useFetchData from "../hooks/useFetchData"
import BoldText from "./BoldText/BoldText"

function trimContent(note){
    if(note.length>100){
        note=note.substring(0,100)
        note+="..."
    }
    return note
}



function App(){

     const {data:notes, setData:setNotes, isLoading,error} = useFetchData('http://localhost:8080/api/notes')

     const [message,setMessage] = useState("")
    function addNote(note){

        if(note.title.length === 0){
            setMessage("Please fill title..")
            return;
        }
        else if(note.title.length > 100){
            setMessage("Please fill only 100 characters!")
            return;
        }
        note.content=trimContent(note.content)
      
        setNotes(
            prev => {
            return [...prev,note]
        })
        setMessage("")
        }

        function deleteNote(id){
            setNotes(prev => {
                return prev.filter((note,index) => {
                    return id !== index;
                })
            })
        }
    if(error){
        return <BoldText>some error occurred</BoldText>
        }

    else if(!isLoading&&notes.length>0){

    return <div className="app">
    
    <BoldText>{message}</BoldText>
    <CreateArea onAdd={addNote}/>
    {notes.map((note,index) => {
        return  <Note onDel={deleteNote} id={index} key={index} title={note.title} content={note.content} />
    })}

    </div>
    }

     else if(!isLoading&&notes.length===0){
        
       return <div>
        <CreateArea onAdd={addNote}/>
        <BoldText>
        <p>No notes to show &#x1F605;</p>
        <p>feel free to add them</p>
        </BoldText>
        </div>
    }

    else if(isLoading){
        return <BoldText>loading data ...</BoldText>

    }
   
}

export default App*/