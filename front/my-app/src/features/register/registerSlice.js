import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddCountry, AddRole, AssignAviation, AssignCustomer, Register } from "./registerAPI";

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

export const assignAviationAsync = createAsyncThunk(
    "register/assignaviation",
    async(credentials) => {
        const response = await AssignAviation(credentials)
        return response.data
    }
)
export const assignCustomerAsync = createAsyncThunk(
    "register/assigncustomer",
    async(credentials) => {
        const response = await AssignCustomer(credentials)
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
        .addCase(assignAviationAsync.pending, (state) =>{
            state.roleStatus = "pending"
        })
        .addCase(assignAviationAsync.fulfilled,(state,action) => {
            state.roleStatus = 'fulfilled'
        })
        .addCase(assignCustomerAsync.pending, (state) =>{
            state.roleStatus = "pending"
        })
        .addCase(assignCustomerAsync.fulfilled,(state,action) => {
            state.roleStatus = 'fulfilled'
        })
    }
})