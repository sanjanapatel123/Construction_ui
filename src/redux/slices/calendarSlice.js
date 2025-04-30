// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axiosInstance from "../../utils/axiosInstance";
// import { apiUrl } from "../../utils/config";

// export const addTask = createAsyncThunk(
//     'calendar/addTask', async(newTask,thunkAPI) => {
//         console.log(newTask)
//         try{
//              const response = await axiosInstance.post(`${apiUrl}/calendar`, newTask, 
//              {
//                 headers: { "Content-Type": "multipart/form-data" }
//              }
//              )
//              console.log(response.data)
//              return response.data
//         }catch(error){
//             return thunkAPI.rejectWithValue(error.response?.data || error.message || "error adding tasks")
//         }
//     }
// )

// export const fetchTasks = createAsyncThunk('calendar/fetchTasks', async (_, thunkAPI) => {
//     try{
//         const response = await axiosInstance.get(`${apiUrl}/calendar`);
//         console.log(response.data)
//         return response.data;
//     }catch(error){
//         return thunkAPI.rejectWithValue(error.response?.data || error.message || "error fetching tasks")
//     }
//     })


// export const deleteTask = createAsyncThunk('calendar/deleteTask', async(id, thunkAPI) => {
//     try{
//         const response = await axiosInstance.delete(`${apiUrl}/calendar/${id}`)
//         return response.data;
//     }catch(error){
//         return thunkAPI.rejectWithValue(error.response?.data || error.message || "error deleting tasks")
//     }
// })

// const calendarSlice = createSlice({
//     name: 'calendar',
//     initialState: {
//         calendartask: [],
//         loading: false,
//         error: null
//     },
//     reducers: {},

//     extraReducers : ((builder) => {
//         builder
//         .addCase(fetchTasks.pending, (state) => {
//             state.loading = true;
//             state.error = null;
//         })
//         .addCase(fetchTasks.fulfilled, (state, action) => {
//             state.loading = false;
//             state.calendartask = action.payload;
//         })
//         .addCase(fetchTasks.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.error.message;
//         })
//         .addCase(deleteTask.pending, (state) => {
//             state.loading = true;
//             state.error = null;
//         })
//         .addCase(deleteTask.fulfilled, (state, action) => {
//             state.calendartask = state.calendartask.filter((task) => task._id !== action.payload);
//         })
//         .addCase(deleteTask.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.error.message;
//         })

//         .addCase(addTask.pending, (state) => {
//             state.loading = true;
//             state.error = null;
//         })
//         .addCase(addTask.fulfilled, (state, action) => {
//             state.loading = false;
//             state.calendartask.push(action.payload);
//         })
//         .addCase(addTask.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.error.message;
//         })
//     })

// })


// export default calendarSlice.reducer


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { apiUrl } from "../../utils/config";
import axios from "axios";




// export const addTask = createAsyncThunk(
//     'calendar/addTask', async(newTask, thunkAPI) => {
//         console.log("Adding task:", newTask);
//         try{
//              const response = await axiosInstance.post(`${apiUrl}/calendar`, newTask, 
//              {
//                 headers: { "Content-Type": "multipart/form-data" }
//              });
//              console.log("Add task response:", response.data);
//              return response.data;
//         } catch(error) {
//             console.error("Error adding task:", error);
//             return thunkAPI.rejectWithValue(error.response?.data || error.message || "error adding tasks");
//         }
//     }
// );


export const addTask = createAsyncThunk(
    'calendar/addTask', 
    async (formData, thunkAPI) => {
      try {
        const response = await
         axios.post( `https://construction-backend-production-3101.up.railway.app/api/calendar`, formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
             
            }
          }
        );
        console.log("ress",response.data)
        return response.data;
      } catch (error) {
        console.error('API Error:', error.response?.data || error.message);
        return thunkAPI.rejectWithValue(
          error.response?.data || 
          error.message || 
          'Failed to add task'
        );
      }
    }
  );
  
export const fetchTasks = createAsyncThunk('calendar/fetchTasks', async (_, thunkAPI) => {
    console.log("Fetching tasks...");
    try {
        const response = await axiosInstance.get(`${apiUrl}/calendar`);
        console.log("Fetched tasks:", response.data);
        return response.data;
    } catch(error) {
        console.error("Error fetching tasks:", error);
        return thunkAPI.rejectWithValue(error.response?.data || error.message || "error fetching tasks");
    }
});

export const deleteTask = createAsyncThunk('calendar/deleteTask', async(id, thunkAPI) => {
    try{
        const response = await axiosInstance.delete(`${apiUrl}/calendar/${id}`);
        return response.data;
    } catch(error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message || "error deleting tasks");
    }
});

const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        calendartask: [],
        loading: false,
        error: null
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
        .addCase(fetchTasks.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchTasks.fulfilled, (state, action) => {
            state.loading = false;
            state.calendartask = action.payload;
        })
        .addCase(fetchTasks.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || action.error.message;
        })
        .addCase(deleteTask.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteTask.fulfilled, (state, action) => {
            state.loading = false;
            state.calendartask = state.calendartask.filter((task) => task._id !== action.payload);
        })
        .addCase(deleteTask.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || action.error.message;
        })
        .addCase(addTask.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addTask.fulfilled, (state, action) => {
            state.loading = false;
            state.calendartask.push(action.payload);
        })
        .addCase(addTask.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || action.error.message;
        });
    }
});

export default calendarSlice.reducer;