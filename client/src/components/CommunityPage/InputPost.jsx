import React,{useState,useRef} from 'react'
import Avatar from "../../components/Avatar/Avatar";
import { Link} from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import './PostComponent.css';
import { uploadImage, uploadPost } from '../../actions/upload';
import {useNavigate} from 'react-router-dom'

const InputPost = () => {
    var User = useSelector((state)=>(state.currentUserReducer));
   // console.log(User)
    const [ image,setImage] = useState(null)
    const [ video, setVideo] = useState(null)

    const imageRef = useRef();
    const videoRef = useRef()
    const desc = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onImageChange =(event)=>{
       if(event.target.files && event.target.files[0]){
        let img = event.target.files[0]
        setImage(img)
       }
    }
    const onVideoChange =(event)=>{
      if(event.target.files && event.target.files[0]){
       let vid = event.target.files[0]
       setVideo(vid)
      }
   }
   

    const handleUpload =(e)=>{
       e.preventDefault();
       if(User === null){
         alert('Login or SignUp to continue')
         navigate('/auth')
       }
       const newPost ={
        userId :User?.result._id,
        name:User?.result?.name,
        desc : desc.current.value
        
       }
       if(image){
        const data = new FormData();
        const fileName = Date.now() + image.name;
        data.append("name", fileName);
        data.append("file", image);
        newPost.image = fileName;
        console.log(newPost);
        try {
           dispatch(uploadImage(data));
        } catch (error) {
           console.log(error)
        }
       }else{
        const data = new FormData();
        const fileName = Date.now() + video.name;
        data.append("name", fileName);
        data.append("file", video);
        newPost.video = fileName;
        console.log(newPost);
        try {
           dispatch(uploadImage(data));
        } catch (error) {
           console.log(error)
        }
       }
       dispatch(uploadPost(newPost))
       resetShare()
    }
    const resetShare = () => {
      setImage(null)
      setVideo(null)
      desc.current.value = "";
    };
  return (
    <div className='input-container'>
      <div className= 'avatar-input'>
        <div className='avatar'>
          {User === null ? (<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 120 120" viewBox="0 0 120 120" id="profil-photo"><circle cx="60" cy="60" r="47.6" fill="#b6d9ff"></circle><path fill="#566eff" d="M107.6,58c-1.1,0-2,0.9-2,2c0,25.1-20.5,45.6-45.6,45.6c-25.1,0-45.6-20.5-45.6-45.6
		c0-25.1,20.5-45.6,45.6-45.6c18.8,0,35.4,11.3,42.4,28.7c0.4,1,1.6,1.5,2.6,1.1c1-0.4,1.5-1.6,1.1-2.6C98.5,22.6,80.4,10.4,60,10.4
		c-27.3,0-49.6,22.2-49.6,49.6s22.2,49.6,49.6,49.6s49.6-22.2,49.6-49.6C109.6,58.9,108.7,58,107.6,58z"></path><circle cx="59.9" cy="46.2" r="13.3" fill="#566eff"></circle><path fill="#566eff" d="M29.5,82v1.1c0,2.2,1.8,4,4,4h52.9c2.2,0,4-1.8,4-4V82c-5.5-11.2-17.1-19.1-30.5-19.1
		C46.5,62.9,34.9,70.6,29.5,82z"></path></svg>):
    (
      <Avatar backgroundColor='#009dff'  borderRadius='50%' px='11px' py= '6px' marginRight="30px"><Link to ={`/users/${User?.result?._id}`} style={{color:"white",textDecoration:"none"}}>{User?.result?.name.charAt(0).toUpperCase()}</Link></Avatar>

    )}
        </div>
        <div className='input-box'>
           <input type ='text' placeholder='Post something....' ref ={desc} />
        
        </div>
        </div>  
        <div className='post-options'>
              <div className='option' onClick={()=>imageRef.current.click()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" version="1" id="gallary"><path fill="#24c4bc" fill-rule="evenodd" d="M32 16c0 8.824-7.176 16-16.053 16S0 24.824 0 16 7.123 0 16 0c8.877 0 16 7.176 16 16z" clip-rule="evenodd"></path><path fill="#249eb2" d="M17.469 31.846c.574-.055 1.162-.059 1.717-.172a16.04 16.04 0 0 0 8.117-4.365 16.1 16.1 0 0 0 3.437-5.086c.406-.957.72-1.962.934-3.002.12-.59.13-1.212.183-1.823L24.191 9.73l-.011-.01-.002-.001-.004-.002a1.3 1.3 0 0 0-.406-.268l-.004-.002a1.344 1.344 0 0 0-.51-.097H10.17a1.347 1.347 0 0 0-1.315 1.093h-.054c-.767 0-1.367.603-1.367 1.315v8.156l.496.496-.442.27v.658a1.249 1.249 0 0 0 .104.498c.027.062.077.11.113.168.053.083.096.174.166.244l.014.014 9.584 9.584z"></path><path fill="#fff" d="M10.17 9.349c-.657 0-1.204.492-1.314 1.095h-.055c-.766 0-1.368.602-1.368 1.313v8.157l5.09-3.12c.11-.11.33-.055.384.11l.985 1.915 4.106-3.12c.164-.11.383 0 .438.164l.438 1.807 4.489-2.409v-3.504c0-.711-.602-1.313-1.369-1.313H9.404a.773.773 0 0 1 .766-.548h12.974c.438 0 .766.329.766.821v8.923a.773.773 0 0 1-.547.767v-4.434l-4.544 2.463c-.164.11-.383 0-.383-.164l-.438-1.807-4.05 3.066c-.11.11-.33.055-.384-.055l-.985-1.916-5.092 3.12v.657c0 .712.603 1.314 1.369 1.314h13.248c.712 0 1.368-.602 1.368-1.314v-.273a1.351 1.351 0 0 0 1.095-1.314v-9.087c0-.767-.602-1.314-1.314-1.314H10.17zm1.095 3.23c.766 0 1.368.602 1.368 1.368 0 .767-.602 1.369-1.368 1.369a1.355 1.355 0 0 1-1.369-1.369c0-.712.602-1.368 1.369-1.368zm0 .547a.842.842 0 0 0-.821.821c0 .493.383.821.82.821a.806.806 0 0 0 .822-.82.806.806 0 0 0-.821-.822z"></path></svg>
               Photo
              </div>
              <div className='option' onClick={()=>videoRef.current.click()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" version="1" id="camera"><path fill="#ffcc0f" fill-rule="evenodd" d="M32 16c0 8.824-7.176 16-16 16S0 24.824 0 16 7.176 0 16 0s16 7.176 16 16z" clip-rule="evenodd"></path><path fill="#ffa720" d="M19.826 31.484c.819-.202 1.633-.42 2.397-.744a16.12 16.12 0 0 0 8.518-8.518c.405-.956.72-1.96.933-3.001.098-.477.096-.985.15-1.477l-9.623-9.621-.012-.014c-.059-.059-.127-.108-.193-.16-.034-.026-.064-.057-.1-.082l-.005-.004a2.013 2.013 0 0 0-.334-.183h-.002c-.054-.023-.112-.037-.168-.055-.073-.024-.143-.053-.219-.068a2.026 2.026 0 0 0-.41-.041c-.998 0-1.804.682-1.99 1.617-.007.034-.005.07-.01.105l-1.115-1.115-.014-.014a2.043 2.043 0 0 0-.254-.21c-.012-.009-.021-.02-.033-.028h-.002a2.031 2.031 0 0 0-.3-.168c-.016-.007-.029-.017-.044-.023h-.002c-.065-.029-.136-.045-.205-.067-.059-.018-.114-.044-.176-.056h-.004a2.026 2.026 0 0 0-.41-.041 2.01 2.01 0 0 0-1.982 2.466c.01.047.029.089.043.133.028.09.058.18.1.264.02.043.048.082.072.123.044.076.09.15.144.22.035.046.073.089.111.132.034.037.062.077.098.113l.117.117h-.984c-.694 0-1.238.544-1.238 1.238v.793l.496.496h-.117l-.913-.91-.013-.015a.371.371 0 0 0-.098-.065l-3.43-1.96-.09-.09c-.01-.011-.022-.013-.033-.02-.01-.007-.016-.014-.027-.018-.034-.014-.065-.016-.088.006-.099.05-.199.149-.199.248v8.97c0 .045.025.088.06.126.003.003.003.007.006.01l11.592 11.591z"></path><path fill="#fff" d="M16.198 7.515a2.01 2.01 0 0 0-2.032 2.032c0 .645.297 1.14.744 1.537h-.992c-.694 0-1.239.545-1.239 1.239v.793h11.152v-.793c0-.694-.545-1.24-1.239-1.24h-.545c.446-.346.743-.891.743-1.536 0-1.09-.892-2.032-2.032-2.032a2.01 2.01 0 0 0-2.032 2.032c0 .645.297 1.14.744 1.537h-1.983c.446-.347.743-.892.743-1.537 0-1.09-.892-2.032-2.032-2.032zm0 1.04c.545 0 .992.447.992.992a.994.994 0 0 1-.992.992.994.994 0 0 1-.991-.992c0-.545.446-.991.991-.991zm4.56 0c.546 0 1.041.447 1.041.992 0 .545-.446.992-1.04.992a.994.994 0 0 1-.992-.992c0-.545.446-.991.991-.991zm-4.56.497c-.297 0-.495.198-.495.495 0 .298.198.496.495.496a.497.497 0 0 0 0-.991zm4.56 0c-.297 0-.495.198-.495.495 0 .298.198.496.495.496a.497.497 0 0 0 0-.991zM8.367 10.539c-.1.05-.198.148-.198.247v8.972c0 .148.247.297.396.198l3.47-1.983c.099-.05.148-.148.148-.198V12.82c0-.1-.05-.15-.148-.199l-3.47-1.982c-.05-.1-.149-.15-.198-.1zm4.312 3.073v4.014h11.152v-4.014H12.68zm0 4.56c.1.594.644 1.04 1.24 1.04h.743v.744c0 .149.148.248.248.248h1.685l-1.388 3.915c-.05.15 0 .298.149.347.148.05.297-.05.347-.198l1.437-4.064h2.627l1.636 4.114c.05.148.198.198.347.148.099-.05.198-.198.148-.347l-1.586-3.915h1.685c.15 0 .248-.1.248-.248v-.744h.298c.594 0 1.09-.446 1.19-1.04H12.678z"></path></svg>
                Video
              </div>
              <div className='option'>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" version="1" id="camera"><path fill="#f37a5d" fill-rule="evenodd" d="M32 16c0 8.824-7.176 16-16 16S0 24.824 0 16 7.176 0 16 0s16 7.176 16 16z" clip-rule="evenodd"></path><path fill="#f35c4b" d="M16.877 31.91c.792-.044 1.586-.08 2.344-.236a15.868 15.868 0 0 0 5.718-2.41 16.12 16.12 0 0 0 5.801-7.041c.406-.957.72-1.962.934-3.002.012-.059.006-.123.017-.182l-9.748-9.748-.013-.014c-.08-.08-.181-.135-.282-.191-.033-.019-.058-.049-.093-.065l-.004-.001a1.198 1.198 0 0 0-.48-.1h-4.137l-.059-.059c-.641 0-1.225.526-1.225 1.225 0 .162.035.319.096.465.027.064.077.113.113.172.048.074.085.155.147.218.003.004.004.009.008.012l.697.695-.244.245H12.89l-1.145-1.145-.014-.014c-.063-.063-.147-.103-.224-.152-.054-.034-.097-.08-.156-.105l-.002-.002a1.197 1.197 0 0 0-.225-.073h-.004a1.224 1.224 0 0 0-.248-.025H9.648a1.23 1.23 0 0 0-1.222 1.225c0 .116.056.233.056.35-.757.116-1.28.755-1.28 1.513v8.158c0 .408.174.786.45 1.063l9.225 9.224z"></path><path fill="#fff" d="M16.874 8.862a1.23 1.23 0 0 0-1.224 1.224 1.23 1.23 0 0 0 1.224 1.223h.175l-.583.583h-4.428c.058-.117.058-.175.058-.291a1.23 1.23 0 0 0-1.224-1.224H9.65a1.23 1.23 0 0 0-1.224 1.224c0 .116.058.233.058.35-.757.116-1.282.757-1.282 1.514v8.158c0 .816.7 1.515 1.515 1.515h14.568c.815 0 1.515-.7 1.515-1.515v-8.158c0-.815-.641-1.515-1.515-1.515h-1.748l-.641-.582h.174a1.23 1.23 0 0 0 1.224-1.224A1.23 1.23 0 0 0 21.07 8.92h-4.195v-.058zm-7.225 2.04h1.223c.35 0 .641.29.641.582a.445.445 0 0 1-.116.291H9.182c-.058-.058-.058-.174-.058-.29-.116-.292.175-.584.525-.584zm.874 2.447a1.23 1.23 0 0 1 1.223 1.223 1.23 1.23 0 0 1-1.223 1.224 1.23 1.23 0 0 1-1.224-1.224c0-.64.583-1.223 1.224-1.223zm0 .64a.584.584 0 0 0-.583.583c0 .292.291.583.583.583.35 0 .64-.291.64-.583 0-.29-.29-.582-.64-.582zm9.964.875c1.69 0 2.971 1.34 2.971 3.03 0 1.631-1.34 3.03-2.971 3.03a3.01 3.01 0 0 1-3.03-3.03 3.01 3.01 0 0 1 3.03-3.03zm0 1.515c-.816 0-1.515.699-1.515 1.515s.699 1.515 1.515 1.515 1.515-.7 1.515-1.515c0-.816-.7-1.515-1.515-1.515z"></path></svg>
                Camera
              </div>
              <button className='post-share-btn' onClick={handleUpload} >
                Share
                </button>
              <div style={{ display: "none" }}>
            <input type="file" ref={imageRef} onChange={onImageChange} />
            <input type="file"  ref={videoRef} onChange={onVideoChange} />

          </div>
        </div>
        {image && (
          <div className='display-img' >
            <img className ='display-img' src={URL.createObjectURL(image)} alt="preview" />
          </div>
        )}
        {video && (
          <div className='display-video'>
          <video controls>
          <source src={URL.createObjectURL(video)} type="video/mp4" alt ="preview"/>
        </video>
        </div>
        )}
       
    </div>

  )
}

export default InputPost
