import React,{useState} from 'react'
import axios from 'axios';

const MessageScreen = ({onClose}) => {
  const [value,setValue] = useState()
  const [message,setMessage] = useState()
  const[preview,setPreview] =useState();

  
const handleMessageSend =(e)=>{
  e.preventDefault();
     const options = {
      method: 'POST',
      url: 'https://api.edenai.run/v2/text/code_generation',
      headers: {
          authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYjU4OTU5NWEtOWZkOS00Y2RlLWJiZmUtZGM4YjZiOGQ5OTE0IiwidHlwZSI6ImFwaV90b2tlbiJ9.yrypfPp5XI3UZzTGYFZR2YXvQOyi2TsnF0EHcDzdHkk",
     },
      data: {
          providers: "openai",
          prompt: "",
          instruction: value,
          temperature: 0.1,
          max_tokens: 500,
          fallback_providers: "",
     }
    };
    
        
   
    // console.log(message,"message")
    
     axios
  .request(options)
  .then((response)=>{
    const result = response.data
      setMessage(result.openai.generated_text)
      setPreview(value)
      setValue(" ");

})



  .catch(err => console.error(err));

     //setMessage(results.data);
     //console.log(value)
    
     


}

  return (
    <div className='message-screen'>
       <button  className='close-btn' onClick={onClose}> X </button>
       <div className='msg-heading'>
            <div className ='div-p'> Hii! Glad to answer your programming related questions.</div>
       </div>
       <div className ="message-box">
          <div className= 'msg-preview-div'>
          
           <p className="msg-preview">{preview}</p>
           </div>
           <div className ='chat-preview'>
          <p className='chat-preview-p'>{JSON.stringify(message)}</p>
          </div>
       </div>
       <div className='input-div'>
       <input type ="text" className='message-input' onChange={(e)=>setValue(e.target.value)} ></input>
       <button className='send-btn' onClick={handleMessageSend} >Send</button>
       </div>
    
    </div>
  )
}

export default MessageScreen
