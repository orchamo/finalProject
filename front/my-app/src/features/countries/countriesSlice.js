import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllCountries,} from './countriesAPI';

const initialState = {
    status : 'idle',
    countriesArr:[]
}

export const getAllCountriesAsync = createAsyncThunk(
    "countries/getAllCountries",
    async () => {
      const response = await getAllCountries();
      return response.data;
    }
)


export const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(getAllCountriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllCountriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.countriesArr = action.payload;
      });
  }
});

export const selectCountries = (state) => state.countries.countriesArr


export default countriesSlice.reducer;