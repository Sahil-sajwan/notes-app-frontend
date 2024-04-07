import React from "react";
import classes from "./BoldText.module.css"

function BoldText(props){
return <div className={classes.bold}>
    {props.children}
</div>
}

export default BoldText;