import React from 'react'
import LoginPage from './LoginPage';
import FlightCards from '../simpleComp/FlightCards';
import jwt from 'jwt-decode';
import { useSelector } from 'react-redux';
import { selectUserType } from '../features/login/loginSlice';
// import '../index.css';
// import pic from '../../src/projectPics/sky.jpg'
const HomePage = () => {
  const userType = useSelector(selectUserType)
  function decode(){
    const decodeLocal = console.log(localStorage.getItem("token"))
    console.log(decodeLocal)
  }

  return (
    <div >
      <header className='App-header'>
        <h1>{userType}</h1>
      <button onClick={decode}>decode</button>
      
     </header>
    </div>
  )
}


export default HomePage