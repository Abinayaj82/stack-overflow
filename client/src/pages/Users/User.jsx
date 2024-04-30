import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom';
import './Users.css'


import axios from 'axios';

const  API_ENDPOINT= `https://api.openweathermap.org/data/2.5/weather?`;
const API_KEY =`a0d24f1daae749e36ccf910fefc2aea6`;

const User = ({user}) => {
  const [latitude, setLatitude]= useState('');
  const [longitude, setLongitude]= useState('');
  const [responseData, setResponseData]= useState('')
  useEffect(()=> {
    navigator.geolocation.getCurrentPosition((position)=>{
     setLatitude(position.coords.latitude)
     setLongitude(position.coords.longitude)

    })
     const finalApi = `${API_ENDPOINT}lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=${API_KEY}`
     console.log(finalApi)
         axios.get(finalApi)

   .then((response)=>{
        setResponseData(response.data)
       console.log(response.data)
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
        console.log(isDay);
         if (!isDay) {
          return 'night-user'
        } else{
         return 'day'
       }
        

}
   const theme =getTheme();
  return (
    <Link to ={`/Users/${user._id}`} className='user-profile-link'>
          <h3>{user.name.charAt(0).toUpperCase()}</h3>
          <h5 className= {` user-profile-link-h5 ${theme}`}>{user.name}</h5>
    </Link>
  )
}

export default User
