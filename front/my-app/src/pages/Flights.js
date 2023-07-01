import React from 'react'
import FlightCards from '../simpleComp/FlightCards'
import SearchFlights from '../simpleComp/SearchFlights'
const Flights = () => {
  return (
    <div  >
    <SearchFlights></SearchFlights>
    <br></br>
    <FlightCards />
    </div>
  
  )
}

export default Flights