import axios from "axios";
const MY_SERVER = "http://127.0.0.1:8000/";

export function doLogin(credentials) {
  console.log(credentials)
  return new Promise((resolve) =>
    axios
      .post(MY_SERVER + "token/", credentials)
      .then((res) => resolve({ data: res.data }, console.log(res.data))
      )
  );
}

export function doLogout(token) {
    return new Promise((resolve) =>
    axios
        .post(MY_SERVER + "logout/", token)
        .then((res)=> resolve({data:res.data}, console.log(res.data)))
        );
}
