import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { doLoginAsync } from '../features/login/loginSlice';
import Login from '../simpleComp/Login';

const LoginPage = () => {
    const dispatch = useDispatch();
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
  return (
    <div>
    
    <Login></Login>
    
    </div>
  )
}

export default LoginPage