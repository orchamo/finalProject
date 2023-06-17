import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import flightSlice from '../features/flight/flightSlice';
import loginSlice from '../features/login/loginSlice';
import countriesSlice from '../features/countries/countriesSlice';
import ticketSlice from '../features/tickets/ticketSlice'


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    login : loginSlice,
    flight : flightSlice,
    countries: countriesSlice,
    tickets: ticketSlice
  },
});
