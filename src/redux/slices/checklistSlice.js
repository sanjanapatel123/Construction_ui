import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance.jsx' // Make sure axiosInstance is configured
import { apiUrl } from '../../utils/config.js'; // Your API base URL

// Async thunk to fetch all checklists
export const fetchChecklists = createAsyncThunk(
  'checklists/fetchChecklists',
  async () => {
    const response = await axiosInstance.get(`${apiUrl}/checklists`);
    return response.data; // This is the data you want to store in the state
  }
);

export const fetchChecklistDetails = createAsyncThunk(
  'checklists/fetchChecklistDetails',
  async (id) => {
    const response = await axiosInstance.get(`${apiUrl}/checklists/${id}`);
    return response.data; // This is the data you want to store in the state
  }
);

export const updateChecklist = createAsyncThunk(
  'checklists/updateChecklist',
  async ({ id, checklistData }) => {
    const response = await axiosInstance.put(`${apiUrl}/checklists/${id}`, checklistData);
    return response.data;
  }
);

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
  },
});

export default checklistSlice.reducer;
