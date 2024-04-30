import React from 'react'
import InputPost from './InputPost'
import SharedPost from './SharedPost'
import './PostComponent.css'

const Post = () => {
  return (
    <div className = 'post'>
      <div className = 'input-post'>
         <InputPost/>
      </div>
      <div className = 'shared-post'>
         <SharedPost />
      </div>
    </div>
  )
}

export default Post
