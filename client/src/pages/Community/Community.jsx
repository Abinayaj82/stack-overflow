import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import CommunityPage from './CommunityPage'

import './Community.css'

const Community = () => {
  
  return (
    <div className= 'home-container-1'>
         <LeftSidebar />
         <div className='home-container-2'>
             <CommunityPage />
         </div>
    </div>
  )
}

export default Community
