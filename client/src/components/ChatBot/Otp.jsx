import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {   sendotp, verifyotp } from '../../actions/otp';
import './ChatBot.css';
import { useNavigate } from 'react-router-dom';
const Otp = ({onClickMessage}) => {
    const [otp, setOtp] = useState('');
    const [email,setEmail] =useState('');

    const navigate = useNavigate();
    const dispatch =useDispatch();
    const otpState = useSelector((state)=>state.otpReducer);
    const currentUser = useSelector((state) => state.currentUserReducer);
    const User = useSelector((state)=>state.currentUserReducer);
    //console.log(currentUser)

     const handleGenerateOtp =(e)=>{
      e.preventDefault();
        if (!currentUser) {    
            alert('Login or signup to continue')
        }else
           dispatch(sendotp(User?.result._id,email))
     }
     const handleVerifyOtp = (e)=>{
        e.preventDefault();
        dispatch(verifyotp(User?.result.email,otp,navigate))
       
      }  
     
   
   return (
    <div className='otp-container'>
      <button className='close-otp' onClick={onClickMessage}>X</button>
      
      <p className='para-email'> Please enter email address to get OTP</p>
      
      <input className='otp-container-input'type='email' placeholder='Enter email address'  onChange={(e) => setEmail(e.target.value)}></input>
      <button className ="otp-container-button" onClick={handleGenerateOtp}>Send OTP</button>
      <p className='para-otp'> Enter OTP </p>
      <input className='otp-container-input' type ='number' placeholder='Enter OTP' onChange={(e)=>setOtp(e.target.value)}></input>
      <button className='otp-verify-button' onClick ={handleVerifyOtp}>
      {otpState?.sending === true ? 
       "Sending..." 
       : (
        otpState?.verify ? (
         <p>Verifying....</p>
        ) : (
          <p> Verify</p>
)
      )}
     
      </button>
      
  </div>
  )
}

export default Otp
