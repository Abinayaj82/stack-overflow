import React,{ useState,useEffect} from 'react'

import axios from 'axios';
const  API_ENDPOINT= `https://api.openweathermap.org/data/2.5/weather?`;
const API_KEY =`a0d24f1daae749e36ccf910fefc2aea6`;


const WidgetTags = () => {
    const tags=[ "c",
    "css",
    "express",
    "firebase",
    "html",
    "java",
    "javascript",
    "mern",
    "mongodb",
    "mysql",
    "next.js",
    "node.js",
    "php",
    "python",
    "reactjs",
  ];
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
           return 'widget-night'
         } 
          else{
           return 'day'
         }
         
  
  }
    const theme =getTheme();
  return (
    <div className={`widget-tag ${theme}`}>
       <h4 className= {`widget-h4 ${theme}`}>Wached Tags</h4>
      <div className="widget-tag-div">
           {tags.map((tag)=>(
               <p key={tag}>{tag}</p>
           )
          
          ) }

      </div>
      
    </div>
  )
}

export default WidgetTags
