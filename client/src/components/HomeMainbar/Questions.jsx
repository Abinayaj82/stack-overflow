import React ,{ useState ,useEffect} from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import axios from 'axios';

const  API_ENDPOINT= `https://api.openweathermap.org/data/2.5/weather?`;
const API_KEY =`a0d24f1daae749e36ccf910fefc2aea6`;



const Questions = ({question}) => {
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
         return 'display-question-container-night'
       } 
        else{
         return 'day'
       }
       

}
  const theme =getTheme();
  return (
    <div className={`display-question-container ${theme}`}>
        <div className='display-votes-ans'>
        <p>{question.upVote.length - question.downVote.length}</p>
        <p>Votes</p>
        </div>
        <div className='display-votes-ans'>
           <p>{question.noOfAnswers}</p>
           <p>Answers</p>
        </div>
        <div className='display-question-details'>
            <Link to={`/Questions/${question._id}`} className='question-title-link'>{question.questionTitle}</Link>
           <div className='display-tags-time'>
            <div className= 'display-tags'>
                {
                    question.questionTags.map((tag)=> (
                           <p key={tag}>{tag}</p>
                    ))
                }
            </div>
            <p className='display-time'>
                 Asked {moment(question.askedOn).fromNow()} by {question.userPosted}
            </p>
           </div>
        </div>
      
    </div>
    
  )
}

export default Questions
