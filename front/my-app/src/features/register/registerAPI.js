import axios from "axios";

const MY_SERVER = "http://127.0.0.1:8000/";

export function Register(credentials) {
    return new Promise((resolve) =>
    axios
    .post(MY_SERVER + "adduser/", credentials)
    .then((res) => resolve({data:res.data})))
}

export function AddRole(credentials) {
    return new Promise((resolve) =>
    axios
    .post(MY_SERVER + "addrole/", credentials)
    .then((res) => resolve({data:res.data})))
}

export function AddCountry(credentials) {
    return new Promise((resolve) =>
    axios
    .post(MY_SERVER + "addcountry/", credentials)
    .then((res) => resolve({data:res.data})))
}