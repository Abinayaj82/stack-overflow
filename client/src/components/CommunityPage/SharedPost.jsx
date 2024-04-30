import React,{useEffect} from 'react'
import { getAllPosts } from '../../actions/post'
import {useSelector,useDispatch} from 'react-redux'
import PostData from './PostData';
import './PostComponent.css'

const SharedPost = () => {
  const dispatch = useDispatch();
  let  posts = useSelector((state)=>state.postReducer);
  //console.log(posts);
  const postList = posts.data
  console.log(postList);
  useEffect(() => {
    dispatch(getAllPosts())
},[]);
   
  if(!posts) return 'No Posts';

  return (
    <div className='shared-post-div'>
      { postList === null
        ? "Fetching posts...."
        : postList?.map((post, id) => {
            return <PostData data={post} key={id} />;
          })}
    </div>
  )
}

export default SharedPost
