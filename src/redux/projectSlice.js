import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';


export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
  const response = await axios.get("https://contructionbackend.onrender.com/api/projects/");
  return response.data;
});

export const deleteProject = createAsyncThunk('projects/deleteProject', async (projectId, { dispatch, rejectWithValue }) => {
  try {
    const response = await axios.delete(`https://contructionbackend.onrender.com/api/projects/${projectId}`);
    toast.success("Project deleted successfully!");
    dispatch(fetchProjects()); // re-fetch list
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to delete project!");
    return rejectWithValue(error?.response?.data?.message || "Delete failed");
  }
});

const projectSlice = createSlice({
  name: 'projects',
  initialState: {
    data: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
       .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default projectSlice.reducer;
