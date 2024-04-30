import React,{useState,useEffect} from 'react';

import pen from '../../assets/pen.svg';
import blackLogo from '../../assets/blacklogo.svg';
import message from '../../assets/message.svg';


import axios from 'axios';
const  API_ENDPOINT= `https://api.openweathermap.org/data/2.5/weather?`;
const API_KEY =`a0d24f1daae749e36ccf910fefc2aea6`;

const Widget = () => {

  const [latitude, setLatitude]= useState('');
  const [longitude, setLongitude]= useState('');
  const [responseData, setResponseData]= useState('')
  useEffect(()=>  {
    navigator.geolocation.getCurrentPosition((position)=>{
     setLatitude(position.coords.latitude)
     setLongitude(position.coords.longitude)
  
    })
     const finalApi = `${API_ENDPOINT}lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=${API_KEY}`
         axios.get(finalApi)
    .then((response)=>{
        setResponseData(response.data)
        //console.log(response.data)
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
      //console.log(isDay);
   if (!isDay) {
           return 'widget-night'
         } 
          else{
           return 'day'
         }
         
  
  }
    const theme =getTheme();

  return (
    <div className= {`widget ${theme}`}>
      <h4 className= {`widget-h4 ${theme}`}>The Overflow Blog</h4>
          <div className={`right-sidebar-div-1 ${theme}`}>
             <div className='right-sidebar-div-2'>
                <img src={pen} alt="pen"  style={{width:"18px"}}/>
                <p> Observability is key to the future of software (and your DevOps
            career)</p>
             </div>
             <div className='right-sidebar-div-2'>
                <img src={pen} alt="pen"  style={{width:"18px"}}/>
                <p>Podcast 374: How valuable is your screen name? </p>
             </div>
          </div>
          <h4  className=  {`widget-h4 ${theme}`}>Featured on Meta</h4>
          <div className={`right-sidebar-div-1 ${theme}`}>
            <div className="right-sidebar-div-2">
            <img src={message} alt="pen" width="18" />
          <p>Review queue workflows - Final release....</p>
          </div>
              <div className="right-sidebar-div-2">
             <img src={message} alt="pen" width="18" />
             <p>
            Please welcome Valued Associates: #958 - V2Blast #959 - SpencerG
             </p>
             </div>
             <div className="right-sidebar-div-2">
          <img src={blackLogo} alt="pen" width="18" />
          <p>
            Outdated Answers: accepted answer is now unpinned on Stack Overflow
          </p>
        </div>
      </div>
      <h4  className=  {`widget-h4 ${theme}`}>Hot Meta Posts</h4>
      <div className={`right-sidebar-div-1 ${theme}`}>
        <div className="right-sidebar-div-2">
          <p>38</p>
          <p>
            Why was this spam flag declined, yet the question marked as spam?
          </p>
        </div>
        <div className="right-sidebar-div-2">
          <p>20</p>
          <p>
            What is the best course of action when a user has high enough rep
            to...
          </p>
        </div>
        <div className="right-sidebar-div-2">
          <p>14</p>
          <p>Is a link to the "How to ask" help page a useful comment?</p>
        </div>
         </div>
    </div>
  )
}

export default Widget
