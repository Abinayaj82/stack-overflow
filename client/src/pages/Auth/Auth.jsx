import React, { useState,useEffect } from "react";
import icon from "../../assets/stack-overflow.png";
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import "./Auth.css";
import AboutAuth from "./AboutAuth";
import { signup , login} from '../../actions/auth'

import axios from 'axios';

const  API_ENDPOINT= `https://api.openweathermap.org/data/2.5/weather?`;
const API_KEY =`a0d24f1daae749e36ccf910fefc2aea6`;

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");  
  const [password, setPassword] = useState("");  

  
  const dispatch =useDispatch();
  const navigate = useNavigate();
  const handleSwitch =() =>{
  setIsSignup(!isSignup);
  setName("");
  setEmail("");
  setPassword("");
 } 
 const handleSubmit =(e)=>{
  e.preventDefault()
  if(!email && !password){
    alert('Enter email and password')
  }
  if(isSignup){
    if(!name){
      alert("Enter a name to continue")
    }
    dispatch(signup({name, email,password},navigate))
  }else{
   dispatch(login({email,password},navigate))
  }
  console.log({name,email,password});
 }
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
          return 'night-auth'
        } else{
         return 'day'
       }
        

}
   const theme =getTheme();

  
  return (
    <section className={`auth-section ${theme}`}>
       { isSignup && <AboutAuth />}
      <div className={`auth-container-2 ${theme}`}>
           { !isSignup && <img src={icon} alt="stack over flow" className='login-logo'/>}
           <form onSubmit={handleSubmit}>
               {
                isSignup && (
                  <label htmlFor="name">
                    <h4>Display name</h4>
                    <input type ="text" id="name" name="name" value={name} onChange={(e)=>{
                      setName(e.target.value);
                    }}
                  />
                     
                  </label>
                )
               }
               <label htmlFor='email'>
                   <h4>Email</h4>
                   <input type="email" name="email" id="email"  value={email} onChange={(e)=>{
                      setEmail(e.target.value);
                    }}/>
               </label>
               <label htmlFor='password'>
                 <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}} >
                   <h4>Password</h4>
                   { !isSignup && <p style={{fontSize:"13px"}}>Forgot password</p>}
                   </div>
                   <input type="password" name="password" id="password" value={password} onChange={(e)=>{
                      setPassword(e.target.value);
                    }}/>
                   { isSignup && <p style={{color:'#666767',fontSize:'13px',width:'80%',marginLeft:'20px'}}>
                                    Passwords must contain atleast eight characters
                                    including atleast 1 letter and
                                    1 number <br /></p>}
               </label>
               {
                isSignup && (
                  <label htmlFor='check'>
                    <input type ="checkbox" id="check"/>
                    <p style={{fontSize:'13px'}}>Opt-in to receive occasional product updates,
                                   user research invitations, company announcements, and digests.</p>
                  </label>
                )
               }
               <button type = 'submit' className='auth-btn'>{isSignup ? 'Sign up':'Log in'}</button>
               {
                isSignup && (
                  <p style={{color:'#666767',fontSize:'13px',marginLeft:'20px'}}>By clicking “Sign up”, you agree to our <span style={{color:'#007ac6'}}> terms of service </span>,
                                <span style={{color:'#007ac6'}}>privacy policy</span> and <span style={{color:'#007ac6'}}>cookie policy</span>
                  </p>
                )
               }
           </form>
           <p>
            { isSignup ? "Already have an account?":"Don't have an account?" }
            <button type='button' className='handle-switch-btn' onClick={handleSwitch}>
                { isSignup ? "Log in": "Sign up"} </button>
           </p>
      </div>
    </section>
  );
};

export default Auth;
