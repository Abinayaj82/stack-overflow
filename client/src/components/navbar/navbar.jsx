import React,{ useEffect } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import decode from 'jwt-decode'
import './navbar.css';
import  { useSelector,useDispatch } from 'react-redux'
import logo from "../../assets/logo.png";
import search from "../../assets/search.svg";
import Avatar from "../../components/Avatar/Avatar";
import { setCurrentUser } from '../../actions/currentUser'




const Navbar = () => {
      const dispatch =useDispatch();
      const navigate=useNavigate();
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

  return (
    <nav className="main-nav">
        <div className='navbar'>
            <Link to='/' className="nav-item nav-btn">
                <img src={logo} alt ="logo" width ="158"  height="90px" className="logoimg"/>
            </Link>
            <Link to ='/' className='nav-item nav-btn'>About</Link>
            <Link to ='/' className='nav-item nav-btn'>Products</Link>
            <Link to ='/' className='nav-item nav-btn'>For teams</Link>
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
