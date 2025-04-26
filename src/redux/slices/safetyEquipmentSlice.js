import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";

export const addSafetyEquipment = createAsyncThunk("safety/addSafetyEquipment", async (formData, thunkAPI) => {
    try {
        const response = await axiosInstance.post(
            `${apiUrl}/safetyEquipment`,
            formData
        );
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message || "error creating tool");
    }
})

export const fetchsafetyEquipment = createAsyncThunk("safety/fetchsafetyEquipment", async (_, thunkAPI) => {
    try {
        const response = await axiosInstance.get(`https://hrb5wx2v-8000.inc1.devtunnels.ms/api/safety`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message || "error fetching tools");
    }
})

const safetyEquipmentSlice = createSlice({
    name: "safetyEquipment",
    initialState: {
   
        safetyequipments: [],
        loading: false,
        error: null
    },
    reducers: {
    },

    extraReducers: (builder) => {
        builder
            // ADD
            .addCase(addSafetyEquipment.pending, (state) => {
               state.loading = true
                state.error = null;
            })
            .addCase(addSafetyEquipment.fulfilled, (state, action) => {
                state.loading = false;
                state.safetyequipments.push(action.payload);
            })


            .addCase(fetchsafetyEquipment.pending, (state) => {
                state.loading = true
                state.error = null;
            })
            .addCase(fetchsafetyEquipment.fulfilled, (state, action) => {
               state.loading = false;
                state.safetyequipments = action.payload;
            })
            .addCase(fetchsafetyEquipment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },

});

export default safetyEquipmentSlice.reducer;