import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  doLoginAsync,
  selectlogin,
  logout,
  selectUsername,
} from "../features/login/loginSlice";
const Login = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const loginStatus = useSelector(selectlogin);
  const userName = useSelector(selectUsername);
  return (
    <div >
      
      {loginStatus ? (
        <div>
        <h1>Hey {userName}, are you sure you want to logout?</h1>
        <button onClick={() => dispatch(logout())}>Logout</button>
        </div>
      ) : (
        <div>
          
          <input placeholder='Username' onChange={(e) => setUser(e.target.value)} />
          
          <input placeholder='Password' type={"password"} onChange={(e) => setPwd(e.target.value)} />
          <button
            onClick={() =>
              dispatch(doLoginAsync({ username: user, password: pwd }))
            }
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;