import React from 'react'
import { useSelector } from 'react-redux';
import { checkLogin, selectUserType } from '../features/login/loginSlice';
import HomeImagesNav from '../simpleComp/HomeImagesNav'
// import '../index.css';
// import pic from '../../src/projectPics/sky.jpg'
const HomePage = () => {
  const userType = useSelector(selectUserType)
  // function decode(){
  //   const decodeLocal = console.log(localStorage.getItem("token"))
  //   console.log(decodeLocal)
  // }

  return (
    <div>
      <HomeImagesNav></HomeImagesNav>
    </div>
  )
}


export default HomePage