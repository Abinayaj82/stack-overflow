import axios from 'axios'

const API =axios.create({baseURL:'http://localhost:5000'})

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.authorization= `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    
    };

   return req;
})
export const logIn =(authData)=> API.post('/user/login',authData);
export const signUp =(authData)=> API.post('/user/signup',authData);

export const postQuestion =(questionData) =>API.post('/questions/Ask',questionData)
export const getAllQuestions = () =>API.get('/questions/get')
export const deleteQuestion =(id)=>API.delete(`/questions/delete/${id}`)
export const voteQuestion=(id,value,userId)=>API.patch(`/questions/vote/${id}`,{value,userId})
export const askedQuestions=(id)=>API.get(`questions/asked-questions/${id}`)

export const postAnswer =(id,noOfAnswers,answerBody,userAnswered,userId)=> API.patch(`/answer/post/${id}`,{noOfAnswers,answerBody,userAnswered,userId})
export const deleteAnswer =(id,answerId,noOfAnswers)=>API.patch(`/answer/delete/${id}`,{ answerId,noOfAnswers})

export const getAllUsers =()=>API.get('/user/getAllUsers');
export const updateProfile = (id,updateData) => API.patch(`/user/update/${id}`,updateData)

export const sendOtp =(userId,email)=>API.post('/otp/send-otp',{userId,email});
export const verifyOtp =(email,code)=>API.post('/otp/verify-otp', {email,code});


export const order =(amount) =>API.post('/subscription/order' ,{amount})
export const verifyOrder =(id,amount,response) =>API.post('/subscription/verify-Order' ,{id,amount,response})
export const checkSubscription =(userId) =>API.post(`/subscription/check-Subscription/${userId}`)

//export const getPost = () =>API.get('/post/all-post')
//export const createPost = (data) =>API.post('/post/create' ,data)
//export const getUserPost = (id) =>API.get(`/post/user-post/${id}`)

//export const getTimelinePosts= (id)=> API.get(`/posts/${id}/timeline`);
export const getAllPosts= ()=> API.get('/posts/getAllPost');


export const uploadImage =(data)=> API.post('/upload', data)
export const uploadPost =(data)=>API.post('/posts',data)

export const likePost=(id, userId)=>API.put(`posts/${id}/like`, {userId: userId})