import React, {useState} from 'react'
import chatBot from '../../assets/chat-bot.png';
import './ChatBot.css'; 
import Otp from './Otp';
import MessageScreen from './MessageScreen';
import { useSelector } from 'react-redux';

const ChatBotMain = () => {
  const otpState = useSelector((state)=>state.otpReducer)
  const [showOtpScreen,setShowOtpScreen] =useState(false);
  const [showMsgScreen,setShowMsgScreen] =useState(false);

   const handleClick =()=>{
      setShowOtpScreen(true)
      setShowMsgScreen(true)


   }
    const handleClose =()=>{
        setShowOtpScreen(false)

   }
   const handleMsgClose=()=>{
      setShowMsgScreen(false)
   }
    

  return (
    <div className= 'chat-img'>
        <img src={chatBot} alt='chat bot' style ={{width:'50px', height:'55px'}} onClick={handleClick}/>
        
         {otpState?.verified === 1 ? (
          <div>
             { showMsgScreen && <MessageScreen onClose={handleMsgClose}/> }
          </div>
         ) : (
          <div>
            { showOtpScreen && <Otp onClickMessage={handleClose} />}
          </div>
         )}
          
          </div>
  )
}

export default ChatBotMain
