import React,{useState,useEffect} from 'react'
import './Tags.css'
import axios from 'axios';

const  API_ENDPOINT= `https://api.openweathermap.org/data/2.5/weather?`;
const API_KEY =`a0d24f1daae749e36ccf910fefc2aea6`;

const TagsList = ({tag}) => {
  const [latitude, setLatitude]= useState('');
   const [longitude, setLongitude]= useState('');
   const [responseData, setResponseData]= useState('')
      //console.log(latitude)
 
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
           return 'night-tag'
         } else{
          return 'day'
        }
         

 }
    const theme =getTheme();
  return (
    <div className='tag'>
      <h5 className ='tag-h5'>{tag.tagName}</h5>
      <p className ={ `tag-p  ${theme}`}>{tag.tagDesc}</p>
    </div>
  )
}

export default TagsList
