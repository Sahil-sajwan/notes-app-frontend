import React from "react";
import { NavLink, useRouteLoaderData, useSubmit } from "react-router-dom";
import classes from "./Header.module.css"

function Header() {
  const submit = useSubmit()
  function handleClick() {
    submit(null, { action: "/logout", method: "post" })

  }
  const token = useRouteLoaderData('root')

  return <div className={classes.header}>
    <h1>Notes</h1>
    <div className={classes.nav}>

      <NavLink to="" className={({ isActive }) => isActive ? classes.active : classes.link} end>HOME</NavLink>
      {token && <NavLink to="notes" className={({ isActive }) => isActive ? classes.active : classes.link} end>MY NOTES</NavLink>}
      {!token && <NavLink to="signup" className={({ isActive }) => isActive ? classes.active : classes.link} end>SIGN UP</NavLink>}
      {!token && <NavLink to="login" className={({ isActive }) => isActive ? classes.active : classes.link} end>LOG IN</NavLink>}
      {token && <button className={classes.logout} onClick={handleClick}>LOG OUT</button>}
    </div>


  </div>
}

export default Header