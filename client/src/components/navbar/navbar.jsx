import React,{ useEffect,useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import decode from 'jwt-decode'
import './navbar.css';
import  { useSelector,useDispatch } from 'react-redux'
import logo from "../../assets/logo.png";
import search from "../../assets/search.svg";
import Avatar from "../../components/Avatar/Avatar";
import { setCurrentUser } from '../../actions/currentUser'
import { NavLink } from 'react-router-dom';
import globe from "../../assets/globe.svg";

import axios from 'axios';

const  API_ENDPOINT= `https://api.openweathermap.org/data/2.5/weather?`;
const API_KEY =`a0d24f1daae749e36ccf910fefc2aea6`;

const Navbar = () => {
      const dispatch =useDispatch();
      const navigate=useNavigate();

      const [latitude, setLatitude]= useState('');
      const [longitude, setLongitude]= useState('');
      const [responseData, setResponseData]= useState('')

      const[ sideBar, setSideBar] =useState(null);


      var User = useSelector((state)=>(state.currentUserReducer));

      const handleLogout =()=>{
        dispatch({type:'LOGOUT'})
        navigate('/')
        dispatch(setCurrentUser(null))
      }

      useEffect(()=>{
        const token = User?.token
        if(token){
            const decodedToken =decode(token)
            if(decodedToken.exp * 1000 < new Date().getTime()){
                handleLogout()
            }
        }
          dispatch(setCurrentUser(JSON.parse(localStorage.getItem('profile'))))
      },[dispatch])
      useEffect(()=> {
        navigator.geolocation.getCurrentPosition((position)=>{
         setLatitude(position.coords.latitude)
         setLongitude(position.coords.longitude)
   
        })
         const finalApi = `${API_ENDPOINT}lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=${API_KEY}`
        // console.log(finalApi)
             axios.get(finalApi)
   
       .then((response)=>{
            setResponseData(response.data)
          // console.log(response.data)
        })
        .catch(error=>{
            console.log(error);
        })
        
         },[latitude,longitude])
        if(!latitude)
         return <>Loading ....</>
     const getTheme =()=>{
          if(!responseData) return 'default'
             const isDay = responseData.dt > responseData.sys.sunrise && responseData.dt < responseData.sys.sunset;
   
         //const isDay = responseData.dt === 1709982899; 
            //console.log(isDay);
             if (!isDay) {
              return 'night-nav'
            } else{
             return 'day'
           }
            
   
    }
       const theme =getTheme();

     const handleSidebar=()=>{
          setSideBar(true);
     } 
     const handleSideOut =()=>{
         setSideBar(false);
     }
      

  return (
    <nav className= {`main-nav ${theme}`} >
        <div className= {`navbar ${theme}`}>
        <svg className = 'hamburger-bar' onClick ={handleSidebar}  xmlns="http://www.w3.org/2000/svg" width="16" height="16" id="menu"><path  fill="#249fe6" fill-rule="evenodd" d="M5.5 1041.361a.5.5 0 1 0 0 1h5a.5.5 0 1 0 0-1h-5zm0 3a.5.5 0 1 0 0 1h5a.5.5 0 1 0 0-1h-5zm0 3a.5.5 0 1 0 0 1h5a.5.5 0 1 0 0-1h-5z" color="#000" font-family="sans-serif" font-weight="400" overflow="visible" transform="translate(0 -1036.362)"></path></svg>
          {sideBar && 
             <div className ='sideBar-mobile'>
             <nav className='side-nav'>
              <p onClick = {handleSideOut}>X</p>
         <NavLink to ="/" className={`side-nav-links ${theme}`} activeClassname="active">
            <p>Home</p>
         </NavLink>
         <div className='side-nav-div'>
           <div>
               <p style={{marginLeft:"7px"}}>PUBLIC</p>
           </div>
           <NavLink to ="/Questions" className={`side-nav-links ${theme}`}  activeClassname="active" style={{marginLeft:"20px"}}>
            <img src={globe} alt="globe" style={{width:"18px"}} />
            <p style={{marginLeft:"7px"}}>Questions</p>
           </NavLink>
           <NavLink to ="/Tags" className={`side-nav-links ${theme}`}  activeClassname="active" style={{marginLeft:"20px"}}>
            <p>Tags</p>
           </NavLink>
           <NavLink to ="/Users" className={`side-nav-links ${theme}`}  activeClassname="active" style={{marginLeft:"20px"}}>
            <p>Users</p>
           </NavLink>
           <NavLink to ="/Subscription" className={`side-nav-links ${theme}`}  activeClassname="active" style={{marginLeft:"20px"}}>
            <p>Subscription</p>
           </NavLink>
           <NavLink to ="/Community" className={`side-nav-links ${theme}`}  activeClassname="active" style={{marginLeft:"20px"}}>
            <p>Community</p>
           </NavLink>
         </div>
         </nav> 
             </div>
          } 
          
            <Link to='/' className="nav-item nav-btn">
                <img  src={logo} alt ="logo" width ="158"  height="90px" className="logoimg"/>
            </Link>
            <Link to ='/' className={`nav-item nav-btn ${theme}`}>About</Link>
            <Link to ='/' className={`nav-item nav-btn ${theme}`}>Products</Link>
            <Link to ='/' className={`nav-item nav-btn ${theme}`}>For teams</Link>
            <form>
                <input type="text" placeholder="Search..."/>
                <img src={search} alt="search" width="16px" className="search-icon"/>
               
             </form>    
             {User === null ? (
                 <Link  to='/Auth' className='nav-item nav-links'>Log in</Link> ):
                 (<>
                    <Avatar backgroundColor='#009dff'borderRadius='50%' px='10px' py='5px' marginRight="30px"><Link to ={`/users/${User?.result?._id}`} style={{color:"white",textDecoration:"none"}}>{User.result.name.charAt(0).toUpperCase()}</Link></Avatar>
                    <button className='nav-item nav-links' onClick={handleLogout}>Log out</button>
                 </>           
           ) }  
        </div>

      
    </nav>
  )
}

export default Navbar
