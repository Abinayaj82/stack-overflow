import React from 'react'
import { handleSubscription } from '../../actions/subscription'
import { useDispatch,useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';

const SubscriptionPage = () => {
    const User = useSelector((state)=>state.currentUserReducer)
     const dispatch = useDispatch()
     const navigate = useNavigate()

     const handlePayment = async (amount) =>{
         if(User === null){
            alert('Login or Signup to continue')
            navigate('/Auth')
         }
         else{
            dispatch(handleSubscription(User.result._id, amount))
         }
     }

  return (
    <div className = 'subscription-div'>
        <h1>Subscription</h1>
        <h2>Choose your plan</h2>
        <div className= 'pricing'>
            <div className = 'pricing-card'>
                <h4>Free Plan</h4>
                <div className= 'price'><span>₹</span><span> 0</span><span>  per Month</span></div>
                <p> Free plan can post 1 question per day</p>
                <button className='order-btn' onClick = {()=>handlePayment(0)}>Order now</button>
            </div>
            <div className = 'pricing-card'>
                <h4>Silver Plan</h4>
                <div className= 'price'><span>₹</span><span> 100</span><span>  per Month</span></div>
                <p> Silver plan can post 5 question per day</p>
                <button className='order-btn'onClick = {()=>handlePayment(100)}>Order now</button>
            </div>
            <div className = 'pricing-card'>
                <h4>Gold Plan</h4>
                <div className= 'price'><span>₹</span><span> 1000</span><span>  per Month</span></div>
                <p> Gold plan can post unlimited question per day</p>
                <button className ='order-btn-1'onClick = {()=>handlePayment(1000)}>Order now</button>
            </div>
        </div>
    </div>
  )
}

export default SubscriptionPage
