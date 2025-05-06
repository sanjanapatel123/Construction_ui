import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance.jsx' // Make sure axiosInstance is configured
import { apiUrl } from '../../utils/config.js'; // Your API base URL
import { toast } from 'react-toastify';

// Async thunk to fetch all checklists
export const fetchChecklists = createAsyncThunk(
  'checklists/fetchChecklists',
  async () => {
    const response = await axiosInstance.get(`${apiUrl}/checklists`);
    return response.data; // This is the data you want to store in the state
  }
);

export const fetchChecklistDetails = createAsyncThunk(
  'checklist/fetchChecklistDetails',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/checklists/${id}`);
      return response.data;
    } catch (error) {
      toast.error(" details");
      return rejectWithValue(error?.response?.data?.message || "Failed to fetch ITP details");
    }
  }
);

export const updateChecklist = createAsyncThunk(
  'checklists/updateChecklist',
  async ({ id, checklistData }) => {
    const response = await axiosInstance.patch(`${apiUrl}/checklists/${id}`, checklistData, 
      {
        headers: { "Content-Type": "multipart/form-data" }
      }
    );
    return response.data;
  }
);

export const deleteChecklist = createAsyncThunk('checklist/deleteChecklist', async (projectId, { dispatch, rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete(`${apiUrl}/itps/${projectId}`);
    toast.success("Itps deleted successfully!");
    dispatch(fetchChecklists()); // re-fetch list
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to delete Itps!");
    return rejectWithValue(error?.response?.data?.message || "Delete failed");
  }
});

const checklistSlice = createSlice({
  name: 'checklists',
  initialState: {
    checklists: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChecklists.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChecklists.fulfilled, (state, action) => {
        state.loading = false;
        state.checklists = action.payload;
      })
      .addCase(fetchChecklists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchChecklistDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChecklistDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.checklistDetails = action.payload;
      })
      .addCase(fetchChecklistDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
       .addCase(deleteChecklist.pending, (state) => {
              state.loading = true;
              state.error = null;
              state.deleteSuccessMsg = '';
            })
            .addCase(deleteChecklist.fulfilled, (state, action) => {
              state.loading = false;
              state.data = state.data.filter((itp) => itp._id !== action.payload.id);
              state.deleteSuccessMsg = action.payload.message;
            })
            .addCase(deleteChecklist.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
            })
            .addCase(updateChecklist.pending, (state) => {
              state.loading = true;
              state.error = null;
            })
            .addCase(updateChecklist.fulfilled, (state, action) => {
              state.loading = false;
              const index = state.checklists.findIndex((checklist) => checklist._id === action.payload._id);
              if (index !== -1) {
                state.checklists[index] = action.payload;
              }
              toast.success("Checklist updated successfully!");
            })
  },
});

export default checklistSlice.reducer;
