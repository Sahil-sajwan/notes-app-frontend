import React from "react";
import BoldText from "../../BoldText/BoldText";
import classes from "./HomePage.module.css"

function HomePage() {

    return <div className={classes.heading}>
        <BoldText><p>Welcome to keeper app</p>
            <p>A place where you can keep your notes</p>
        </BoldText>
    </div>
}

export default HomePage;