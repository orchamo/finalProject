import axios from "axios";

const MY_SERVER = 'http://127.0.0.1:8000/'
const MY_TOKEN = localStorage.getItem("token")
export function bookTicket(ticketDetails) {
    console.log (ticketDetails)
    return new Promise((resolve) =>
        axios
            .post(MY_SERVER+'bookticket/', ticketDetails, {headers:{"Authorization" : `Bearer ${MY_TOKEN}`}})
            .then((res) => resolve({data: res.data}, console.log(res.data)))
    )
}

export function customerTickets(ticketDetails) {
    console.log(ticketDetails)
    return new Promise((resolve) =>
        axios
            .get(MY_SERVER+'customertickets/'+`${ticketDetails.user_id}`, {headers:{"Authorization" : `Bearer ${MY_TOKEN}`}})
            .then((res) => resolve({data : res.data}, console.log(res.data))))
}

export function deleteTicket(ticketDetails) {
    console.log(ticketDetails.id)
    return new Promise((resolve) => 
        axios
        .delete(MY_SERVER + 'deleteticket/' + `${ticketDetails.id}`,{headers:{"Authorization" : `Bearer ${MY_TOKEN}`}} )
        .then((res) => resolve({data :res.data}, console.log(res.data))))
}

export function ticketIdByCustomerAndFlightID(details){
    console.log(details)
    const vari = new URLSearchParams()
    vari.append("user_id", details.user_id)
    vari.append("flight_id", details.flight_id)
    console.log(vari)
    return new Promise((resolve) =>
    axios
    .get(MY_SERVER+ `ticketid?${vari.toString()}`, {headers:{"Authorization" : `Bearer ${MY_TOKEN}`}})
    .then((res) => resolve({data:res.data}, console.log(res.data))))
}

export function deleteTicketByCustomerAndFlightID(details){
    console.log(details)
    const vari = new URLSearchParams()
    vari.append("user_id", details.user_id)
    vari.append("flight_id", details.flight_id)
    console.log(vari)
    return new Promise((resolve) =>
    axios
    .delete(MY_SERVER+ `deleteticketbycustomerandflightid?${vari.toString()}`, {headers:{"Authorization" : `Bearer ${MY_TOKEN}`}})
    .then((res) => resolve({data:res.data}, console.log(res.data))))
}