import React from "react";
import classes from "./Note.module.css"
import { Link } from "react-router-dom"

function Note(props){
  const handleClick= () => {
    props.onDel(props.id);
  }
    return <div className = {classes.note}>
        <Link className={classes.link} to={`/note/${props.id}`}><h1>{ props.title }</h1></Link>
        <p>{ props.content }</p>
        <button onClick={handleClick}>DELETE</button>
    </div>
}

export default Note;