import React from 'react'
import "./LeftSidebar.css";
 import { NavLink } from 'react-router-dom';

 import globe from "../../assets/globe.svg";

const LeftSidebar = () => {
  return (
    <div className="left-sidebar">
      <nav className='side-nav'>
       <NavLink to ="/" className="side-nav-links" activeClassname="active">
          <p>Home</p>
       </NavLink>
       <div className='side-nav-div'>
         <div>
             <p style={{marginLeft:"7px"}}>PUBLIC</p>
         </div>
         <NavLink to ="/Questions" className="side-nav-links"  activeClassname="active" style={{marginLeft:"20px"}}>
          <img src={globe} alt="globe" style={{width:"18px"}} />
          <p style={{marginLeft:"7px"}}>Questions</p>
         </NavLink>
         <NavLink to ="/Tags" className="side-nav-links"  activeClassname="active" style={{marginLeft:"20px"}}>
          <p>Tags</p>
         </NavLink>
         <NavLink to ="/Users" className="side-nav-links"  activeClassname="active" style={{marginLeft:"20px"}}>
          <p>Users</p>
         </NavLink>
       </div>
       </nav>
    </div>
  )
}

export default LeftSidebar;
