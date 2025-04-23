import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";
import { apiUrl } from "../utils/config";


export const createSwms = createAsyncThunk(
    "swms/fetchSwms",
    async (swmsData, thunkAPI) => {
        try {
            const response = await axiosInstance.post( `${apiUrl}/swms`, swmsData,{ 
                headers: { "Content-Type": "application/json" }
            });
            return response.data;
        } 
        catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message || "error creating swms");
        }
    }
);

const initialState = { swms: [],
     loading: false,
      error: null
     };


const swmsSlice = createSlice({
    name: "swms",
    initialState,
    
    extraReducers: (builder) => {
        builder
            .addCase(createSwms.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createSwms.fulfilled, (state, action) => {
                state.loading = false;
                state.swms.push(action.payload);
            })
            .addCase(createSwms.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default swmsSlice.reducer;