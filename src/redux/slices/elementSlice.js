import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import { apiUrl } from '../../utils/config';

// 📌 GET all elements
export const fetchElements = createAsyncThunk(
  'element/fetchElements',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/buildingCategory`);
      return response.data;  // Ensure that this returns the correct structure
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 📌 POST new element
export const createElement = createAsyncThunk(
  'element/createElement',
  async (submissionData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`${apiUrl}/buildingCategory`, submissionData, {
        headers: {
          'Content-Type':  'application/json',  
        },
      });
      return response.data;  // Ensure response contains the created element
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 📌 DELETE an element
export const deleteElement = createAsyncThunk(
  'element/deleteElement',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`${apiUrl}/buildingCategory/${id}`);
      return id; // Returning the id to delete it from the state
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const elementSlice = createSlice({
  name: 'element',
  initialState: {
    elements: [],
    status: 'idle', // Default status
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 📌 Fetch Elements
      .addCase(fetchElements.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchElements.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.elements = action.payload;
      })
      .addCase(fetchElements.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // 📌 Create Element
      .addCase(createElement.fulfilled, (state, action) => {
        // If not already present, add the new element
        state.elements.push(action.payload);
      })
      .addCase(createElement.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // 📌 Delete Element
      .addCase(deleteElement.fulfilled, (state, action) => {
        state.elements = state.elements.filter(
          (element) => element.id !== action.payload  // Ensure using the correct field (id)
        );
      })
      .addCase(deleteElement.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default elementSlice.reducer;
