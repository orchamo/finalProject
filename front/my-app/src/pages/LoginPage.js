import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import Login from '../simpleComp/Login';

const LoginPage = () => {
    const dispatch = useDispatch();
  return (
    <div>
    
    <Login></Login>
    
    </div>
  )
}

export default LoginPage