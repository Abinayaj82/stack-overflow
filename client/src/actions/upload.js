import * as api from '../api'

export const uploadImage =(data)=>async(dispatch)=>{
    try {
        await api.uploadImage(data)
    } catch (error) {
        console.log(error)
    }
}

export const uploadPost = (data)=>async(dispatch)=>{
      dispatch({type:'UPLOAD_START'})
    try {
        const newPost =  await api.uploadPost(data)
        //console.log(newPost)
        dispatch({type: 'UPLOAD_SUCCESS',data:newPost.data})
    } catch (error) {
        console.log(error)
        dispatch({type:'UPLOAD_FAILED'})
    }
}