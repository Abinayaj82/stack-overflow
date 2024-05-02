import React,{useState} from 'react'
import { useSelector } from 'react-redux';
import './PostComponent.css';
import { likePost } from "../../api";
import moment from 'moment';

const PostData = ({data}) => {
  const User = useSelector((state)=>state.currentUserReducer)
 const [liked, setLiked] = useState(data.likes.includes(User?.result._id));
  const [likes, setLikes] = useState(data.likes.length)

  const handleLike = () => {
    likePost(data._id, User?.result._id);
    setLiked((prev) => !prev);
    liked? setLikes((prev)=>prev-1): setLikes((prev)=>prev+1)
  };
  return (
    <div className='post-div'>
      <div className ='avatar-div'>
        <div className ='avatar-p'>
         <p>{ data?.name.charAt(0).toUpperCase()}</p>
         </div>
       <div>
          <b>{data?.name} </b>
          <p className='post-time'>Posted {moment(data.createdAt).fromNow()}</p>
      </div>
        </div>
        <span>{data.desc}</span>

     {data?.avatar ?
     <img className='post-image'
     //src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
     src={data.avatar}
     alt=""
   /> :
      <video src ={data.avatar} controls />

    }
      
      <div>
        <div className ='post-react'>
        <svg onClick={handleLike} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="heart"><path fill="#222225" d="M20.16,5A6.29,6.29,0,0,0,12,4.36a6.27,6.27,0,0,0-8.16,9.48l6.21,6.22a2.78,2.78,0,0,0,3.9,0l6.21-6.22A6.27,6.27,0,0,0,20.16,5Zm-1.41,7.46-6.21,6.21a.76.76,0,0,1-1.08,0L5.25,12.43a4.29,4.29,0,0,1,0-6,4.27,4.27,0,0,1,6,0,1,1,0,0,0,1.42,0,4.27,4.27,0,0,1,6,0A4.29,4.29,0,0,1,18.75,12.43Z"></path></svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="comment-alt-message"><path fill="#222225" d="M17,7H7A1,1,0,0,0,7,9H17a1,1,0,0,0,0-2Zm0,4H7a1,1,0,0,0,0,2H17a1,1,0,0,0,0-2Zm2-9H5A3,3,0,0,0,2,5V15a3,3,0,0,0,3,3H16.59l3.7,3.71A1,1,0,0,0,21,22a.84.84,0,0,0,.38-.08A1,1,0,0,0,22,21V5A3,3,0,0,0,19,2Zm1,16.59-2.29-2.3A1,1,0,0,0,17,16H5a1,1,0,0,1-1-1V5A1,1,0,0,1,5,4H19a1,1,0,0,1,1,1Z"></path></svg>
        <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" id="share"><path fill="#222225" d="m21.707 11.293-8-8A1 1 0 0 0 12 4v3.545A11.015 11.015 0 0 0 2 18.5V20a1 1 0 0 0 1.784.62 11.456 11.456 0 0 1 7.887-4.049c.05-.006.175-.016.329-.026V20a1 1 0 0 0 1.707.707l8-8a1 1 0 0 0 0-1.414ZM14 17.586V15.5a1 1 0 0 0-1-1c-.255 0-1.296.05-1.562.085a14.005 14.005 0 0 0-7.386 2.948A9.013 9.013 0 0 1 13 9.5a1 1 0 0 0 1-1V6.414L19.586 12Z"></path></svg>
        </div>
        <p>{likes} Likes</p>
       
       
      </div>
    </div>
  )
}

export default PostData
