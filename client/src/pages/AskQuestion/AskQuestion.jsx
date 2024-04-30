import React,{ useState,useEffect } from 'react';
import { useDispatch,useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import "./AskQuestion.css";
import { askQuestion} from '../../actions/question'


import axios from 'axios';

const  API_ENDPOINT= `https://api.openweathermap.org/data/2.5/weather?`;
const API_KEY =`a0d24f1daae749e36ccf910fefc2aea6`;

const AskQuestion = () => {
    const [questionTitle,setQuestionTitle]= useState('');
    const [questionBody,setQuestionBody]= useState('');
    const [questionTags,setQuestionTags]= useState('');

    const [latitude, setLatitude]= useState('');
    const [longitude, setLongitude]= useState('');
    const [responseData, setResponseData]= useState('')


    const dispatch =useDispatch();
    const  User = useSelector((state)=>(state.currentUserReducer))
    const askedQuestions = useSelector((state)=>(state.questionsReducer.Asked))
    const navigate=useNavigate();

   const handleSubmit =(e)=>{
    e.preventDefault()
    //console.log({questionTitle,questionBody,questionTags})
    let asked = askedQuestions === undefined ? 0 : askedQuestions.data;
    if(User.result.subscription === 'free' && asked <1){
        dispatch(askQuestion({questionTitle,questionBody,questionTags,userPosted:User.result.name,userId:User?.result._id},navigate))
    }
    else if(User.result.subscription === 'Silver' && asked < 5){
        dispatch(askQuestion({questionTitle,questionBody,questionTags,userPosted:User.result.name,userId:User?.result._id},navigate))
    }
    else if(User.result.subscription === 'Gold'){
        dispatch(askQuestion({questionTitle,questionBody,questionTags,userPosted:User.result.name,userId:User?.result._id},navigate))
    }
    else{
        alert('You have asked maximum number of questions... plaese upgrade to silver or gold plan')
        navigate('/Subscription')
    }
   // dispatch(askQuestion({questionTitle,questionBody,questionTags,userPosted:User.result.name,userId:User?.result._id},navigate))
   }
    const handleEnter=(e)=>{
        if(e.key === 'Enter'){
            setQuestionBody(questionBody + '/n');
        }
    }
    useEffect(()=> {
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
              return 'night-ask'
            } else{
             return 'day'
           }
            
   
    }
       const theme =getTheme();
  return (
    <div className= {`ask-question ${theme}`}>
        <div className='ask-ques-container'>
            <h1>Ask a public Question</h1>
        
            <form  onSubmit ={handleSubmit} >
            
                <div className='ask-form-container'>
                    <label htmlFor='ask-ques-title'>
                        <h4>Title</h4>
                        <p>
                        Be specific and imagine you’re asking a question to another
                        person
                        </p>
                        <input type="text" id="ask-ques-title" onChange={(e)=>{setQuestionTitle(e.target.value)}} placeholder ="e.g. Is there an R function for finding the index of an element in a vector?"/>
                    </label>
                    <label htmlFor='ask-ques-body'>
                        <h4>Body</h4>
                        <p>
                        Include all the information someone would need to answer your
                        question
                        </p>
                        <textarea name ="" id="ask-ques-body" onChange={(e)=>{setQuestionBody(e.target.value)}} onKeyPress={handleEnter} cols="30" rows ="10"></textarea>
                    </label>
                    <label htmlFor="ask-ques-tags">
                        <h4>Tags</h4>
                        <p>Add up to 5 tags to describe what your question is about</p>
                        <input type="text" id="ask-ques-tags"  onChange={(e)=>{setQuestionTags(e.target.value.split(" "))}}placeholder ="e.g. (xml typescript wordpress)"/>
                    </label>
                </div>
            
                <input type="submit" value="Review your question" className="review-btn"/>
            </form>
        
        </div>
      
    </div>
  )
}

export default AskQuestion;
