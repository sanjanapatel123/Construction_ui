import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchTasks = createAsyncThunk('taskManagement/fetchTasks', async (_, thunkAPI) => {
    try{
        const response = await axiosInstance.get(`${apiUrl}/taskmanagement`);
        return response.data;
    }catch(error){
        return thunkAPI.rejectWithValue(error.response?.data || error.message || "error fetching tasks")
    }
    })



export const taskManagementSlice = createSlice({
    name: 'taskManagement',
    initialState: {
        tasks: [],
        loading: false,
        error: null
    },
    reducers: {},
})