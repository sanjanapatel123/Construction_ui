import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDiaries = createAsyncThunk('diaries/fetchDiaries', async () => {
  const response = await axios.get("https://contructionbackend.onrender.com/api/diaries");
  return response.data;
});

const diarySlice = createSlice({
  name: 'diaries',
  initialState: {
    data: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiaries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDiaries.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDiaries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default diarySlice.reducer;
