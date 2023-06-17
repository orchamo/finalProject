import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addFlight, flightByDestination,FlightByDestOrig, allFlights, deleteFlight, flightByOrigin, flightsByUser } from "./flightAPI";

const initialState = {
    status: 'idle',
    flightsAr: []
}

// ------------------------------------------  -POST-  ------------------------------------------
export const addFlightAsync = createAsyncThunk(
    "flight/addFlightt",
    async (fligtInfo) => {
        const response = await addFlight(fligtInfo);
        return response.data;
    }
)
export const deleteFlightAsync = createAsyncThunk(
    'flight/deleteFightt',
    async (flightInfo) => {
        const response = await deleteFlight(flightInfo);
        return response.data;
    }
)

export const flightsByUserAsync = createAsyncThunk(
    'flight/flightByUser',
    async (userId) => {
        console.log(userId);
        const response = await flightsByUser(userId);
        
        return response.data
    }
)
export const flightByDestinationAsync = createAsyncThunk(
    "flight/flightByDestinationn",
    async (destination) => {
        const response = await flightByDestination(destination);
        return response.data;
    }
)

export const flightByOriginAsync = createAsyncThunk(
    "flight/flightByOriginn",
    async (origin) => {
        const response = await flightByOrigin(origin);
        return response.data;
    }
)

export const flightByDestOrigAsync = createAsyncThunk(
    "flight/flightByDestOrig",
    async (origin) => {
        console.log(origin)
        const response = await FlightByDestOrig(origin);
        return response.data;
    }
)

export const allFlightsAsync = createAsyncThunk(
    "flights/allflightss",
    async () => {
        const response = await allFlights();
        return response.data;
    }
)

export const flightSlice = createSlice({
    name: "flight",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(allFlightsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(allFlightsAsync.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.flightsAr = action.payload;
            })
            .addCase(deleteFlightAsync.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(deleteFlightAsync.fulfilled, (state, action) => {
                state.status = 'fulfilled';
            })
            .addCase(flightByDestOrigAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(flightByDestOrigAsync.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.flightsAr = action.payload;
            })
            .addCase(flightByOriginAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(flightByOriginAsync.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.flightsAr = action.payload;
            })
            .addCase(flightByDestinationAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(flightByDestinationAsync.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.flightsAr = action.payload;
            })
            .addCase(flightsByUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(flightsByUserAsync.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.flightsAr = action.payload;
            })
    }
})

export const selectFlights = (state) => state.flight.flightsAr
export const selectFlightstat = (state) => state.flight.status

export default flightSlice.reducer;