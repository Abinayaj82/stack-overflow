import './App.css';
import Navbar from "./components/navbar/navbar";
import AllRoutes from "./AllRoutes";
import { useEffect,useState} from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import { fetchAllQuestions } from './actions/question';
import { fetchAllUsers } from './actions/users';


import axios from 'axios';

const  API_ENDPOINT= `https://api.openweathermap.org/data/2.5/weather?`;
const API_KEY =`a0d24f1daae749e36ccf910fefc2aea6`;

function App() {
  const dispatch =useDispatch()
  
   const [latitude, setLatitude]= useState('');
   const [longitude, setLongitude]= useState('');
   const [responseData, setResponseData]= useState('')
      //console.log(latitude)
  useEffect(() => {
  dispatch(fetchAllQuestions())
  dispatch(fetchAllUsers())
   }, [dispatch])
    useEffect(()=> {
     navigator.geolocation.getCurrentPosition((position)=>{
      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)

     })
      const finalApi = `${API_ENDPOINT}lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=${API_KEY}`
      //console.log(finalApi)
          axios.get(finalApi)

    .then((response)=>{
         setResponseData(response.data)
        console.log(response.data)
     })
     .catch(error=>{
         console.log(error);
     })
     
      },[latitude,longitude])
     if(!latitude)
      return <>Allow location access and reload the page to open website</>
  const getTheme =()=>{
       if(!responseData) return 'default'
          const isDay = responseData.dt > responseData.sys.sunrise && responseData.dt < responseData.sys.sunset;

      //const isDay = responseData.dt === 1709982899; 
         //console.log(isDay);
          if (!isDay) {
           return 'night'
         } else{
          return 'day'
        }
         

 }
    const theme =getTheme();
  return (
    
 
    <div className= {` App ${theme}`}>
      <Router>
          <Navbar />
          <AllRoutes />
          
       </Router>
    </div>
    
  );
  }

export default App;
