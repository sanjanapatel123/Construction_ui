import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { apiUrl } from '../../utils/config'; // Adjust the import path as necessary
import axiosInstance from '../../utils/axiosInstance';

// const apiUrl = 'https://xt2cpwt7-8000.inc1.devtunnels.ms/api';

// Thunk to fetch all ITPs
export const fetchITPs = createAsyncThunk('itps/fetchITPs', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`${apiUrl}/itps/`);
    return response.data;
  } catch (error) {
    toast.error("Failed to fetch ITPs");
    return rejectWithValue(error?.response?.data?.message || "Failed to fetch ITPs");
  }
});


export const fetchITPDetails = createAsyncThunk(
  'itps/fetchITPDetails',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/itps/${id}`);
      return response.data;
    } catch (error) {
      toast.error("Failed to fetch ITP details");
      return rejectWithValue(error?.response?.data?.message || "Failed to fetch ITP details");
    }
  }
);


export const deleteITP = createAsyncThunk('itps/deleteITP', async (projectId, { dispatch, rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete(`${apiUrl}/itps/${projectId}`);
    toast.success("Itps deleted successfully!");
    dispatch(fetchITPs()); // re-fetch list
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to delete Itps!");
    return rejectWithValue(error?.response?.data?.message || "Delete failed");
  }
});

const itpSlice = createSlice({
  name: 'itps',
  initialState: {
    data: [],
    loading: false,
    error: null
  },
  reducers: {
      clearSelectedITP: (state) => {
      state.selectedITP = null;
    },
      
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchITPs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchITPs.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchITPs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }) .addCase(fetchITPDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchITPDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedITP = action.payload;
      })
      .addCase(fetchITPDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }) 
       .addCase(deleteITP.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.deleteSuccessMsg = '';
      })
      .addCase(deleteITP.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((itp) => itp._id !== action.payload.id);
        state.deleteSuccessMsg = action.payload.message;
      })
      .addCase(deleteITP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
     
  }
});

export const { clearSelectedITP,openEditModal } = itpSlice.actions;
export default itpSlice.reducer;
