import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddCountry, AddRole, Register } from "./registerAPI";

const initialState = {
    registerStatus : "idle",
    roleStatus:"idle",
    countryStatus:"idle",
};

export const registerAsync = createAsyncThunk(
    "register/register",
    async(credentials) => {
        const response = await Register(credentials)
        return response.data
    }
)


export const addRoleAsync = createAsyncThunk(
    "register/addrole",
    async(credentials) => {
        const response = await AddRole(credentials)
        return response.data
    }
)


export const addCountryAsync = createAsyncThunk(
    "register/addcountry",
    async(credentials) => {
        const response = await AddCountry(credentials)
        return response.data
    }
)

export const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(registerAsync.pending, (state) =>{
            state.roleStatus = "pending"
        })
        .addCase(registerAsync.fulfilled,(state,action) => {
            state.roleStatus = 'fulfilled'
        })
        .addCase(addRoleAsync.pending, (state) =>{
            state.addRoleAsync = "pending"
        })
        .addCase(addRoleAsync.fulfilled,(state,action) => {
            state.addRoleAsync = 'fulfilled'
        })
        .addCase(addCountryAsync.pending, (state) =>{
            state.roleStatus = "pending"
        })
        .addCase(addCountryAsync.fulfilled,(state,action) => {
            state.roleStatus = 'fulfilled'
        })
        
    }
})