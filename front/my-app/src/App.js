import React from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import Login from './pages/LoginPage';
import { Route, Routes } from "react-router-dom"
import About from './pages/About';
import BaseNav from './simpleComp/BaseNav';
import Flights from './pages/Flights';
import AddFlight from './pages/AddFlight';
import { Counter } from './features/counter/Counter';
import RegisterPage from './pages/RegisterPage';
import SignIn from './pages/Signin';
import MyFlights from './simpleComp/MyFlights';
import NavSwitch from './simpleComp/NavSwitch';








// import flightByDestinationn from 


function App() {
  return (
    <div>
      <NavSwitch>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="/addflight" element={<AddFlight />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/myflights" element={<MyFlights />} />

        </Routes>
      </NavSwitch>
    </div>
  );
}

export default App;
