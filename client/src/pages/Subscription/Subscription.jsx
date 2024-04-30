import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'

 import './Subscription.css'
import SubscriptionPage from './SubscriptionPage'


const Subscription = () => {
  return (
    <div className='home-container-1'>
      <LeftSidebar />
        <div className='home-container-2'>
            <SubscriptionPage />
        </div>
    </div>
  )
}

export default Subscription
