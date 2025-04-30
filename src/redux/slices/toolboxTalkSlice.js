// src/redux/toolboxTalkSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiUrl } from '../../utils/config';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axiosInstance';

export const fetchToolboxTalks = createAsyncThunk(
  'toolboxTalks/fetchToolboxTalks',
  async () => {
    const response = await fetch(`${apiUrl}/toolbox`);
    const data = await response.json();
    return data.data;
  }
);


export const deleteToolbox = createAsyncThunk('toolbox/deleteToolBox', async (projectId, { dispatch, rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete(`${apiUrl}/toolbox/${projectId}`);
    toast.success("Toolbox deleted successfully!");
    dispatch(fetchToolboxTalks()); // re-fetch list
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to delete Toolbox!");
    return rejectWithValue(error?.response?.data?.message || "Delete failed");
  }
});


const toolboxTalkSlice = createSlice({
  name: 'toolboxTalks',
  initialState: {
    talks: [],
    loading: false,
    error: null,
     updateLoading: false,
    updateError: null,
    updatedTalk: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchToolboxTalks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchToolboxTalks.fulfilled, (state, action) => {
        state.loading = false;
        state.talks = action.payload;
      })
      .addCase(fetchToolboxTalks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
       .addCase(deleteToolbox.pending, (state) => {
              state.loading = true;
              state.error = null;
              state.deleteSuccessMsg = '';
            })
            .addCase(deleteToolbox.fulfilled, (state, action) => {
              state.loading = false;
              state.data = state.data.filter((itp) => itp._id !== action.payload.id);
              state.deleteSuccessMsg = action.payload.message;
            })
            .addCase(deleteToolbox.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
            })
  },
});

export default toolboxTalkSlice.reducer;
