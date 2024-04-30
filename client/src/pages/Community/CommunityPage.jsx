import React from 'react'
import Post from '../../components/CommunityPage/Post'
import PostSide from '../../components/CommunityPage/PostSide'
import './Community.css';


const CommunityPage = () => {
  return (
  <div className='community-container'>
    <div className ='post-container'>
      <Post />
    </div>
    
        <div className ='post-side-container'>
            <PostSide />
        </div>
   </div>
  )
}

export default CommunityPage
