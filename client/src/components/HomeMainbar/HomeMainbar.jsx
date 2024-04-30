import React from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import "./HomeMainbar.css";
import QuestionList from './QuestionList'
import { useSelector } from 'react-redux';


const HomeMainbar = () => {
  const location=useLocation()
  const user= null;
  const navigate = useNavigate();

  const questionsList =useSelector((state)=>state.questionsReducer)
 // console.log(questionsList);

  const checkAuth =()=>{
    if(user===1){
      alert("Login or signup to ask a question");
      navigate("/auth");
    }else{
      navigate("/AskQuestion");
    }
  };

 
  /*  var questionsList =[{
      _id:1,
      votes:3,
      noOfAnswers:2,
      questionTitle:"What is a function",
      questionBode:"It meant to be",
      questionTags:["java","node js","react js","mongo db"],
      userPosted:"Abi",
      userId:1,
      askedOn:"jan 1",
      answer:[{
        answerBody:"answer",
        userAnswered:"kumar",
        answeredOn:"Jan 2",
        userId:2,
      }]
    },{
      _id:2,
      votes:0,
      noOfAnswers:2,
      questionTitle:"What is a function",
      questionBode:"It meant to be",
      questionTags:["javscript","python"],
      userPosted:"Abi",
      userId:1,
      askedOn:"jan 1",
      answer:[{
        answerBody:"answer",
        userAnswered:"kumar",
        answeredOn:"Jan 2",
        userId:2,
      }]
    },{
      _id:3,
      votes:1,
      noOfAnswers:0,
      questionTitle:"What is a function",
      questionBode:"It meant to be",
      questionTags:["javscript","python"],
      userPosted:"Abi",
      userId:1,
      askedOn:"jan 1",
      answer:[{
        answerBody:"answer",
        userAnswered:"kumar",
        answeredOn:"Jan 2",
        userId:2,
      }]

    }]*/
   
  return (
    <div className="main-bar">
         <div className="main-bar-header">
             {location.pathname==="/" ?<h1>Top Question</h1>:<h1>All Question</h1>}
        
         <button onClick={checkAuth} className='ask-btn'>Ask Question</button>
         </div>
         <div>
          {
            questionsList.data===null?
            <h1>Loading...</h1>:
            <>
              <p>{questionsList.data.length} questions</p>
              <QuestionList questionsList ={questionsList.data} />
                  
              
            </>
          }
         </div>
    </div>
 
  )
}

export default HomeMainbar
