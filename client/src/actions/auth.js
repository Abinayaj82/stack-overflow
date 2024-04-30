 import * as api from '../api'
import { setCurrentUser } from './currentUser'

export const signup =(authData,navigate)=>async(dispatch)=>{// this signup export it to the Auth.jsx 
    try{
        const {data} =await api.signUp(authData)// this signUp is from api folder
        dispatch({type:'AUTH',data})
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('profile'))))
        navigate('/')
    }catch(error){
       console.log(error)
    }
}
export const login =(authData,navigate)=>async(dispatch)=>{
    try{
        const {data} =await api.logIn(authData)
        dispatch({type:'AUTH',data})
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('profile'))))
        navigate('/')
    }catch(error){
       console.log(error)
    }
}


