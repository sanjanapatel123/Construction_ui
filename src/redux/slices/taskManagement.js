import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../utils/axiosInstance";
import { apiUrl } from "../../utils/config";

export const fetchTasks = createAsyncThunk('taskManagement/fetchTasks', async (_, thunkAPI) => {
    try{
        const response = await axiosInstance.get(`${apiUrl}/taskmanagement`);
        console.log(response.data)
        return response.data;
    }catch(error){
        return thunkAPI.rejectWithValue(error.response?.data || error.message || "error fetching tasks")
    }
    })


    export const addTask = createAsyncThunk( 'taskManangement', async(taskDetails,thunkAPI) => {
        try{
             const response = await axiosInstance.post(`${apiUrl}/taskmanagement`, taskDetails)
             console.log(response.data)
             return response.data
        }catch(error){
            return thunkAPI.rejectWithValue(error.response?.data || error.message || "error adding tasks")
        }
    })


    export const deleteTask = createAsyncThunk('taskManagement/deleteTask', async(id, thunkAPI) => {
        try{
            const response = await axiosInstance.delete(`${apiUrl}/taskmanagement/${id}`)
            return response.data;
        }catch(error){
            return thunkAPI.rejectWithValue(error.response?.data || error.message || "error deleting tasks")
        }
    })

    export const updateTask = createAsyncThunk('taskManagement/updateTask', async({id, updatedForm}, thunkAPI) => {
        try{
            const response = await axiosInstance.patch(`${apiUrl}/taskmanagement/${id}`, updatedForm)
            return response.data;
        }catch(error){
            return thunkAPI.rejectWithValue(error.response?.data || error.message || "error updating tasks")
        }
    })



const taskManagementSlice = createSlice({
    name: 'taskManagement',
    initialState: {
        tasks: [],
        loading: false,
        error: null
    },
    reducers: {},

    extraReducers: ((builder) => {
        builder
        .addCase(fetchTasks.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchTasks.fulfilled, (state, action) => {
            state.loading = false;
            state.tasks =action.payload;
        })
        .addCase(fetchTasks.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        .addCase(addTask.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addTask.fulfilled, (state, action) => {
            state.loading = false;
            state.tasks.push(action.payload);
        })
        .addCase(addTask.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(deleteTask.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteTask.fulfilled, (state, action) => {
            state.loading = false;
            state.tasks = state.tasks.filter((task) => task._id !== action.payload._id);
        })
        .addCase(deleteTask.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(updateTask.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateTask.fulfilled, (state, action) => {
            state.loading = false;
            
  const index = state.tasks.findIndex(task => task._id === action.payload._id);
  if (index !== -1) {
    state.tasks[index] = action.payload;
  }
        })
        .addCase(updateTask.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    })
})

export default taskManagementSlice.reducer