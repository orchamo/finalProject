import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addFlightAsync } from '../features/flight/flightSlice'

const AddFlight = () => {
  const dispatch = useDispatch()
  const [origin, setorigin] = useState("")
  const [destination, setdestination] = useState("")
  const [landing, setlanding] = useState("")
  const [departure, setdeparture] = useState("")
  const [tickets, settickets] = useState("")
  const [price, setprice] = useState("")

  return (
    <div className='App-header'>
      <input name='origin' placeholder='origin country' onChange={(e) => setorigin(e.target.value)}></input>
      <br></br>
      <input name='destination' placeholder='destination country' onChange={(e) => setdestination(e.target.value)}></input>
      <br></br>
      <input name='departure' placeholder='departure time' onChange={(e) => setdeparture(e.target.value)}></input>
      <br></br>
      <input name='landing' placeholder='landing time' onChange={(e) => setlanding(e.target.value)}></input>
      <br></br>
      <input name='tickets' placeholder='tickets avalable' onChange={(e) => settickets(e.target.value)}></input>
      <br></br>
      <input name='price' placeholder='ticket price' onChange={(e) => setprice(e.target.value)}></input>
      <br></br>
      <button onClick={() => dispatch(addFlightAsync({
        airline: 1, origin: origin,
        destination: destination, departure: departure, landing: landing, tickets: tickets,
        price: price
      }))}>Add Flight</button>


    </div>
  )
}

export default AddFlight