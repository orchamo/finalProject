import axios from "axios";

const MY_SERVER = "http://127.0.0.1:8000/"
const MY_TOKEN = localStorage.getItem("token")
export function addFlight(flightDetails) {
    console.log(flightDetails)
    return new Promise ((resolve) =>
    axios
        .post(MY_SERVER+'assignflight/', flightDetails,{headers:{"Authorization" : `Bearer ${MY_TOKEN}`}})
        .then((res) => resolve({data : res.data}, console.log(res.data))))
    }
    
export function deleteFlight(flightDetails){
    console.log(flightDetails)
    return new Promise ((resolve) =>
    axios
        .delete(MY_SERVER+'deleteflight/'+`${flightDetails.id}`, {headers:{"Authorization" : `Bearer ${MY_TOKEN}`}})
        .then((res) => resolve({data : res.data}, console.log(res.data))))
}

export function flightsByUser(userId){
    console.log(userId)
    return new Promise ((resolve) =>
    axios
        .get(MY_SERVER+'flightbycustomer/'+`${userId}`, {headers:{"Authorization" : `Bearer ${MY_TOKEN}`}})
        .then((res) => resolve({data : res.data}, console.log(res.data))))
}

export function flightsByCompany(userId){
    console.log(userId)
    return new Promise ((resolve) =>
    axios
        .get(MY_SERVER+'flightbycompany/'+`${userId}`, {headers:{"Authorization" : `Bearer ${MY_TOKEN}`}})
        .then((res) => resolve({data : res.data}, console.log(res.data))))
}

export function flightByDestination(variables) {
    console.log(variables)
    const vari = new URLSearchParams()
    vari.append("destination", variables.destination)
    console.log(vari)

    return new Promise ((resolve) =>
    axios(MY_SERVER + `flightbydestination?${vari.toString()}`)
        .then((res) => resolve({data:res.data}, console.log(res.data))))
}

export function flightByOrigin(variables) {
    console.log(variables)
    const vari = new URLSearchParams()
    vari.append("origin", variables.origin)
    console.log(vari)

    return new Promise ((resolve) =>
    axios(MY_SERVER + `flightbyorigin?${vari.toString()}`)
        .then((res) => resolve({data:res.data}, console.log(res.data))))
}


export function allFlights() {
    return new Promise((resolve) =>
    axios(MY_SERVER + "allflights/")
    .then((res) => resolve({data : res.data}, console.log(res.data)))
    )
}

export function FlightByDestOrig(variables) {
    console.log(variables)
    const vari = new URLSearchParams()
    vari.append("destination", variables.destination)
    vari.append("origin", variables.origin)
    console.log(vari)
    return new Promise((resolve) =>
    axios
    .get(MY_SERVER + `flightbydesorig?${vari.toString()}`)
    .then((res) => resolve({data : res.data}, console.log(res.data)))
    )
}

export function PrintData(variables) {
    console.log(variables)
    const vari = new URLSearchParams()
    vari.append("date", variables.date)
    return new Promise((resolve) =>
    axios
    .get(MY_SERVER + `printdata?${vari.toString()}`)
    .then((res) => resolve({data : res.data}, console.log(res.data)))
    )
    

}