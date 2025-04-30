import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { apiUrl } from '../../utils/config';
import axiosInstance from '../../utils/axiosInstance.jsx'



export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
  console.log("api called prjects")
  const response = await axiosInstance.get(`${apiUrl}/projects/`);
  return response.data;
});

export const deleteProject = createAsyncThunk('projects/deleteProject', async (projectId, { dispatch, rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete(`${apiUrl}/projects/${projectId}`);
    toast.success("Project deleted successfully!");
    dispatch(fetchProjects()); // re-fetch list
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to delete project!");
    return rejectWithValue(error?.response?.data?.message || "Delete failed");
  }
});

export const getSingleProject = createAsyncThunk(
  'projects/getSingleProject',
  async (projectId) => {
    const response = await axiosInstance.get(`${apiUrl}/projects/${projectId}`);
    return response.data;
  }
);

const projectSlice = createSlice({
  name: 'projects',
  initialState: {
    data: [],
    loading: false,
    selectedProject: null, 
    error: null
  },
  reducers: { 
    clearSelectedProject: (state) => {
      state.selectedProject = null;
    }
  },
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
      })
        .addCase(getSingleProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleProject.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProject = action.payload;
      })
      .addCase(getSingleProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { clearSelectedProject } = projectSlice.actions;
export default projectSlice.reducer;
