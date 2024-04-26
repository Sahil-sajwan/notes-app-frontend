import React, { useState } from "react";

function CreateArea(props){
 const [note, setNote] = useState({
    title: props.title,
    content: props.content
 });

    function handleClick(event){
        event.preventDefault();
        if(note.title.length === 0){
          
            props.onError("Please fill title...")
            return;
        }
        else if(note.title.length > 100){
            props.onError("Please fill atmost 100 characters!")
         
            return;
        }
        if(note.content.length>1000){
            props.onError("Please fill atmost 1000 characters in content !")
        
            return;
        }
        props.postAction(note)
      
      setNote({
        title:"",
        content:""
    })
    }

    function handleFocus(){
       props.onError("")
    }

    function handleChange(event){
       const {name, value} = event.target;
        setNote(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
   

return <div className="create">

    <form>
        <input onChange={handleChange} onFocus={handleFocus} name="title" value={note.title} placeholder="Title"/><br></br>
        <textarea onChange={handleChange} onFocus={handleFocus} name="content" value={note.content} placeholder="Write here ..." rows="5" cols="40"/><br></br>
        <button onClick={handleClick}>{props.button}</button>
    </form>
   
</div>
}

export default CreateArea;