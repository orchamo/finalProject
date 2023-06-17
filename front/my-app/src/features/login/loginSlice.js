import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doLogin, doLogout } from "./loginAPI";
import jwt_decode from "jwt-decode";

const initialState = {
  loginStatus: false,
  username: "",
  userType:"",
};

// export const getloginsAsync = createAsyncThunk(
//   "login/getlogins",
//   async () => {
//     const response = await getlogins();
//     return response.data;
//   }
// );

export const doLoginAsync = createAsyncThunk(
  "login/doLogin",
  async (newlogin) => {
    const response = await doLogin(newlogin);
    console.log(jwt_decode(localStorage.getItem("token")))
    return response.data;
  }
);
export const logoutAsync = createAsyncThunk(
  "login/logout",
  async (token) => {
    console.log(token);
    const response = await doLogout(token.token);
    return response.data;
  }
);

// call the methods in the API
// export const updloginAsync = createAsyncThunk(
//   "login/updlogin",
//   async (newlogin) => {
//     let newBody = {
//       destination: newlogin.destination,
//       companyName: newlogin.companyName,
//     };
//     let id = newlogin.id;
//     const response = await updlogin(newBody, id);
//     return response.data;
//   }
// );

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    checkLogin: (state) => {
      let myToken = localStorage.getItem("token");
      if (myToken) {
        state.loginStatus = true;
        state.username = jwt_decode(myToken).username;
      }
    },
    logout: (state) => {
      localStorage.removeItem("token");
      state.loginStatus = false;
      state.username = "";
      state.userType = "";

    },
    checkType:(state) =>{
      let myToken = localStorage.getItem("token");
      if (myToken){
        state.userType = jwt_decode(myToken).userType
      }
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(doLoginAsync.pending, (state) => {
      state.status = 'pending';
      console.log("din");
    })
    .addCase(doLoginAsync.fulfilled, (state, action) => {
      console.log(action.payload.access);
      state.token = action.payload.access;
      localStorage.setItem("token", state.token);
      state.status = "loading";
      state.loginStatus = true;
      state.username = jwt_decode(state.token).username;
      state.userType = jwt_decode(state.token).usertype;
      console.log(state.username);
      console.log(state.userType);
    });
  },
});

export const { checkLogin,logout } = loginSlice.actions;
export const selectlogin = (state) => state.login.loginStatus;
export const selectUsername = (state) => state.login.username;
export const selectUserType = (state) => state.login.userType;
export default loginSlice.reducer;