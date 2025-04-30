import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiUrl } from "../../utils/config"
import axiosInstance from "../../utils/axiosInstance";

export const addtool = createAsyncThunk( 'tool/addtool',
    async (formData, thunkAPI) => {
        try{
            const response = await axiosInstance.post(`${apiUrl}/plantmachinery`, formData);
            return response.data;
        }catch(error){
            return thunkAPI.rejectWithValue(error.response?.data || error.message || "error creating tool")
        }

    
})

export const getalltool = createAsyncThunk( 'tool/getalltool',
    async(_,thunkAPI) => {
        try{
            const response = await axiosInstance.get(`${apiUrl}/plantmachinery`)
            return response.data;
        }catch(error){
            return rejectWithValue(err.response.data);

        }
    }
)

export const deletetool = createAsyncThunk('tool/deletetool', async(id, thunkAPI) => {
    try {
    const response = await axiosInstance.delete(`${apiUrl}/plantmachinery/${id}`)
    return response.data
    }
    catch(error){
            return thunkAPI.rejectWithValue(error.response?.data || error.message || "error creating tool")
        }

    }
)

export const updatetool = createAsyncThunk("tool/updatetool", async({id,updatedtool }, thunkAPI) => {
    try{
        const response = await axiosInstance.patch(`${apiUrl}/plantmachinery/${id}`,
            updatedtool
        )
        return response.data;

    }catch(error){
        return thunkAPI.rejectWithValue(error.response?.data || error.message || "error creating tool")
    }

})



const initialState = {
    tools: [],
    loading: false,
    error: null
}

const toolSlice = createSlice({
    name: "tool",
    initialState,
  

    extraReducers: (builder) => {
        builder
    .addCase( addtool.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase( addtool.fulfilled, (state, action) => {
        state.loading = false;
        state.tools = action.payload;
    })
    .addCase( addtool.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase( getalltool.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase( getalltool.fulfilled, (state, action) => {
        state.loading = false;
        state.tools = action.payload;
    })
    .addCase( getalltool.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(deletetool.pending, (state) => {
        state.loading = true,
        state.error = null;
    }) 
    .addCase(deletetool.fulfilled, (state,action) => {
        state.loading = false;
        state.tools = state.tools.filter((item) => item._id !== action.payload)
    }) 
    .addCase(deletetool.rejected, (state,action) => {
        state.loading = false;
        state.error =action.payload;

    })
    .addCase(updatetool.pending, (state) => {
        state.loading = true;
        state.error =null
    }) 
    .addCase(updatetool.fulfilled, (state,action) => {
        state.loading = false;
        const index = state.tools.findIndex(item => item._id === action.payload._id);
  if (index !== -1) {
    state.tools[index] = action.payload;
  }
    })
    .addCase(updatetool.rejected, (state,action) => {
        state.loading = false;
        state.error =action.payload;
    })
   }


})

export default toolSlice.reducer;