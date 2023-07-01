import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customerTickets, bookTicket, deleteTicket,deleteTicketByCustomerAndFlightID} from "./ticketApi";

const initialState = {
    status: "idle",
    ticketsArr: []
}

export const customerTicketsAsync = createAsyncThunk(
    "ticket/customertickets",
    async (ticketinfo) => {
        const response = await customerTickets(ticketinfo);
        return response.data
    }
)

export const bookTicketAsync = createAsyncThunk(
    "ticket/booktickets",
    async (ticketinfo) => {
        const response = await bookTicket(ticketinfo);
        return response.data
    }
)

export const deleteTicketAsync = createAsyncThunk(
    "ticket/deleteticket",
    async(ticketinfo) => {
        const response = await deleteTicket(ticketinfo);
        return response.data
    }
)

export const deleteTicketByCustomerAndFlightIDAsync = createAsyncThunk(
    "ticket/deleteticketbycustomerandflightid",
    async(ticketinfo) => {
        const response = await deleteTicketByCustomerAndFlightID(ticketinfo);
        return response.data
    }
)

export const ticketSlice = createSlice({
    name: "tickets",
    initialState,
    reducers: {

    },
    extraReducers:(builder) => {
        builder
            .addCase(bookTicketAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(bookTicketAsync.fulfilled, (state, action)=>{
                state.status ="fulfilled";
                state.ticketsArr = action.payload

            })
            .addCase(deleteTicketAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteTicketAsync.fulfilled, (state)=>{
                state.status ="fulfilled";

            })
            .addCase(customerTicketsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(customerTicketsAsync.fulfilled, (state,action)=>{
                state.status ="fulfilled";
                state.ticketsArr=action.payload;

            })
            .addCase(deleteTicketByCustomerAndFlightIDAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteTicketByCustomerAndFlightIDAsync.fulfilled, (state,action)=>{
                state.status ="fulfilled";
            })
    }
})

export const selectTickets = (state) => state.ticket.ticketsAr

export default ticketSlice.reducer