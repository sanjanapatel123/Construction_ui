import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import  {apiUrl}  from "../../utils/config";


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

export const getallSwms = createAsyncThunk("swms/getallSwms", 
    async (_,thunkAPI)  => {
        try{
            const response = await axiosInstance.get(`${apiUrl}/swms`);
            return response.data;
        }
        catch(error) {
            console.error("Fetch swms Error:", error.response);
            return thunkAPI.rejectWithValue(error.response?.data || "Unauthorized access");
        }
    }
)

export const getswmsbyId = createAsyncThunk("swms/getswmsbyId", 
    async(id, thunkAPI) => {
        try {
            const response = await axiosInstance.get(`${apiUrl}/swms/${id}`)
            return response.data;
        }
        catch(error){
            console.log("getswmsbyId Error",error.response)
            return thunkAPI.rejectWithValue(error.response?.data || "No SWMS found for given id")
        }
    }
)

export const deleteswms = createAsyncThunk("swms/deletswms",
    async(id, thunkAPI) => {
        try {
            const response = await axiosInstance.delete(`${apiUrl}/swms/${id}`)
            return response.data;
        }
        catch(error){
            console.log("deletswms Error",error.response)
            return thunkAPI.rejectWithValue(error.response?.data || "No SWMS found for given id")
        }
    }
)

const initialState = { swms: [],
    singleSwms: null,
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
            })

            .addCase(getallSwms.pending, (state) => {
                state.loading= true;
                state.error= null;
            })
            .addCase(getallSwms.fulfilled, (state,action) => {
                state.loading = false;
                state.swms = action.payload;
            })
            .addCase(getallSwms.rejected, (state) => {
                state.loading = false;
                state.error =action.payload;
            })

            .addCase(getswmsbyId.pending, (state) => {
                state.loading = true;
                state.error = null;
    })
    .addCase(getswmsbyId.fulfilled, (state,action) => {
        state.loading = false;
        state.singleSwms = action.payload;

    })
    .addCase(getswmsbyId.rejected, (state) => {
        state.loading = false;
        state.error = action.payload
    })

    .addCase(deleteswms.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(deleteswms.fulfilled, (state,action) => {
        state.loading = false;
        state.swms = state.swms.filter((swms) => swms._id !== action.payload._id);
    })
    .addCase(deleteswms.rejected, (state) => {
        state.loading = false;
        state.error = action.payload;
    })
    },
});

export default swmsSlice.reducer;