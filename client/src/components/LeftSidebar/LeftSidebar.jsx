import React, {useState,useEffect} from 'react'
import "./LeftSidebar.css";
 import { NavLink } from 'react-router-dom';

 import globe from "../../assets/globe.svg";

 import axios from 'axios';

const  API_ENDPOINT= `https://api.openweathermap.org/data/2.5/weather?`;
const API_KEY =`a0d24f1daae749e36ccf910fefc2aea6`;


const LeftSidebar = () => {
  const [latitude, setLatitude]= useState('');
   const [longitude, setLongitude]= useState('');
   const [responseData, setResponseData]= useState('')
   useEffect(()=>  {
    navigator.geolocation.getCurrentPosition((position)=>{
     setLatitude(position.coords.latitude)
     setLongitude(position.coords.longitude)

    })
     const finalApi = `${API_ENDPOINT}lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=${API_KEY}`
     //console.log(finalApi)
         axios.get(finalApi)

   .then((response)=>{
        setResponseData(response.data)
     //  console.log(response.data)
    })
    .catch(error=>{
        console.log(error);
    })
    
     },[latitude,longitude])
    if(!latitude)
     return <>Loading ....</>
 const getTheme =()=>{
      if(!responseData) return 'default'
         const isDay = responseData.dt > responseData.sys.sunrise && responseData.dt < responseData.sys.sunset;

     //const isDay = responseData.dt === 1709982899; 
       // console.log(isDay);
         if (!isDay) {
          return 'night-left'
        } else{
         return 'day'
       }
        

}
   const theme =getTheme();
  return (
    <div className={`left-sidebar ${theme}`}>
      <nav className='side-nav'>
       <NavLink to ="/" className={`side-nav-links ${theme}`} activeClassname="active">
          <p>Home</p>
       </NavLink>
       <div className='side-nav-div'>
         <div>
             <p style={{marginLeft:"7px"}}>PUBLIC</p>
         </div>
         <NavLink to ="/Questions" className={`side-nav-links ${theme}`}  activeClassname="active" style={{marginLeft:"20px"}}>
          <img src={globe} alt="globe" style={{width:"18px"}} />
          <p style={{marginLeft:"7px"}}>Questions</p>
         </NavLink>
         <NavLink to ="/Tags" className={`side-nav-links ${theme}`}  activeClassname="active" style={{marginLeft:"20px"}}>
          <p>Tags</p>
         </NavLink>
         <NavLink to ="/Users" className={`side-nav-links ${theme}`}  activeClassname="active" style={{marginLeft:"20px"}}>
          <p>Users</p>
         </NavLink>
         <NavLink to ="/Subscription" className={`side-nav-links ${theme}`}  activeClassname="active" style={{marginLeft:"20px"}}>
          <p>Subscription</p>
         </NavLink>
         <NavLink to ="/Community" className={`side-nav-links ${theme}`}  activeClassname="active" style={{marginLeft:"20px"}}>
          <p>Community</p>
         </NavLink>
       </div>
       </nav>
    </div>
  )
}

export default LeftSidebar;
