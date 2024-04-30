import * as api from '../api';

export const sendotp =(userId,email)=>async(dispatch)=>{
  try {
    dispatch({type:'SENDING'})
    const {data}= await api.sendOtp(userId,email)
    dispatch({type:'SENT',data})
    alert('otp has been sent successfully')
  } catch (err) {
     console.log('otp error',err);
  }
}
export const verifyotp =(email,code)=> async(dispatch)=>{
    try {
        dispatch({type:'VERIFYING'})
        const {data} = await api.verifyOtp(email,code)
        console.log(data);
        if(data.verified){
             alert('valid OTP')
            dispatch({type:'VERIFIED'})
        }else{
            alert('Invalid OTP');
            dispatch({type:'UNVERIFIED'})
        }
    } catch (error) {
        console.log(error)
    }
}

