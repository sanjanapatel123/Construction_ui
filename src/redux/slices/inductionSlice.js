import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';
import { apiUrl } from '../../utils/config';

// 📌 GET all inductions
export const fetchInductions = createAsyncThunk(
  'induction/fetchInductions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/induction`);
      return response.data.inductions;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 📌 POST new induction
export const createInduction = createAsyncThunk(
  'induction/createInduction',
  async (submissionData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`${apiUrl}/induction`, submissionData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteInduction = createAsyncThunk(
  'induction/deleteInduction',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${apiUrl}/induction/${id}`);
      console.log(res.data)
      return id;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
)

const inductionSlice = createSlice({
  name: 'induction',
  initialState: {
    inductions: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInductions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInductions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.inductions = action.payload;
      })
      .addCase(fetchInductions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createInduction.fulfilled, (state, action) => {
        state.inductions.push(action.payload);
      })
      .addCase(createInduction.rejected, (state, action) => {
        state.error = action.payload;
      })
      // 👇 Delete Induction Case
    .addCase(deleteInduction.fulfilled, (state, action) => {
      state.inductions = state.inductions.filter(
        (induction) => induction._id !== action.payload
      );
    })
    .addCase(deleteInduction.rejected, (state, action) => {
      state.error = action.payload;
    });
  }
});

export default inductionSlice.reducer;
